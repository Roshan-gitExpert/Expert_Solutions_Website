import { NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabaseAdmin';

// Receives every tracked visitor event (page view, scroll depth,
// time on page, CTA click, phone click, form started/abandoned,
// etc.) from lib/tracking.js and upserts the visitor + logs the
// event in Supabase. Runs entirely on the server - the service-role
// key used here never reaches the browser.
export async function POST(request) {
  if (!isSupabaseAdminConfigured) {
    // Supabase hasn't been set up yet (Phase 2 config pending) -
    // don't error, just say so. The site still works without this.
    return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 200 });
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ ok: false, reason: 'invalid_json' }, { status: 400 });
  }

  const { eventName, data, attribution } = body || {};
  if (!eventName || !attribution || !attribution.visitorId) {
    return NextResponse.json({ ok: false, reason: 'missing_fields' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const nowIso = new Date().toISOString();
  const firstTouch = attribution.firstTouch || {};
  const lastTouch = attribution.lastTouch || {};
  const session = attribution.session || {};

  try {
    // Upsert the visitor row - creates it on first event, updates
    // last-seen / last-touch attribution on every subsequent one.
    await supabase.from('visitors').upsert(
      {
        id: attribution.visitorId,
        session_id: session.sessionStarted || null,
        first_landing_page: firstTouch.landingPage || null,
        first_gclid: firstTouch.gclid || null,
        first_utm_source: firstTouch.utm_source || null,
        first_utm_medium: firstTouch.utm_medium || null,
        first_utm_campaign: firstTouch.utm_campaign || null,
        first_utm_term: firstTouch.utm_term || null,
        first_utm_content: firstTouch.utm_content || null,
        last_landing_page: lastTouch.landingPage || null,
        last_gclid: lastTouch.gclid || null,
        last_utm_source: lastTouch.utm_source || null,
        last_utm_medium: lastTouch.utm_medium || null,
        last_utm_campaign: lastTouch.utm_campaign || null,
        last_utm_term: lastTouch.utm_term || null,
        last_utm_content: lastTouch.utm_content || null,
        pages_viewed: session.pagesViewed || [],
        last_seen_at: nowIso,
      },
      { onConflict: 'id', ignoreDuplicates: false }
    );

    await supabase.from('visitor_events').insert({
      visitor_id: attribution.visitorId,
      event_name: eventName,
      event_data: data || {},
      path: attribution.conversionPage || null,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/events] failed to write to Supabase', err);
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 200 });
  }
}
