import { NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabaseAdmin';

// Receives a completed 4-field submission from
// components/DeepFakeLeadForm.js on a /campaign/[slug] landing page.
// Deliberately separate from app/api/leads/route.js (Phase 1/2 PPC
// leads) - same security pattern (server-only, service-role key,
// honeypot), different table (deepfake_leads), so the two funnels
// never mix and neither can affect the other.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ ok: false, reason: 'invalid_json' }, { status: 400 });
  }

  // Honeypot - see app/api/leads/route.js for the same pattern.
  if (body && body.website) {
    return NextResponse.json({ ok: true });
  }

  const lead = body && body.lead;
  const attribution = (body && body.attribution) || {};
  const campaign = (body && body.campaign) || {};

  if (!lead || !lead.businessName || !lead.contactName || !lead.phone || !lead.email) {
    return NextResponse.json({ ok: false, reason: 'missing_fields' }, { status: 400 });
  }
  if (!campaign.slug) {
    return NextResponse.json({ ok: false, reason: 'missing_campaign' }, { status: 400 });
  }

  if (!isSupabaseAdminConfigured) {
    return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 200 });
  }

  const supabase = getSupabaseAdmin();
  const firstTouch = attribution.firstTouch || {};
  const lastTouch = attribution.lastTouch || {};

  try {
    if (attribution.visitorId) {
      await supabase.from('visitors').upsert(
        {
          id: attribution.visitorId,
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
          pages_viewed: (attribution.session && attribution.session.pagesViewed) || [],
          last_seen_at: new Date().toISOString(),
        },
        { onConflict: 'id', ignoreDuplicates: false }
      );
    }

    const { data: insertedLead, error: leadError } = await supabase
      .from('deepfake_leads')
      .insert({
        visitor_id: attribution.visitorId || null,
        campaign_slug: campaign.slug,
        ai_video_id: campaign.aiVideoId || null,
        landing_page: attribution.conversionPage || campaign.landingPage || null,
        utm_source: lastTouch.utm_source || firstTouch.utm_source || null,
        utm_medium: lastTouch.utm_medium || firstTouch.utm_medium || null,
        utm_campaign: lastTouch.utm_campaign || firstTouch.utm_campaign || null,
        utm_content: lastTouch.utm_content || firstTouch.utm_content || null,
        gclid: lastTouch.gclid || firstTouch.gclid || null,
        business_name: lead.businessName,
        contact_name: lead.contactName,
        phone: lead.phone,
        email: lead.email,
        status: 'NEW',
      })
      .select()
      .single();

    if (leadError) throw leadError;

    return NextResponse.json({ ok: true, leadId: insertedLead.id });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/deepfake-leads] failed to write to Supabase', err);
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 });
  }
}
