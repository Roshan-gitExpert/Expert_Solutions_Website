-- ============================================================
-- Expert Solutions - Business Energy website
-- Phase 2 database schema
-- ------------------------------------------------------------
-- HOW TO USE THIS FILE:
-- 1. Open your Supabase project.
-- 2. Go to the "SQL Editor" in the left-hand menu.
-- 3. Click "New query", paste the ENTIRE contents of this file, and
--    click "Run".
-- That's it - every table, index and security rule below will be
-- created in one go. It is safe to run this once on a brand new
-- project. Do not run it twice without checking with a developer,
-- as it will fail on tables that already exist.
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- 1. users  (internal staff / agents - Roshan, Shamsher, etc.)
-- One row per person who is allowed to log into /admin. Linked
-- 1-to-1 with Supabase Auth (auth.users) by id.
-- ------------------------------------------------------------
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'agent' check (role in ('agent', 'admin')),
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 2. visitors  (one row per unique website visitor / browser)
-- ------------------------------------------------------------
create table if not exists public.visitors (
  id uuid primary key,
  session_id text,
  first_landing_page text,
  first_gclid text,
  first_utm_source text,
  first_utm_medium text,
  first_utm_campaign text,
  first_utm_term text,
  first_utm_content text,
  last_landing_page text,
  last_gclid text,
  last_utm_source text,
  last_utm_medium text,
  last_utm_campaign text,
  last_utm_term text,
  last_utm_content text,
  pages_viewed jsonb not null default '[]'::jsonb,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 3. visitor_events  (page views, scroll depth, clicks, etc.)
-- ------------------------------------------------------------
create table if not exists public.visitor_events (
  id bigint generated always as identity primary key,
  visitor_id uuid references public.visitors(id) on delete set null,
  event_name text not null,
  event_data jsonb not null default '{}'::jsonb,
  path text,
  created_at timestamptz not null default now()
);

create index if not exists visitor_events_visitor_id_idx on public.visitor_events(visitor_id);
create index if not exists visitor_events_event_name_idx on public.visitor_events(event_name);

-- ------------------------------------------------------------
-- 4. leads  (every form submission / callback request)
-- ------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid references public.visitors(id) on delete set null,
  source_type text not null default 'form' check (source_type in ('form', 'callback', 'chat')),
  landing_page_variant text,
  business_name text,
  postcode text,
  contact_name text,
  phone text,
  email text,
  business_type text,
  energy_type text,
  spend_range text,
  current_supplier text,
  contract_end_date date,
  number_of_sites text,
  annual_consumption text,
  best_time_to_contact text,
  status text not null default 'NEW' check (
    status in ('NEW', 'CONTACTED', 'QUALIFIED', 'QUOTE_REQUESTED', 'PROPOSAL', 'WON', 'LOST', 'FOLLOW_UP')
  ),
  assigned_agent uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_status_idx on public.leads(status);
create index if not exists leads_created_at_idx on public.leads(created_at);
create index if not exists leads_assigned_agent_idx on public.leads(assigned_agent);

-- Keep updated_at current whenever a lead row changes.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- 5. lead_status_history  (audit trail of every status change)
-- ------------------------------------------------------------
create table if not exists public.lead_status_history (
  id bigint generated always as identity primary key,
  lead_id uuid references public.leads(id) on delete cascade,
  old_status text,
  new_status text not null,
  changed_by uuid references public.users(id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists lead_status_history_lead_id_idx on public.lead_status_history(lead_id);

-- ------------------------------------------------------------
-- 6. campaign_attribution  (PPC attribution captured per lead)
-- ------------------------------------------------------------
create table if not exists public.campaign_attribution (
  id bigint generated always as identity primary key,
  lead_id uuid references public.leads(id) on delete cascade,
  visitor_id uuid references public.visitors(id) on delete set null,
  gclid text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  landing_page text,
  first_page_visited text,
  conversion_page text,
  created_at timestamptz not null default now()
);

create index if not exists campaign_attribution_lead_id_idx on public.campaign_attribution(lead_id);
create index if not exists campaign_attribution_utm_campaign_idx on public.campaign_attribution(utm_campaign);

-- ------------------------------------------------------------
-- 7 & 8. chat_sessions / chat_messages
-- Created now so the schema is ready - the live chat widget and
-- agent dashboard that READ/WRITE these tables are built in Phase 3.
-- ------------------------------------------------------------
create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid references public.visitors(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  customer_name text,
  customer_company text,
  assigned_agent uuid references public.users(id) on delete set null,
  status text not null default 'waiting' check (status in ('waiting', 'active', 'closed')),
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create table if not exists public.chat_messages (
  id bigint generated always as identity primary key,
  chat_session_id uuid references public.chat_sessions(id) on delete cascade,
  sender_type text not null check (sender_type in ('customer', 'agent')),
  sender_name text,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_session_id_idx on public.chat_messages(chat_session_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ------------------------------------------------------------
-- Every table below is locked down so that ONLY a logged-in
-- internal user (someone who has been given a Supabase Auth
-- login, e.g. Roshan or Shamsher) can read lead/visitor data.
--
-- Nothing in this file grants the public "anon" role permission to
-- read or write these tables. All writes from the public website
-- (new leads, visitor events, campaign attribution) go through the
-- Next.js API routes in app/api/*, which use the SUPABASE_SERVICE_
-- ROLE_KEY on the server only - that key bypasses RLS by design and
-- is never sent to the browser. This is what "do not expose
-- customer information in frontend JavaScript" means in practice.
-- ============================================================

alter table public.users enable row level security;
alter table public.visitors enable row level security;
alter table public.visitor_events enable row level security;
alter table public.leads enable row level security;
alter table public.lead_status_history enable row level security;
alter table public.campaign_attribution enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;

drop policy if exists users_select_authenticated on public.users;
create policy users_select_authenticated on public.users
  for select using (auth.role() = 'authenticated');

drop policy if exists users_update_own on public.users;
create policy users_update_own on public.users
  for update using (auth.uid() = id);

drop policy if exists visitors_select_authenticated on public.visitors;
create policy visitors_select_authenticated on public.visitors
  for select using (auth.role() = 'authenticated');

drop policy if exists visitor_events_select_authenticated on public.visitor_events;
create policy visitor_events_select_authenticated on public.visitor_events
  for select using (auth.role() = 'authenticated');

drop policy if exists leads_select_authenticated on public.leads;
create policy leads_select_authenticated on public.leads
  for select using (auth.role() = 'authenticated');

drop policy if exists leads_update_authenticated on public.leads;
create policy leads_update_authenticated on public.leads
  for update using (auth.role() = 'authenticated');

drop policy if exists lead_status_history_select_authenticated on public.lead_status_history;
create policy lead_status_history_select_authenticated on public.lead_status_history
  for select using (auth.role() = 'authenticated');

drop policy if exists lead_status_history_insert_authenticated on public.lead_status_history;
create policy lead_status_history_insert_authenticated on public.lead_status_history
  for insert with check (auth.role() = 'authenticated');

drop policy if exists campaign_attribution_select_authenticated on public.campaign_attribution;
create policy campaign_attribution_select_authenticated on public.campaign_attribution
  for select using (auth.role() = 'authenticated');

drop policy if exists chat_sessions_select_authenticated on public.chat_sessions;
create policy chat_sessions_select_authenticated on public.chat_sessions
  for select using (auth.role() = 'authenticated');

drop policy if exists chat_messages_select_authenticated on public.chat_messages;
create policy chat_messages_select_authenticated on public.chat_messages
  for select using (auth.role() = 'authenticated');

-- ============================================================
-- AFTER RUNNING THIS FILE:
-- 1. Go to Authentication > Users in Supabase and invite Roshan
--    and Shamsher by email (this sends them a login link).
-- 2. For each person, copy their new "User UID" and run:
--
--    insert into public.users (id, full_name, role)
--    values ('paste-their-user-uid-here', 'Roshan', 'admin');
--
--    (repeat for Shamsher, with role 'agent' or 'admin' as you prefer)
-- 3. See SUPABASE_SETUP.md in the project root for the full walkthrough.
-- ============================================================
