-- ============================================================
-- FONCTIONS COMMUNES (ordre du directeur des jeux, 29.10.2026)
-- missions du jour, modération du chat, boîte à idées, statistiques, classements
-- Tables de la ruche uniquement (jamais noise_* / savta_*).
-- ============================================================

-- ---------- historique pollen par jour (stats : participations) ----------
create table if not exists public.honey_days(day date not null, handle text not null, pollen int not null default 0, primary key(day, handle));
alter table public.honey_days enable row level security;
create or replace function public.honey_days_sync() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.day is not null then
    insert into honey_days(day, handle, pollen) values (new.day, new.handle, coalesce(new.today, 0))
    on conflict (day, handle) do update set pollen = greatest(honey_days.pollen, excluded.pollen);
  end if;
  return new;
end $$;
drop trigger if exists honey_days_trg on public.honey;
create trigger honey_days_trg after insert or update on public.honey for each row execute function public.honey_days_sync();
insert into public.honey_days(day, handle, pollen) select day, handle, today from public.honey where day is not null on conflict do nothing;

-- ---------- méta du jeu (abonnés Instagram, mis à jour par la routine) ----------
create table if not exists public.game_meta(key text primary key, value text, updated_at timestamptz default now());
alter table public.game_meta enable row level security;
-- la routine du matin met à jour : insert into game_meta(key,value,updated_at) values ('ig_followers','<N>',now()) on conflict (key) do update set value=excluded.value, updated_at=now();

-- ---------- modération (chat + idées) ----------
create or replace function public.mod_check(t text) returns text language plpgsql immutable set search_path = public as $$
declare s text := lower(coalesce(t, '')); c text;
begin
  if s ~ '(https?://|www\.|t\.me/|wa\.me|bit\.ly|tinyurl|[a-z0-9-]+\.(com|net|org|io|me|ly|gg|tv|app|xyz|link|info|ru|co\.il|org\.il)([/ ]|$))' then return 'links'; end if;
  if s ~ '[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}' then return 'email'; end if;
  if s ~ '([0-9][ -]?){9,}' or s ~ '\+ ?972' then return 'phone'; end if;
  c := regexp_replace(s, '[^a-z0-9א-ת ]', '', 'g');
  if c ~ '(fuck|fck|shit|bitch|pussy|porn|nude|cunt|whore|slut|dick|cock|asshole|motherf|nigg|fagg|penis|vagina|boob|sex|זונה|שרמוט|מזדי|תזדי|לזיין|כוסאמ|כוסעמ|כוסשלאמ|כוסמק|בנזונ|מניאק|מטומטמ|מפגר|דביל|אידיוט|סקס|פורנו|ציצים|קוקסינל|שמוק)' then return 'bad'; end if;
  if s ~ '(^|[^א-ת])[והשבלמכ]?(זין|זיון|זיונים|חרא|כוס אמ|כוס של אמ|פוץ|זבל אדם)($|[^א-ת])' then return 'bad'; end if;
  return null;
end $$;

alter table public.messages add column if not exists hidden boolean not null default false;
alter table public.messages add column if not exists reports int not null default 0;
create table if not exists public.message_reports(message_id bigint not null references public.messages(id) on delete cascade, handle text not null, created_at timestamptz default now(), primary key(message_id, handle));
alter table public.message_reports enable row level security;
drop policy if exists msg_read on public.messages;
create policy msg_read on public.messages for select using (not hidden);

create or replace function public.post_message(h text, body text) returns bigint language plpgsql security definer set search_path = public as $$
#variable_conflict use_column
declare hid text := lower(btrim(h)); b text := btrim(body); nid bigint; m text;
begin
  if not exists (select 1 from bees where bees.handle = hid) then raise exception 'not_a_bee'; end if;
  if char_length(b) < 1 or char_length(b) > 140 then raise exception 'bad_length'; end if;
  m := mod_check(b);
  if m = 'links' then raise exception 'no_links'; elsif m = 'email' then raise exception 'no_email'; elsif m = 'phone' then raise exception 'no_phone'; elsif m = 'bad' then raise exception 'bad_words'; end if;
  if exists (select 1 from messages mm where mm.handle = hid and mm.created_at > now() - interval '10 seconds') then raise exception 'too_fast'; end if;
  insert into messages(handle, body) values (hid, b) returning id into nid;
  return nid;
end $$;

create or replace function public.report_message(h text, mid bigint) returns json language plpgsql security definer set search_path = public as $$
declare hid text := lower(btrim(h)); r record;
begin
  if not exists (select 1 from bees where handle = hid) then raise exception 'not_a_bee'; end if;
  if exists (select 1 from messages where id = mid and handle = hid) then raise exception 'own_message'; end if;
  insert into message_reports(message_id, handle) values (mid, hid) on conflict do nothing;
  if found then update messages set reports = reports + 1, hidden = hidden or reports + 1 >= 3 where id = mid; end if;
  select reports, hidden into r from messages where id = mid;
  return json_build_object('reports', coalesce(r.reports, 0), 'hidden', coalesce(r.hidden, true));
end $$;

create or replace function public.admin_reported(pass text) returns json language plpgsql security definer set search_path = public, extensions as $$
begin
  if not exists (select 1 from admin_secret where pass_hash = crypt(pass, pass_hash)) then raise exception 'bad password'; end if;
  return coalesce((select json_agg(x) from (select id, handle, body, reports, hidden, created_at from messages where reports > 0 order by id desc limit 50) x), '[]'::json);
end $$;

-- ---------- boîte à idées : 200 caractères, 3 par jour (heure d'Israël) ----------
alter table public.ideas add column if not exists reviewed boolean not null default false;
create or replace function public.post_idea(h text, body text) returns json language plpgsql security definer set search_path = public as $$
declare hid text := lower(btrim(h)); b text := btrim(coalesce(body, '')); r record; m text; d date := (now() at time zone 'Asia/Jerusalem')::date;
begin
  if not exists (select 1 from bees where handle = hid) then raise exception 'not_a_bee'; end if;
  if char_length(b) < 3 or char_length(b) > 200 then raise exception 'bad_length'; end if;
  m := mod_check(b);
  if m = 'links' then raise exception 'no_links'; elsif m = 'email' then raise exception 'no_email'; elsif m = 'phone' then raise exception 'no_phone'; elsif m = 'bad' then raise exception 'bad_words'; end if;
  if exists (select 1 from ideas where handle = hid and created_at > now() - interval '60 seconds') then raise exception 'too_fast'; end if;
  if (select count(*) from ideas where handle = hid and (created_at at time zone 'Asia/Jerusalem')::date = d) >= 3 then raise exception 'too_many'; end if;
  insert into ideas(handle, body) values (hid, b) returning * into r;
  return row_to_json(r);
end $$;

-- ---------- missions du jour ----------
create table if not exists public.mission_claims(day date not null, handle text not null, mission text not null, bonus int not null, created_at timestamptz default now(), primary key(day, handle, mission));
alter table public.mission_claims enable row level security;

-- 3 missions par jour : 1 mission pollen + 2 tirées (déterministe selon la date)
create or replace function public.daily_missions(d date) returns text[] language sql immutable as $$
  select array[(array['pollen50','pollen100','pollen150'])[1 + (abs(hashtext(d::text)) % 3)]]
      || array(select k from unnest(array['login','comment','invite','evening','chat','idea']) k order by md5(d::text || k) limit 2);
$$;

create or replace function public.missions_state(h text default '') returns json language plpgsql security definer set search_path = public as $$
declare hid text := lower(btrim(coalesce(h, ''), ' @')); d date := (now() at time zone 'Asia/Jerusalem')::date;
  hr int := extract(hour from (now() at time zone 'Asia/Jerusalem'))::int;
  isbee boolean; k text; t int; p int; bn int; done boolean; claimed boolean; nw boolean; out json[] := '{}'; ptoday int; ndone int := 0;
begin
  isbee := hid <> '' and exists (select 1 from bees where handle = hid);
  select case when x.day = d then x.today else 0 end into ptoday from honey x where x.handle = hid;
  ptoday := coalesce(ptoday, 0);
  foreach k in array daily_missions(d) loop
    t := 1; p := 0;
    if k like 'pollen%' then t := substr(k, 7)::int; bn := case t when 50 then 20 when 100 then 30 else 40 end; p := least(ptoday, t);
    elsif k = 'login' then bn := 10; p := case when exists (select 1 from bees where handle = hid and last_visit = d) then 1 else 0 end;
    elsif k = 'comment' then bn := 30; p := case when exists (select 1 from daily_commenters where day = d and username = hid) then 1 else 0 end;
    elsif k = 'invite' then bn := 50; p := case when exists (select 1 from bees where referred_by = hid and (created_at at time zone 'Asia/Jerusalem')::date = d) then 1 else 0 end;
    elsif k = 'evening' then bn := 20; p := case when isbee and hr >= 18 then 1 else 0 end;
    elsif k = 'chat' then bn := 15; p := case when exists (select 1 from messages where handle = hid and (created_at at time zone 'Asia/Jerusalem')::date = d) then 1 else 0 end;
    elsif k = 'idea' then bn := 15; p := case when exists (select 1 from ideas where handle = hid and (created_at at time zone 'Asia/Jerusalem')::date = d) then 1 else 0 end;
    end if;
    done := isbee and p >= t;
    claimed := exists (select 1 from mission_claims c where c.day = d and c.handle = hid and c.mission = k);
    nw := false;
    if done and not claimed then
      insert into mission_claims(day, handle, mission, bonus) values (d, hid, k, bn) on conflict do nothing;
      if found then
        insert into honey(handle, total, today, day, last_at) values (hid, 0, 0, d, now() - interval '1 minute') on conflict (handle) do nothing;
        update honey set today = case when day = d then today else 0 end + bn, total = total + bn, day = d where handle = hid;
        nw := true;
      end if;
      claimed := true;
    end if;
    if claimed then ndone := ndone + 1; end if;
    out := out || json_build_object('k', k, 'target', t, 'progress', case when claimed then t else p end, 'bonus', bn, 'done', claimed, 'new', nw);
  end loop;
  return json_build_object('day', d, 'missions', array_to_json(out), 'done', ndone, 'total', array_length(out, 1));
end $$;

-- ---------- statistiques ----------
create or replace function public.player_stats(h text) returns json language plpgsql stable security definer set search_path = public as $$
declare hid text := lower(btrim(coalesce(h, ''), ' @')); d date := (now() at time zone 'Asia/Jerusalem')::date; b record; x record;
  rt int; rtot int; part int; wl int; wb int; mt int; md int;
begin
  select * into b from bees where handle = hid;
  if not found then return null; end if;
  select case when day = d then today else 0 end as today, total into x from honey where handle = hid;
  select count(*) + 1 into rt from honey where day = d and today > coalesce(x.today, 0);
  select count(*) + 1 into rtot from honey where total > coalesce(x.total, 0);
  select count(*) into part from honey_days hd where hd.handle = hid and hd.pollen >= 200
    and (hd.day < date '2026-10-30' or exists (select 1 from daily_commenters c where c.day = hd.day and c.username = hid));
  select count(*) into wl from lottery_draws where winner = hid;
  select count(*) into wb from treasure_wins where handle = hid;
  select count(*) filter (where day = d), count(*) into md, mt from mission_claims where handle = hid;
  return json_build_object('handle', hid, 'today', coalesce(x.today, 0), 'total', coalesce(x.total, 0),
    'rank_today', case when coalesce(x.today, 0) > 0 then rt end, 'rank_total', case when coalesce(x.total, 0) > 0 then rtot end,
    'streak', coalesce(b.streak, 0), 'best_streak', coalesce(b.best_streak, 0), 'refs', coalesce(b.refs, 0),
    'missions_today', md, 'missions_total', mt, 'participations', part, 'wins_lottery', wl, 'wins_billets', wb, 'joined', b.created_at);
end $$;

create or replace function public.global_stats() returns json language sql stable security definer set search_path = public as $$
  with d as (select (now() at time zone 'Asia/Jerusalem')::date as d)
  select json_build_object(
    'players', (select count(*) from bees),
    'new_today', (select count(*) from bees, d where (created_at at time zone 'Asia/Jerusalem')::date = d.d),
    'active_today', (select count(*) from honey, d where day = d.d and today > 0),
    'pollen_today', (select coalesce(sum(today), 0) from honey, d where day = d.d),
    'pollen_total', (select coalesce(sum(total), 0) from honey),
    'entrants_today', (select count(*) from d, lottery_eligible(d.d)),
    'followers', (select value::int from game_meta where key = 'ig_followers'),
    'followers_at', (select updated_at from game_meta where key = 'ig_followers'));
$$;

-- ---------- classements (jour + général, avec la place du joueur) ----------
create or replace function public.leaderboard(h text default '') returns json language plpgsql stable security definer set search_path = public as $$
declare hid text := lower(btrim(coalesce(h, ''), ' @')); d date := (now() at time zone 'Asia/Jerusalem')::date;
begin
  return json_build_object(
    'today', coalesce((select json_agg(z) from (select handle, today as score, rank() over (order by today desc) as rank from honey where day = d and today > 0 order by today desc, handle limit 10) z), '[]'::json),
    'total', coalesce((select json_agg(z) from (select handle, total as score, rank() over (order by total desc) as rank from honey where total > 0 order by total desc, handle limit 10) z), '[]'::json),
    'me_today', (select row_to_json(z) from (select handle, score, rank from (select handle, today as score, rank() over (order by today desc) as rank from honey where day = d and today > 0) q where handle = hid) z),
    'me_total', (select row_to_json(z) from (select handle, score, rank from (select handle, total as score, rank() over (order by total desc) as rank from honey where total > 0) q where handle = hid) z));
end $$;

grant execute on function public.report_message(text, bigint), public.admin_reported(text), public.missions_state(text), public.player_stats(text), public.global_stats(), public.leaderboard(text), public.post_idea(text, text), public.post_message(text, text) to anon, authenticated;

-- ---------- chat en direct (Supabase realtime) ----------
alter publication supabase_realtime add table public.messages;
