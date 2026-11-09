-- Run once in Supabase (SQL Editor). Additive only - every statement
-- is IF NOT EXISTS / safe to re-run, and nothing here touches or
-- removes any existing row or column.
--
-- Adds:
--  1. Consent choice (visitors) - recorded once a visitor with
--     analytics consent makes a choice via the cookie banner.
--  2. Approximate IP / geo + device/browser/OS (visitors) - from
--     Vercel's own request headers, never a precise physical address,
--     admin-only (RLS already restricts this table to authenticated
--     users - see supabase/schema.sql), never returned by any public API.
--  3. is_test (leads) - the secure test-lead exclusion flag. Defaults
--     to false so every existing lead is correctly treated as real.

alter table public.visitors add column if not exists analytics_consent boolean;
alter table public.visitors add column if not exists ads_consent boolean;
alter table public.visitors add column if not exists consent_updated_at timestamptz;

alter table public.visitors add column if not exists ip_address text;
alter table public.visitors add column if not exists geo_country text;
alter table public.visitors add column if not exists geo_region text;
alter table public.visitors add column if not exists geo_city text;
alter table public.visitors add column if not exists user_agent text;
alter table public.visitors add column if not exists device_type text;
alter table public.visitors add column if not exists browser text;
alter table public.visitors add column if not exists os text;

alter table public.leads add column if not exists is_test boolean not null default false;

create index if not exists leads_is_test_idx on public.leads(is_test);
