-- Run once in Supabase (SQL Editor). Stores the "When did you take over
-- the premises?" answer from the lead form.
alter table public.leads add column if not exists takeover_timing text;
