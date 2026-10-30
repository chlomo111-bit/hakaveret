-- PRIX DU MEILLEUR COMMENTATEUR « המגיב של היום » (règle de Shlomo, 30.10.2026)
-- Le passage commentaires journalise chaque commentaire de joueur (tous les posts du compte) avec log_comment().
-- Chaque soir à 20:00 (en même temps que la loterie) : award_top_commenter(jour) désigne le joueur
-- qui a écrit le plus de commentaires valables dans la journée (égalité = celui qui a atteint ce nombre en premier).
-- Le jeu lit commenter_state(h) : couronne « המגיב של היום » sur l'abeille du gagnant jusqu'au lendemain soir.

create table if not exists public.comment_log(
  comment_id text primary key,
  day date not null,
  username text not null,
  media_id text,
  ts timestamptz not null,
  body_norm text,
  valid boolean not null default true
);
create index if not exists comment_log_day_user on public.comment_log(day, username);
alter table public.comment_log enable row level security;

create table if not exists public.top_commenter_awards(
  day date primary key,
  username text,
  n int not null default 0,
  awarded_at timestamptz not null default now(),
  wish text,                 -- ce que le gagnant a choisi (« מה יקרה מחר בזכותך? »)
  wish_at timestamptz,
  wish_status text           -- null = en attente · accepted · adapted · refused · none (pas de réponse avant 12:00) · done
);
alter table public.top_commenter_awards enable row level security;

-- Journalise un commentaire. Invalide (spam) : même texte normalisé déjà écrit par le même joueur le même jour, ou texte vide.
create or replace function public.log_comment(cid text, u text, mid text, t timestamptz, body text)
returns json language plpgsql security definer set search_path = public as $$
declare d date := (t at time zone 'Asia/Jerusalem')::date; uu text := lower(btrim(coalesce(u,''),' @'));
        nb text := lower(regexp_replace(coalesce(body,''), '\s+', ' ', 'g')); ok boolean;
begin
  if uu = '' or uu = 'hakaveret_shelanu' then return json_build_object('skipped',true); end if;
  nb := btrim(nb);
  ok := nb <> '' and not exists(select 1 from comment_log c where c.day = d and c.username = uu and c.body_norm = nb and c.comment_id <> cid);
  insert into comment_log(comment_id, day, username, media_id, ts, body_norm, valid)
    values (cid, d, uu, mid, t, nb, ok) on conflict (comment_id) do nothing;
  return json_build_object('day', d, 'username', uu, 'valid', ok,
    'count', (select count(*) from comment_log c where c.day = d and c.username = uu and c.valid));
end $$;

-- Classement du jour : nombre de commentaires valables + moment où ce nombre a été atteint.
create or replace function public.top_commenters(d date)
returns table(username text, n int, reached_at timestamptz) language sql stable security definer set search_path = public as $$
  with c as (select l.username, l.ts, row_number() over (partition by l.username order by l.ts, l.comment_id) rn,
                    count(*) over (partition by l.username) cnt
             from comment_log l where l.day = d and l.valid)
  select c.username, c.cnt::int, c.ts from c where c.rn = c.cnt order by c.cnt desc, c.ts asc;
$$;

-- Attribution (une seule fois par jour). Renvoie {already, day, username, n}.
create or replace function public.award_top_commenter(d date)
returns json language plpgsql security definer set search_path = public as $$
declare r record; a record;
begin
  select * into a from top_commenter_awards where day = d;
  if found then return json_build_object('already', true, 'day', d, 'username', a.username, 'n', a.n); end if;
  select * into r from top_commenters(d) limit 1;
  insert into top_commenter_awards(day, username, n) values (d, r.username, coalesce(r.n, 0)) on conflict (day) do nothing;
  select * into a from top_commenter_awards where day = d;
  return json_build_object('already', false, 'day', d, 'username', a.username, 'n', a.n);
end $$;

-- Enregistre le choix du gagnant (status : accepted / adapted / refused / none / done).
create or replace function public.set_commenter_wish(d date, w text, st text)
returns json language sql security definer set search_path = public as $$
  update top_commenter_awards set wish = left(w, 300), wish_at = now(), wish_status = st where day = d
  returning json_build_object('day', day, 'username', username, 'wish', wish, 'status', wish_status);
$$;

-- État pour le jeu : couronne actuelle + course du jour. Attribue automatiquement à 20:00 (pas le vendredi : samedi 18:30).
create or replace function public.commenter_state(h text default '')
returns json language plpgsql security definer set search_path = public as $$
declare d date := (now() at time zone 'Asia/Jerusalem')::date; hh text := lower(btrim(coalesce(h,''),' @'));
        dow int := extract(isodow from d); a record; top json; mine int;
begin
  if dow <> 5 and now() >= ((d::text||' 20:00')::timestamp at time zone 'Asia/Jerusalem')
     and not exists(select 1 from top_commenter_awards where day = d) then perform award_top_commenter(d); end if;
  if dow = 6 and now() >= ((d::text||' 18:30')::timestamp at time zone 'Asia/Jerusalem')
     and not exists(select 1 from top_commenter_awards where day = d - 1) then perform award_top_commenter(d - 1); end if;
  select * into a from top_commenter_awards x where x.username is not null and x.day >= d - 2 order by x.day desc limit 1;
  select coalesce(json_agg(json_build_object('u', t.username, 'n', t.n)), '[]'::json) into top from (select * from top_commenters(d) limit 5) t;
  select count(*) into mine from comment_log c where c.day = d and c.username = hh and c.valid;
  return json_build_object('day', d, 'crown', a.username, 'crown_day', a.day, 'crown_n', a.n, 'wish', a.wish, 'wish_status', a.wish_status,
                           'top', top, 'mine', coalesce(mine,0), 'now', now());
end $$;

grant execute on function public.commenter_state(text) to anon, authenticated;
revoke execute on function public.log_comment(text,text,text,timestamptz,text) from anon, authenticated, public;
revoke execute on function public.award_top_commenter(date) from anon, authenticated, public;
revoke execute on function public.set_commenter_wish(date,text,text) from anon, authenticated, public;
