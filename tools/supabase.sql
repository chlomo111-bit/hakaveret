-- הכוורת שלנו : base de données (à coller une seule fois dans Supabase > SQL Editor > Run)

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.bees (
  id          bigint generated always as identity primary key,
  handle      text not null unique check (handle ~ '^[a-z0-9._]{1,30}$'),
  is_queen    boolean not null default false,
  style       jsonb   not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

alter table public.bees enable row level security;

-- Tout le monde peut voir la ruche
create policy "bees_read" on public.bees for select using (true);

-- Tout le monde peut ajouter SON abeille (jamais reine, jamais de style imposé)
create policy "bees_join" on public.bees for insert
  with check (is_queen = false and style = '{}'::jsonb);

-- Mot de passe admin (CHANGE-LE avant de lancer la commande)
create table if not exists public.admin_secret (pass_hash text not null);
revoke all on public.admin_secret from anon, authenticated;
insert into public.admin_secret (pass_hash)
  values (extensions.crypt('MOT_DE_PASSE_A_CHANGER', extensions.gen_salt('bf')));

-- Ajout / mise à jour en liste depuis le panneau admin (#admin)
create or replace function public.admin_upsert(pass text, items jsonb)
returns integer
language plpgsql
security definer
set search_path = public, extensions
as $$
declare n integer := 0; it jsonb;
begin
  if not exists (select 1 from admin_secret where pass_hash = crypt(pass, pass_hash)) then
    raise exception 'bad password';
  end if;
  for it in select * from jsonb_array_elements(items) loop
    if coalesce((it->>'remove')::boolean, false) then
      delete from bees where handle = lower(it->>'handle');
    else
      insert into bees (handle, is_queen, style)
      values (lower(it->>'handle'), coalesce((it->>'queen')::boolean, false), coalesce(it->'style', '{}'::jsonb))
      on conflict (handle) do update
        set is_queen = coalesce((it->>'queen')::boolean, bees.is_queen),
            style    = bees.style || excluded.style;
    end if;
    n := n + 1;
  end loop;
  return n;
end $$;

revoke all on function public.admin_upsert(text, jsonb) from public;
grant execute on function public.admin_upsert(text, jsonb) to anon, authenticated;

-- Billet caché : un seul gagnant par jour (heure d'Israël)
create table if not exists public.treasure_wins (
  day       date primary key,
  handle    text not null check (handle ~ '^[a-z0-9._]{1,30}$'),
  found_at  timestamptz not null default now()
);
alter table public.treasure_wins enable row level security;
create policy "wins_read" on public.treasure_wins for select using (true);

create or replace function public.claim_treasure(h text)
returns table(handle text, found_at timestamptz, is_me boolean)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare d date := ((now() at time zone 'Asia/Jerusalem') - interval '9 hours')::date;
begin
  insert into treasure_wins(day, handle) values (d, lower(h)) on conflict (day) do nothing;
  return query select w.handle, w.found_at, w.handle = lower(h) from treasure_wins w where w.day = d;
end $$;

revoke all on function public.claim_treasure(text) from public;
grant execute on function public.claim_treasure(text) to anon, authenticated;

-- Accès pour le site (lecture + inscription)
grant usage on schema public to anon, authenticated;
grant select, insert on public.bees to anon, authenticated;
grant select on public.treasure_wins to anon, authenticated;
grant usage, select on all sequences in schema public to anon, authenticated;

-- ================= CHAT =================
create table if not exists public.messages (
  id          bigint generated always as identity primary key,
  handle      text not null,
  body        text not null check (char_length(body) between 1 and 140),
  created_at  timestamptz not null default now()
);
alter table public.messages enable row level security;
create policy "msg_read" on public.messages for select using (true);
grant select on public.messages to anon, authenticated;

create or replace function public.post_message(h text, body text)
returns bigint language plpgsql security definer set search_path = public as $$
#variable_conflict use_column
declare hid text := lower(btrim(h)); b text := btrim(body); nid bigint;
begin
  if not exists (select 1 from bees where bees.handle = hid) then raise exception 'not_a_bee'; end if;
  if char_length(b) < 1 or char_length(b) > 140 then raise exception 'bad_length'; end if;
  if b ~* '(https?://|www\.)' then raise exception 'no_links'; end if;
  if exists (select 1 from messages m where m.handle = hid and m.created_at > now() - interval '10 seconds') then
    raise exception 'too_fast';
  end if;
  insert into messages(handle, body) values (hid, b) returning id into nid;
  return nid;
end $$;
revoke all on function public.post_message(text, text) from public;
grant execute on function public.post_message(text, text) to anon, authenticated;

create or replace function public.admin_delete_message(pass text, mid bigint)
returns void language plpgsql security definer set search_path = public, extensions as $$
begin
  if not exists (select 1 from admin_secret where pass_hash = crypt(pass, pass_hash)) then
    raise exception 'bad password';
  end if;
  delete from messages where id = mid;
end $$;
revoke all on function public.admin_delete_message(text, bigint) from public;
grant execute on function public.admin_delete_message(text, bigint) to anon, authenticated;
-- ================= V2 : parrainage, série de jours, actualités =================
alter table public.bees add column if not exists referred_by text;
alter table public.bees add column if not exists refs int not null default 0;
alter table public.bees add column if not exists streak int not null default 0;
alter table public.bees add column if not exists best_streak int not null default 0;
alter table public.bees add column if not exists last_visit date;

-- Inscription (avec parrain éventuel)
create or replace function public.join_bee(h text, ref text default null)
returns setof public.bees language plpgsql security definer set search_path = public as $$
#variable_conflict use_column
declare hid text := lower(btrim(h)); r text := lower(btrim(coalesce(ref, '')));
begin
  if hid !~ '^[a-z0-9._]{1,30}$' then raise exception 'bad_handle'; end if;
  if not exists (select 1 from bees where bees.handle = hid) then
    if r = '' or r = hid or not exists (select 1 from bees where bees.handle = r) then r := null; end if;
    insert into bees(handle, referred_by) values (hid, r);
    if r is not null then update bees set refs = refs + 1 where bees.handle = r; end if;
  end if;
  return query select * from bees where bees.handle = hid;
end $$;
revoke all on function public.join_bee(text, text) from public;
grant execute on function public.join_bee(text, text) to anon, authenticated;

-- Passage du jour (série)
create or replace function public.check_in(h text)
returns table(streak int, best_streak int) language plpgsql security definer set search_path = public as $$
#variable_conflict use_column
declare hid text := lower(btrim(h)); d date := (now() at time zone 'Asia/Jerusalem')::date; lv date; s int; b int;
begin
  select bees.last_visit, bees.streak, bees.best_streak into lv, s, b from bees where bees.handle = hid;
  if not found then return; end if;
  if lv is distinct from d then
    if lv = d - 1 then s := s + 1; else s := 1; end if;
    b := greatest(b, s);
    update bees set last_visit = d, streak = s, best_streak = b where bees.handle = hid;
  end if;
  return query select s, b;
end $$;
revoke all on function public.check_in(text) from public;
grant execute on function public.check_in(text) to anon, authenticated;

-- Actualités (popup dans le jeu)
create table if not exists public.news (
  id          bigint generated always as identity primary key,
  title       text not null,
  body        text not null,
  created_at  timestamptz not null default now()
);
alter table public.news enable row level security;
create policy "news_read" on public.news for select using (true);
grant select on public.news to anon, authenticated;

create or replace function public.admin_post_news(pass text, title text, body text)
returns bigint language plpgsql security definer set search_path = public, extensions as $$
#variable_conflict use_variable
declare nid bigint;
begin
  if not exists (select 1 from admin_secret where pass_hash = crypt(pass, pass_hash)) then
    raise exception 'bad password';
  end if;
  insert into news(title, body) values (title, body) returning id into nid;
  return nid;
end $$;
revoke all on function public.admin_post_news(text, text, text) from public;
grant execute on function public.admin_post_news(text, text, text) to anon, authenticated;

insert into public.news(title, body) values (
  'חדש בכוורת! 🐝',
  '🔥 בואו כל יום: הדבורה שלכם צוברת ימים ברצף ומקבלת פרס (3 ימים 🌸, 7 ימים כנפי זהב ✨, 30 ימים כתר 👑).
📣 הזמינו חברים עם הקישור האישי שלכם: חבר אחד = מגבעת 🎩, 3 חברים = כנפי זהב ✨, 10 חברים = כתר 👑.
🎯 כולנו ביחד: כשהכוורת מגיעה ליעד, היא גדלה לכולם!'
);

-- Automatisation Instagram (anti-doublon)
create table if not exists public.ig_seen_comments (comment_id text primary key, handle text not null, seen_at timestamptz not null default now());
create table if not exists public.ig_welcomed (handle text primary key, comment_id text, replied_at timestamptz not null default now());
alter table public.ig_seen_comments enable row level security;
alter table public.ig_welcomed enable row level security;
revoke all on public.ig_seen_comments from anon, authenticated;
revoke all on public.ig_welcomed from anon, authenticated;
