'use client';

import { createClient } from '@supabase/supabase-js';

// Browser-safe Supabase client - uses the public "anon" key only.
// Used exclusively by the /admin dashboard AFTER a user has logged
// in. Row Level Security (see supabase/schema.sql) means this key
// can only ever read data once Supabase has verified a real login -
// it cannot read leads/visitors while logged out, no matter what.
//
// NEVER import this file's service-role counterpart (supabaseAdmin.js)
// into any client component - that key must only run on the server.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Falls back to a harmless placeholder URL when not yet configured,
// so the app doesn't crash before Phase 2 setup is complete - pages
// that need Supabase check `isSupabaseConfigured` first and show a
// friendly "not set up yet" message instead of calling this client.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

export default supabase;
