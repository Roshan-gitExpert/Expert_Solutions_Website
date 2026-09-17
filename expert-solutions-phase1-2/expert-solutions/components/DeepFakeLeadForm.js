'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendEvent, getAttribution, EVENTS } from '@/lib/tracking';

// The ENTIRE customer-facing form for every synthetic-media
// campaign: exactly 4 fields, on purpose. Everything else about the
// business is researched automatically after submission - see
// supabase/schema_deepfakes.sql for what gets filled in later.
//
// Deliberately a single step (unlike the 3-step components/LeadForm.js
// used on the PPC pages) - this journey should be completable in
// well under a minute.
const initialData = {
  businessName: '',
  contactName: '',
  phone: '',
  email: '',
};

export default function DeepFakeLeadForm({ campaignSlug, campaignName, aiVideoId }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [website, setWebsite] = useState(''); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const hasStarted = useRef(false);

  function update(field, value) {
    if (!hasStarted.current) {
      hasStarted.current = true;
      sendEvent(EVENTS.FORM_STARTED, { variant: campaignSlug });
    }
    setData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!data.businessName || !data.contactName || !data.phone || !data.email) {
      setError('Please fill in all 4 fields so we can check this for you.');
      return;
    }
    setSubmitting(true);
    setError('');

    const attribution = getAttribution();

    try {
      const res = await fetch('/api/deepfake-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead: data,
          attribution,
          website,
          campaign: {
            slug: campaignSlug,
            aiVideoId: aiVideoId || null,
            landingPage: `/campaign/${campaignSlug}`,
          },
        }),
      });
      const result = await res.json().catch(() => ({}));

      if (!res.ok || result.ok === false) {
        if (result.reason === 'not_configured') {
          // eslint-disable-next-line no-console
          console.warn('[deepfake-lead] Supabase not configured yet - lead was not stored.');
        } else {
          setSubmitting(false);
          setError('Something went wrong submitting your details. Please try again, or call us directly.');
          return;
        }
      }
    } catch (err) {
      setSubmitting(false);
      setError('Something went wrong submitting your details. Please try again, or call us directly.');
      return;
    }

    sendEvent(EVENTS.FORM_COMPLETED, { variant: campaignSlug, campaignName });
    setTimeout(() => {
      router.push('/thank-you');
    }, 250);
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
      <p className="mb-4 text-sm font-semibold text-navy-700">
        Free &amp; takes under a minute - just leave your number and we&apos;ll check it for you.
      </p>
      <form onSubmit={handleSubmit}>
        {/* Honeypot - hidden from real visitors, catches bots */}
        <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="df-website">Leave this field blank</label>
          <input
            id="df-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <Field label="Business name">
            <input
              required
              type="text"
              value={data.businessName}
              onChange={(e) => update('businessName', e.target.value)}
              className="input"
              placeholder="e.g. Acme Manufacturing Ltd"
            />
          </Field>
          <Field label="Contact name">
            <input
              required
              type="text"
              value={data.contactName}
              onChange={(e) => update('contactName', e.target.value)}
              className="input"
              placeholder="Your full name"
            />
          </Field>
          <Field label="Best contact number" prominent>
            <input
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={data.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="input text-lg font-bold"
              placeholder="07000 000000"
            />
          </Field>
          <Field label="Email address">
            <input
              required
              type="email"
              value={data.email}
              onChange={(e) => update('email', e.target.value)}
              className="input"
              placeholder="you@yourbusiness.co.uk"
            />
          </Field>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-lg bg-amber-500 px-6 py-4 text-base font-bold text-navy-950 shadow-card transition hover:bg-amber-400 disabled:opacity-60"
        >
          {submitting ? 'Submitting...' : 'See What You Could Save'}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-navy-400">
        No obligation. A UK-based energy specialist will call you to discuss your options.
      </p>
    </div>
  );
}

function Field({ label, children, prominent = false }) {
  return (
    <label className="block">
      <span
        className={`mb-1 block font-semibold text-navy-700 ${prominent ? 'text-base' : 'text-sm'}`}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
