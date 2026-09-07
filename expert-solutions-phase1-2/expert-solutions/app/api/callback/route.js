import { NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabaseAdmin';

// Receives a "REQUEST A CALLBACK" submission from
// components/CallbackModal.js and stores it as a lead with
// source_type = 'callback', so it shows up in the admin dashboard's
// "Calls requested" count alongside full form submissions.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ ok: false, reason: 'invalid_json' }, { status: 400 });
  }

  if (body && body.website) {
    // Honeypot field - see app/api/leads/route.js for the same pattern.
    return NextResponse.json({ ok: true });
  }

  const { name, phone, bestTime, attribution } = body || {};
  if (!name || !phone) {
    return NextResponse.json({ ok: false, reason: 'missing_fields' }, { status: 400 });
  }

  if (!isSupabaseAdminConfigured) {
    return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 200 });
  }

  const supabase = getSupabaseAdmin();
  const attr = attribution || {};
  const firstTouch = attr.firstTouch || {};
  const lastTouch = attr.lastTouch || {};

  try {
    const { data: insertedLead, error: leadError } = await supabase
      .from('leads')
      .insert({
        visitor_id: attr.visitorId || null,
        source_type: 'callback',
        contact_name: name,
        phone,
        best_time_to_contact: bestTime || null,
        status: 'NEW',
      })
      .select()
      .single();

    if (leadError) throw leadError;

    await supabase.from('lead_status_history').insert({
      lead_id: insertedLead.id,
      old_status: null,
      new_status: 'NEW',
      note: 'Callback requested from website',
    });

    await supabase.from('campaign_attribution').insert({
      lead_id: insertedLead.id,
      visitor_id: attr.visitorId || null,
      gclid: lastTouch.gclid || firstTouch.gclid || null,
      utm_source: lastTouch.utm_source || firstTouch.utm_source || null,
      utm_medium: lastTouch.utm_medium || firstTouch.utm_medium || null,
      utm_campaign: lastTouch.utm_campaign || firstTouch.utm_campaign || null,
      utm_term: lastTouch.utm_term || firstTouch.utm_term || null,
      utm_content: lastTouch.utm_content || firstTouch.utm_content || null,
      landing_page: lastTouch.landingPage || null,
      conversion_page: attr.conversionPage || null,
    });

    return NextResponse.json({ ok: true, leadId: insertedLead.id });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/callback] failed to write to Supabase', err);
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 });
  }
}
