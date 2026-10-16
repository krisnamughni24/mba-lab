-- MBA Lab: database schema for accounts, progress and history.
-- Run once: Supabase dashboard -> SQL Editor -> New query -> paste all -> Run.
-- Safe to run again (uses IF NOT EXISTS / OR REPLACE).

-- ---------- access mode: 'public' (any Google account) or 'class' (only allowed emails / domains) ----------
create table if not exists public.app_settings (key text primary key, value text not null);
insert into public.app_settings (key, value) values ('access_mode', 'public') on conflict (key) do nothing;

create table if not exists public.allowed_emails  (email  text primary key);   -- used when access_mode = 'class'
create table if not exists public.allowed_domains (domain text primary key);   -- e.g. 'kampus.ac.id'

alter table public.app_settings   enable row level security;
alter table public.allowed_emails  enable row level security;
alter table public.allowed_domains enable row level security;
-- no policies on these three tables: browsers cannot read or change them; only the SQL editor / service role can.

create or replace function public.is_allowed() returns boolean
language sql stable security definer set search_path = public as $$
  select auth.uid() is not null and (
    coalesce((select value from public.app_settings where key = 'access_mode'), 'public') = 'public'
    or exists (select 1 from public.allowed_emails  where lower(email)  = lower(auth.jwt() ->> 'email'))
    or exists (select 1 from public.allowed_domains where lower(domain) = lower(split_part(auth.jwt() ->> 'email', '@', 2)))
  );
$$;
grant execute on function public.is_allowed() to authenticated;

-- ---------- profile (one row per user) ----------
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  name       text,
  avatar_url text,
  lang       text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
drop policy if exists "profiles own" on public.profiles;
create policy "profiles own" on public.profiles for all to authenticated
  using (id = auth.uid() and public.is_allowed()) with check (id = auth.uid() and public.is_allowed());

-- create the profile automatically when someone signs in for the first time
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'), new.raw_user_meta_data ->> 'avatar_url')
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- ---------- progress: one JSON document per user per simulation ----------
create table if not exists public.user_state (
  user_id    uuid not null references auth.users (id) on delete cascade,
  sim        text not null,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, sim)
);
alter table public.user_state enable row level security;
drop policy if exists "state own" on public.user_state;
create policy "state own" on public.user_state for all to authenticated
  using (user_id = auth.uid() and public.is_allowed()) with check (user_id = auth.uid() and public.is_allowed());

-- ---------- history: one row per finished attempt ----------
create table if not exists public.attempts (
  id      bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  sim     text not null,
  at      timestamptz not null default now(),
  score   numeric,
  detail  jsonb not null default '{}'::jsonb,
  unique (user_id, sim, at)
);
create index if not exists attempts_user_at on public.attempts (user_id, at desc);
alter table public.attempts enable row level security;
drop policy if exists "attempts own" on public.attempts;
create policy "attempts own" on public.attempts for all to authenticated
  using (user_id = auth.uid() and public.is_allowed()) with check (user_id = auth.uid() and public.is_allowed());

-- ---------- leaderboard ----------
-- Profile fields for the board: new players appear by default (first name or chosen display name) and can switch it off in Settings.
alter table public.profiles add column if not exists display_name  text check (char_length(display_name) <= 24);
alter table public.profiles add column if not exists show_on_board boolean not null default true;
alter table public.profiles alter column show_on_board set default true;   -- existing rows keep their own choice

-- Attempts carry a 0-100 score, a variant (scenario / level / background) and whether they count for the board.
alter table public.attempts add column if not exists variant text    not null default '';
alter table public.attempts add column if not exists ranked  boolean not null default true;
do $$ begin
  alter table public.attempts add constraint attempts_score_range check (score is null or (score >= 0 and score <= 100));
exception when duplicate_object then null; end $$;
do $$ begin
  alter table public.user_state add constraint user_state_size check (pg_column_size(data) < 200000);
exception when duplicate_object then null; end $$;

-- Basic anti-abuse (the browser reports scores, so this is a guard rail, not proof): sane timestamps and a rate limit.
create or replace function public.attempts_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.at < now() - interval '7 days' or new.at > now() + interval '10 minutes' then
    new.ranked := false;                        -- old imported history is kept but does not count for the board
  end if;
  if (select count(*) from public.attempts where user_id = new.user_id and created_at > now() - interval '1 hour') >= 120 then
    raise exception 'too many attempts, slow down';
  end if;
  return new;
end $$;
alter table public.attempts add column if not exists created_at timestamptz not null default now();
drop trigger if exists attempts_guard_t on public.attempts;
create trigger attempts_guard_t before insert on public.attempts for each row execute function public.attempts_guard();

-- Points = sum over (simulation, variant) of the user's best score. p_sim = null means all simulations.
-- Readable by guests (anon) too. Returns the top p_limit rows plus the caller's own row when it is further down.
create or replace function public.leaderboard(p_sim text default null, p_limit int default 20)
returns table (rank bigint, name text, points numeric, plays bigint, is_me boolean)
language sql stable security definer set search_path = public as $$
  with best as (
    select user_id, sim, variant, max(score) as s, count(*) as n
    from public.attempts
    where ranked and score is not null and (p_sim is null or sim = p_sim)
    group by user_id, sim, variant
  ), tot as (
    select b.user_id, sum(b.s) as pts, sum(b.n) as plays
    from best b join public.profiles p on p.id = b.user_id
    where p.show_on_board or b.user_id = auth.uid()
    group by b.user_id
  ), ranked as (
    select rank() over (order by t.pts desc)::bigint as rk,
           row_number() over (order by t.pts desc, t.user_id) as rn,
           coalesce(nullif(p.display_name, ''), split_part(coalesce(p.name, 'Player'), ' ', 1)) as nm,
           round(t.pts, 1) as pts, t.plays, coalesce(t.user_id = auth.uid(), false) as me
    from tot t join public.profiles p on p.id = t.user_id
  )
  select rk, nm, pts, plays, me from ranked
  where public.is_allowed() and (rn <= least(greatest(p_limit, 1), 100) or me)
  order by rn;
$$;
grant execute on function public.leaderboard(text, int) to anon, authenticated;

-- ---------- "delete my account and data" button ----------
create or replace function public.delete_my_account() returns void
language plpgsql security definer set search_path = public, auth as $$
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  delete from auth.users where id = auth.uid();   -- cascades to profiles, user_state, attempts
end $$;
grant execute on function public.delete_my_account() to authenticated;

-- ---------- to restrict the site to your class later, run (edit the values): ----------
-- update public.app_settings set value = 'class' where key = 'access_mode';
-- insert into public.allowed_domains (domain) values ('kampus.ac.id');
-- insert into public.allowed_emails (email) values ('teman@gmail.com');
-- and to open it again:  update public.app_settings set value = 'public' where key = 'access_mode';
