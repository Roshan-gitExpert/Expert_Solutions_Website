-- ============================================================
-- Expert Solutions - Business Energy website
-- DeepFakes (AI synthetic-media campaign) lead capture
-- ------------------------------------------------------------
-- ADDITIVE migration - does not touch any table created by
-- schema.sql. Safe to run once on the existing Phase 2 database.
--
-- HOW TO USE THIS FILE:
-- 1. Open your Supabase project > SQL Editor > New query.
-- 2. Paste the ENTIRE contents of this file and click Run.
--
-- This is the real-time CAPTURE layer for the synthetic-media lead
-- funnel described in the DeepFakes project brief. A scheduled
-- research/enrichment job (run from Claude, on a timer) reads new
-- rows here, fills in the enrichment columns below via public-source
-- research (never fabricated), and mirrors the enriched record into
-- the DEEPFAKES worksheet of the MASTER UK SMB LEAD DATABASE
-- workbook - marking master_engine_synced = true once done, so the
-- same row is never re-processed.
-- ============================================================

create table if not exists public.deepfake_leads (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid references public.visitors(id) on delete set null,

  -- Campaign / attribution (captured automatically, never asked of the customer)
  campaign_slug text not null,
  ai_video_id text,
  landing_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  gclid text,
  referral_source text,

  -- Customer-provided (exactly 4 fields on the public form)
  business_name text not null,
  contact_name text not null,
  phone text not null,
  email text not null,

  -- Automatically enriched - company (filled in by the sync/research job)
  trading_name text,
  full_address text,
  town_city text,
  postcode text,
  website text,
  companies_house_number text,
  business_category text,

  -- Automatically enriched - phone
  primary_phone text,
  secondary_phone text,
  mobile_phone text,
  phone_type text,
  phone_source text,
  phone_source_url text,
  phone_verification_status text,
  phone_last_checked date,
  public_email text,

  -- Automatically enriched - commercial trigger / signal
  current_energy_supplier text,
  number_of_sites text,
  business_trigger text,
  trigger_details text,
  research_source text,
  research_source_url text,
  last_researched date,

  -- Duplicate management (against this table and the master workbook)
  duplicate_check_status text default 'Not checked',
  merged_into_lead_id text,

  -- Sales / qualification
  lead_temperature text,
  qualification_status text,
  callable text default 'Unknown',
  sales_notes text,
  follow_up_status text,
  last_contacted date,
  next_follow_up date,
  outcome text,
  status text not null default 'NEW' check (
    status in ('NEW', 'CONTACTED', 'QUALIFIED', 'QUOTE_REQUESTED', 'PROPOSAL', 'WON', 'LOST', 'FOLLOW_UP')
  ),

  -- Sync tracking against the master workbook's DEEPFAKES worksheet
  master_engine_synced boolean not null default false,
  master_engine_lead_id text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists deepfake_leads_status_idx on public.deepfake_leads(status);
create index if not exists deepfake_leads_campaign_idx on public.deepfake_leads(campaign_slug);
create index if not exists deepfake_leads_created_at_idx on public.deepfake_leads(created_at);
create index if not exists deepfake_leads_synced_idx on public.deepfake_leads(master_engine_synced);
create index if not exists deepfake_leads_phone_idx on public.deepfake_leads(phone);
create index if not exists deepfake_leads_email_idx on public.deepfake_leads(email);

-- Reuses the set_updated_at() function already created by schema.sql
drop trigger if exists deepfake_leads_set_updated_at on public.deepfake_leads;
create trigger deepfake_leads_set_updated_at
  before update on public.deepfake_leads
  for each row execute function public.set_updated_at();

-- Same RLS pattern as every other table: only authenticated staff can
-- read/update; all writes from the public website go through the
-- server-side /api/deepfake-leads route using the service-role key,
-- which bypasses RLS by design and never reaches the browser.
alter table public.deepfake_leads enable row level security;

drop policy if exists deepfake_leads_select_authenticated on public.deepfake_leads;
create policy deepfake_leads_select_authenticated on public.deepfake_leads
  for select using (auth.role() = 'authenticated');

drop policy if exists deepfake_leads_update_authenticated on public.deepfake_leads;
create policy deepfake_leads_update_authenticated on public.deepfake_leads
  for update using (auth.role() = 'authenticated');
