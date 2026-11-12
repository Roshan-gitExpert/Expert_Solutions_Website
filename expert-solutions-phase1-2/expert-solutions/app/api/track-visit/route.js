import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabaseAdmin';
import { getClientContext } from '@/lib/requestContext';

// Logs the IP/geo of a PPC ad click the moment it lands - BEFORE the
// visitor does (or doesn't) submit the enquiry form. Separate, by
// design, from app/api/leads/route.js and app/api/events/route.js:
// those are gated behind cookie consent (see lib/consent.js) because
// they persist marketing-analytics identifiers on the visitor's
// device. This route sets no cookie and stores nothing on the
// device - it only logs, server-side, that an ad click with a given
// gclid landed from a given IP, for fraud/invalid-click detection on
// paid spend (the same "legitimate interest" basis already used for
// always saving IP on a real lead submission). Called only when a
// gclid is present in the URL - i.e. only for actual ad clicks, never
// for ordinary organic/direct visits. Fails open/silently on any
// error so it can never break a page.
export async function POST(request) {
  if (!isSupabaseAdminConfigured) {
    return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 200 });
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ ok: false, reason: 'invalid_json' }, { status: 400 });
  }

  const gclid = body && body.gclid;
  if (!gclid) {
    // Nothing to log without a gclid - this endpoint only exists for
    // ad clicks, never general traffic.
    return NextResponse.json({ ok: false, reason: 'no_gclid' }, { status: 200 });
  }

  const supabase = getSupabaseAdmin();
  const clientContext = getClientContext(request);
  const nowIso = new Date().toISOString();
  const landingPage = (body && body.landingPage) || null;
  const visitorId = randomUUID();

  const visitorRow = {
    id: visitorId,
    first_landing_page: landingPage,
    first_gclid: gclid,
    first_utm_source: (body && body.utm_source) || null,
    first_utm_medium: (body && body.utm_medium) || null,
    first_utm_campaign: (body && body.utm_campaign) || null,
    first_utm_term: (body && body.utm_term) || null,
    first_utm_content: (body && body.utm_content) || null,
    last_landing_page: landingPage,
    last_gclid: gclid,
    last_utm_source: (body && body.utm_source) || null,
    last_utm_medium: (body && body.utm_medium) || null,
    last_utm_campaign: (body && body.utm_campaign) || null,
    last_utm_term: (body && body.utm_term) || null,
    last_utm_content: (body && body.utm_content) || null,
    pages_viewed: landingPage ? [landingPage] : [],
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

  try {
    let { error: upsertError } = await supabase
      .from('visitors')
      .upsert(visitorRow, { onConflict: 'id', ignoreDuplicates: false });

    // Older schemas without the device/geo columns yet - retry with
    // just the original fields rather than losing the row entirely.
    if (upsertError) {
      const {
        ip_address, geo_country, geo_region, geo_city, user_agent,
        device_type, browser, os, ...legacyRow
      } = visitorRow;
      ({ error: upsertError } = await supabase
        .from('visitors')
        .upsert(legacyRow, { onConflict: 'id', ignoreDuplicates: false }));
    }
    if (upsertError) throw upsertError;

    await supabase.from('visitor_events').insert({
      visitor_id: visitorId,
      event_name: 'ad_click_landed',
      event_data: { gclid },
      path: landingPage,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/track-visit] failed to write to Supabase', err);
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 200 });
  }
}
