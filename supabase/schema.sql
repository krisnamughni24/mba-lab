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
