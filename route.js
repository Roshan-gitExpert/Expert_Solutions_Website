import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { signTestToken, isTestTokenConfigured } from '@/lib/testToken';
import siteConfig from '@/lib/config';

// Admin-only: generates a signed, ~1-hour QA test link
// (?qa_token=...) that app/api/leads/route.js will recognise and
// mark the resulting lead is_test = true, suppressing the Google Ads
// conversion fire for it. Requires a real, currently-logged-in
// /admin session - verified here against Supabase Auth using the
// caller's own access token, NOT the service-role key, so this can
// never be used to mint tokens without first being a logged-in agent.
export async function POST(request) {
  const authHeader = request.headers.get('authorization') || '';
  const accessToken = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!accessToken) {
    return NextResponse.json({ ok: false, reason: 'not_authenticated' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  if (!supabaseUrl || !anonKey) {
    return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 200 });
  }

  const supabase = createClient(supabaseUrl, anonKey);
  const { data: userData, error: userError } = await supabase.auth.getUser(accessToken);
  if (userError || !userData || !userData.user) {
    return NextResponse.json({ ok: false, reason: 'not_authenticated' }, { status: 401 });
  }

  if (!isTestTokenConfigured) {
    return NextResponse.json({ ok: false, reason: 'test_token_not_configured' }, { status: 200 });
  }

  const signed = signTestToken({ createdBy: userData.user.id });
  const url = `${siteConfig.siteUrl}/?qa_token=${encodeURIComponent(signed.token)}`;

  return NextResponse.json({ ok: true, token: signed.token, url, expiresAt: signed.expiresAt });
}
