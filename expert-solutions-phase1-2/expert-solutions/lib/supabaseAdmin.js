import { createClient } from '@supabase/supabase-js';

// SERVER-ONLY Supabase client, using the secret service-role key.
// This file must only ever be imported from files under app/api/*
// (Next.js Route Handlers), which run on the server / as a Netlify
// Function - never in a browser-rendered component.
//
// The service-role key bypasses Row Level Security entirely, which
// is why it is powerful and why it must never reach the browser.
// It is read here from SUPABASE_SERVICE_ROLE_KEY, which deliberately
// has NO "NEXT_PUBLIC_" prefix - Next.js only exposes NEXT_PUBLIC_*
// variables to the browser bundle, so this one stays server-side by
// construction as long as it's only ever read in this file.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const isSupabaseAdminConfigured = Boolean(supabaseUrl && serviceRoleKey);

export function getSupabaseAdmin() {
  if (!isSupabaseAdminConfigured) return null;
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default getSupabaseAdmin;
