import { NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabaseAdmin';
import { getClientContext } from '@/lib/requestContext';

// Receives every tracked visitor event (page view, scroll depth,
// time on page, CTA click, phone click, form started/abandoned,
// consent choice, etc.) from lib/tracking.js and upserts the visitor
// + logs the event in Supabase. Runs entirely on the server - the
// service-role key used here never reaches the browser. The client
// only ever calls this once analytics consent has produced a visitor
// id (see lib/tracking.js) - a visitor who has not consented never
// reaches this route at all.
export async function POST(request) {
  if (!isSupabaseAdminConfigured) {
    // Supabase hasn't been set up yet - don't error, just say so.
    // The site still works without this.
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
  const clientContext = getClientContext(request);

  const visitorRow = {
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
    ip_address: clientContext.ip,
    geo_country: clientContext.country,
    geo_region: clientContext.region,
    geo_city: clientContext.city,
    user_agent: clientContext.userAgent,
    device_type: clientContext.deviceType,
    browser: clientContext.browser,
    os: clientContext.os,
  };

  // The visitor's consent choice itself - only ever written here,
  // when the event being logged IS that choice, from
  // components/ConsentBanner.js.
  if (eventName === 'consent_updated' && data) {
    visitorRow.analytics_consent = Boolean(data.analytics);
    visitorRow.ads_consent = Boolean(data.advertising);
    visitorRow.consent_updated_at = nowIso;
  }

  try {
    // Upsert the visitor row - creates it on first event, updates
    // last-seen / last-touch attribution on every subsequent one.
    let { error: upsertError } = await supabase
      .from('visitors')
      .upsert(visitorRow, { onConflict: 'id', ignoreDuplicates: false });

    // Older schemas (before this change) won't have the new geo/device/
    // consent columns yet - retry with just the original fields rather
    // than losing the event entirely.
    if (upsertError) {
      const {
        ip_address, geo_country, geo_region, geo_city, user_agent,
        device_type, browser, os, analytics_consent, ads_consent,
        consent_updated_at, ...legacyRow
      } = visitorRow;
      ({ error: upsertError } = await supabase
        .from('visitors')
        .upsert(legacyRow, { onConflict: 'id', ignoreDuplicates: false }));
    }
    if (upsertError) throw upsertError;

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
