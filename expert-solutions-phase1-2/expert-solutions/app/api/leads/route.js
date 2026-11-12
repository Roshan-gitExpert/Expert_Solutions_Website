import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabaseAdmin';
import { verifyTestToken } from '@/lib/testToken';
import { getClientContext } from '@/lib/requestContext';

// reCAPTCHA v3 - invisible to real visitors, no checkbox/puzzle, no
// change to any form. Verifies the token the browser attached (see
// components/LeadForm.js / app/renewals/page.js). Fails OPEN (treats as
// passed) whenever RECAPTCHA_SECRET_KEY isn't configured yet, or on any
// network/parse error, so a misconfigured or not-yet-set-up key can
// never block a real submission.
async function passesRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false; // key is configured but browser sent nothing - suspicious
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = await res.json();
    if (!data.success) return false;
    // v3 returns a 0.0-1.0 score; undefined score (older key types) passes.
    return typeof data.score !== 'number' || data.score >= 0.5;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/leads] reCAPTCHA verification request failed', err);
    return true; // network hiccup - never block a real visitor over this
  }
}

// Loose, deliberately forgiving checks - just enough to catch obvious
// garbage ("tfgffg" / "HJRTGJTYGTR") without rejecting real, oddly
// formatted UK details. Never touches the form itself - only decides
// whether the server accepts the submission.
function looksLikeRealPostcode(postcode) {
  if (!postcode) return true; // optional on some variants - not this check's job
  return /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/.test(postcode.trim());
}

function looksLikeRealPhone(phone) {
  if (!phone) return true;
  return (phone.match(/\d/g) || []).length >= 7;
}

// Emails a quick notification to the inbox in LEAD_NOTIFY_TO whenever a
// new lead comes in, using Resend. Safe to call even if Resend isn't
// configured yet - it just skips silently so lead saving never breaks.
async function sendLeadNotificationEmail(lead, leadId) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_TO;
  if (!apiKey || !to) return;

  const from = process.env.LEAD_NOTIFY_FROM || 'Expert Bridge Solutions Leads <onboarding@resend.dev>';

  const lines = [
    `Business: ${lead.businessName}`,
    `Contact: ${lead.contactName}`,
    `Phone: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : null,
    lead.postcode ? `Postcode: ${lead.postcode}` : null,
    lead.takeoverTiming ? `Took over premises: ${lead.takeoverTiming}` : null,
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

  // Secure test-lead exclusion: a signed, short-lived, admin-generated
  // token (see lib/testToken.js and app/api/admin/test-link/route.js) -
  // NEVER a guessable public URL flag. Verified here, server-side,
  // with a secret the client never sees. Any missing/invalid/expired
  // token fails safe to isTest = false (a real lead).
  const { valid: isTest } = verifyTestToken(body && body.qaToken);
  const clientContext = getClientContext(request);

  if (!lead || !lead.businessName || !lead.contactName || !lead.phone) {
    return NextResponse.json({ ok: false, reason: 'missing_fields' }, { status: 400 });
  }

  // Obvious-garbage check (e.g. "tfgffg" / "HJRTGJTYGTR") - skipped for
  // verified test submissions so QA fixtures never get blocked.
  if (!isTest && (!looksLikeRealPhone(lead.phone) || !looksLikeRealPostcode(lead.postcode))) {
    return NextResponse.json({ ok: false, reason: 'invalid_details' }, { status: 400 });
  }

  // reCAPTCHA v3 - same "pretend success, don't write to the database"
  // handling as the honeypot above, so a script never learns it was
  // caught. Skipped for verified test submissions.
  if (!isTest && !(await passesRecaptcha(body && body.recaptchaToken))) {
    return NextResponse.json({ ok: true });
  }

  if (!isSupabaseAdminConfigured) {
    return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 200 });
  }

  const supabase = getSupabaseAdmin();
  const firstTouch = attribution.firstTouch || {};
  const lastTouch = attribution.lastTouch || {};
  const session = attribution.session || {};

  // Always resolve to a real visitor id, even if the browser didn't send
  // one (e.g. a submission that bypassed the page's own tracking JS
  // entirely). This guarantees the IP/geo this request actually read
  // above gets saved somewhere, instead of being silently discarded -
  // previously a submission with no client-sent visitorId stored no
  // visitor row and no IP at all, which is exactly what let one bot
  // submission through with zero trace. Uses the SAME visitors table/
  // columns as before - no schema change.
  const visitorId = attribution.visitorId || randomUUID();

  try {
    await supabase.from('visitors').upsert(
        {
          id: visitorId,
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
          ip_address: clientContext.ip,
          geo_country: clientContext.country,
          geo_region: clientContext.region,
          geo_city: clientContext.city,
          user_agent: clientContext.userAgent,
          device_type: clientContext.deviceType,
          browser: clientContext.browser,
          os: clientContext.os,
        },
        { onConflict: 'id', ignoreDuplicates: false }
      );

    const leadRow = {
      visitor_id: visitorId,
      source_type: lead.sourceType || 'form',
      landing_page_variant: lead.variant || null,
      business_name: lead.businessName,
      postcode: lead.postcode || null,
      contact_name: lead.contactName,
      phone: lead.phone,
      email: lead.email || null,
      business_type: lead.businessType || null,
      energy_type: lead.energyType || null,
      spend_range: lead.spend || null,
      current_supplier: lead.currentSupplier || null,
      contract_end_date: lead.contractEndDate || null,
      number_of_sites: lead.numberOfSites || null,
      annual_consumption: lead.annualConsumption || null,
      best_time_to_contact: lead.bestTimeToContact || null,
      status: 'NEW',
      is_test: isTest,
    };

    // takeover_timing is a newer column. Try with it first; if the
    // column has not been added to Supabase yet, retry without it so
    // the lead is never lost (the timing is still in the email).
    let { data: insertedLead, error: leadError } = await supabase
      .from('leads')
      .insert({ ...leadRow, takeover_timing: lead.takeoverTiming || null })
      .select()
      .single();

    if (leadError && /takeover_timing/i.test(leadError.message || '')) {
      ({ data: insertedLead, error: leadError } = await supabase
        .from('leads')
        .insert(leadRow)
        .select()
        .single());
    }

    // Older Supabase schemas (before this change) won't have is_test
    // yet - retry without it rather than losing the lead.
    if (leadError && /is_test/i.test(leadError.message || '')) {
      const { is_test, ...rowWithoutIsTest } = leadRow;
      ({ data: insertedLead, error: leadError } = await supabase
        .from('leads')
        .insert({ ...rowWithoutIsTest, takeover_timing: lead.takeoverTiming || null })
        .select()
        .single());
    }

    if (leadError) throw leadError;

    await supabase.from('lead_status_history').insert({
      lead_id: insertedLead.id,
      old_status: null,
      new_status: 'NEW',
      note: 'Lead created from website',
    });

    await supabase.from('campaign_attribution').insert({
      lead_id: insertedLead.id,
      visitor_id: visitorId,
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

// Test submissions still save, email and notify exactly like a real
    // lead (so QA can see the full flow) - only the Google Ads
    // conversion fire is suppressed, client-side, based on isTest below.
    await sendLeadNotificationEmail(lead, insertedLead.id);

    return NextResponse.json({ ok: true, leadId: insertedLead.id, isTest });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/leads] failed to write to Supabase', err);
    return NextResponse.json({ ok: false, reason: 'server_error' }, { status: 500 });
  }
}
