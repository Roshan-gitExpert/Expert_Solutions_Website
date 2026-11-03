import { NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabaseAdmin';

// Emails a quick notification to the inbox in LEAD_NOTIFY_TO whenever a
// new lead comes in, using Resend. Safe to call even if Resend isn't
// configured yet - it just skips silently so lead saving never breaks.
async function sendLeadNotificationEmail(lead, leadId) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_TO;
  if (!apiKey || !to) return;

  const from = process.env.LEAD_NOTIFY_FROM || 'Expert Solutions Leads <onboarding@resend.dev>';

  const lines = [
    `Business: ${lead.businessName}`,
    `Contact: ${lead.contactName}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    lead.postcode ? `Postcode: ${lead.postcode}` : null,
    lead.businessType ? `Business type: ${lead.businessType}` : null,
    lead.energyType ? `Energy type: ${lead.energyType}` : null,
    lead.spend ? `Approx spend: ${lead.spend}` : null,
    lead.currentSupplier ? `Current supplier: ${lead.currentSupplier}` : null,
    lead.contractEndDate ? `Contract end date: ${lead.contractEndDate}` : null,
    ].filter(Boolean);

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject: `New lead: ${lead.businessName}`,
        text: `${lines.join('\n')}\n\nLead ID: ${leadId}`,
      }),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/leads] failed to send notification email', err);
  }
}

// Receives a completed lead-form submission from components/LeadForm.js,
// upserts the visitor, creates the lead, and records its PPC
// attribution + initial "NEW" status - all server-side.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ ok: false, reason: 'invalid_json' }, { status: 400 });
  }

  // Honeypot - a hidden field real visitors never fill in. If it has
  // a value, this was almost certainly a bot; pretend success so the
  // bot doesn't learn anything, but don't write to the database.
  if (body && body.website) {
    return NextResponse.json({ ok: true });
  }

  const lead = body && body.lead;
  const attribution = (body && body.attribution) || {};

  if (!lead || !lead.businessName || !lead.contactName || !lead.phone || !lead.email) {
    return NextResponse.json({ ok: false, reason: 'missing_fields' }, { status: 400 });
  }

  if (!isSupabaseAdminConfigured) {
    return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 200 });
  }

  const supabase = getSupabaseAdmin();
  const firstTouch = attribution.firstTouch || {};
  const lastTouch = attribution.lastTouch || {};
  const session = attribution.session || {};

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
          pages_viewed: session.pagesViewed || [],
          last_seen_at: new Date().toISOString(),
        },
        { onConflict: 'id', ignoreDuplicates: false }
      );
    }

    const { data: insertedLead, error: leadError } = await supabase
      .from('leads')
      .insert({
        visitor_id: attribution.visitorId || null,
        source_type: lead.sourceType || 'form',
        landing_page_variant: lead.variant || null,
        business_name: lead.businessName,
        postcode: lead.postcode || null,
        contact_name: lead.contactName,
        phone: lead.phone,
        email: lead.email,
        business_type: lead.businessType || null,
        energy_type: lead.energyType || null,
        spend_range: lead.spend || null,
        current_supplier: lead.currentSupplier || null,
        contract_end_date: lead.contractEndDate || null,
        number_of_sites: lead.numberOfSites || null,
        annual_consumption: lead.annualConsumption || null,
        best_time_to_contact: lead.bestTimeToContact || null,
        status: 'NEW',
      })
      .select()
      .single();

    if (leadError) throw leadError;

    await supabase.from('lead_status_history').insert({
      lead_id: insertedLead.id,
      old_status: null,
      new_status: 'NEW',
      note: 'Lead created from website',
    });

    await supabase.from('campaign_attribution').insert({
      lead_id: insertedLead.id,
      visitor_id: attribution.visitorId || null,
      gclid: lastTouch.gclid || firstTouch.gclid || null,
      utm_source: lastTouch.utm_source || firstTouch.utm_source || null,
      utm_medium: lastTouch.utm_medium || firstTouch.utm_medium || null,
      utm_campaign: lastTouch.utm_campaign || firstTouch.utm_campaign || null,
      utm_term: lastTouch.utm_term || firstTouch.utm_term || null,
      utm_content: lastTouch.utm_content || firstTouch.utm_content || null,
      landing_page: lastTouch.landingPage || null,
      first_page_visited: session.firstPageThisSession || firstTouch.landingPage || null,
      conversion_page: attribution.conversionPage || null,
    });

await sendLeadNotificationEmail(lead, insertedLead.id);
    
    return NextResponse.json({ ok: true, leadId: insertedLead.id });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/leads] failed to write to Supabase', err);
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 });
  }
}
