'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import TrackingInit from '@/components/TrackingInit';
import ConsentBanner from '@/components/ConsentBanner';
import { sendEvent, getAttribution, EVENTS } from '@/lib/tracking';
import siteConfig from '@/lib/config';

// Standalone landing page for renewals.expertbridgesolutions.co.uk
// (served at /renewals, same deployment as www./quote.*).
//
// This page deliberately does NOT import components/Hero.js or
// components/LeadForm.js - it is its own isolated page with its own
// copy of the comparison-form fields/markup, so nothing here can ever
// affect the homepage's host-based formMode branching in
// app/(marketing)/page.js. It DOES reuse (unmodified) the shared
// tracking/consent engine - components/TrackingInit.js,
// components/ConsentBanner.js, and lib/tracking.js's
// sendEvent/getAttribution/EVENTS - and submits to the exact same
// /api/leads endpoint with the exact same payload shape as every
// other lead form on the site (see components/LeadForm.js), just
// tagged with variant: 'renewals' so admin can tell leads from this
// page apart from the rest of the site.
const ENERGY_OPTIONS = ['Electricity', 'Gas', 'Both gas and electricity', 'Not sure'];

const initialData = {
  businessName: '',
  contactName: '',
  postcode: '',
  energyType: '',
  phone: '',
  email: '',
  currentSupplier: '',
  contractEndDate: '',
  spend: '',
};

const QA_TOKEN_KEY = 'es_qa_token_v1';
const VARIANT = 'renewals';

export default function RenewalsPage() {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [website, setWebsite] = useState(''); // honeypot - stays empty for real visitors
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [testModeNote, setTestModeNote] = useState(false);
  const hasStarted = useRef(false);
  const hasCompleted = useRef(false);

  // Same qa_token capture pattern as components/LeadForm.js, so admin
  // "test lead" links work identically on this page.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const incoming = params.get('qa_token');
      if (incoming) window.sessionStorage.setItem(QA_TOKEN_KEY, incoming);
    } catch (err) {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    function handleVisibility() {
      if (
        document.visibilityState === 'hidden' &&
        hasStarted.current &&
        !hasCompleted.current
      ) {
        sendEvent(EVENTS.FORM_ABANDONED, { lastStepReached: 1 });
      }
    }
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  function update(field, value) {
    if (!hasStarted.current) {
      hasStarted.current = true;
      sendEvent(EVENTS.FORM_STARTED, { variant: VARIANT });
    }
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    if (
      !data.businessName.trim() ||
      !data.contactName.trim() ||
      !data.email.trim() ||
      !data.postcode.trim() ||
      !data.energyType ||
      !data.phone.trim()
    ) {
      return 'Please fill in every field so we can get your review started.';
    }
    return '';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSubmitting(true);
    setError('');

    const attribution = getAttribution();
    const lead = { ...data, variant: VARIANT, sourceType: 'form' };
    let qaToken = null;
    try {
      qaToken = window.sessionStorage.getItem(QA_TOKEN_KEY);
    } catch (err) {
      // ignore storage errors
    }

    try {
      window.sessionStorage.setItem(
        'es_last_lead',
        JSON.stringify({ ...lead, attribution, submittedAt: new Date().toISOString() })
      );
    } catch (err) {
      // ignore storage errors
    }

    let isTest = false;
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead, attribution, website, qaToken }),
      });
      const result = await res.json().catch(() => ({}));

      if (!res.ok || result.ok === false) {
        if (result.reason === 'not_configured') {
          // eslint-disable-next-line no-console
          console.warn('[lead] Supabase not configured yet - lead was not stored.');
        } else {
          setSubmitting(false);
          setError(
            'Something went wrong submitting your details. Please try again, or call us directly - see the number above.'
          );
          return;
        }
      }
      isTest = Boolean(result.isTest);
    } catch (err) {
      setSubmitting(false);
      setError(
        'Something went wrong submitting your details. Please try again, or call us directly - see the number above.'
      );
      return;
    }

    hasCompleted.current = true;
    sendEvent(EVENTS.FORM_COMPLETED, { variant: VARIANT, isTest });

    if (isTest) {
      setTestModeNote(true);
      setSubmitting(false);
      return;
    }

    setTimeout(() => {
      router.push('/thank-you');
    }, 300);
  }

  return (
    <>
      <TrackingInit />
      <main className="min-h-screen bg-navy-950 bg-grid-overlay px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <span className="label-eyebrow text-white/80">UK Business &amp; Commercial Energy</span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Renewing Your Business Energy Contract?
            </h1>
            <p className="mt-4 text-lg text-navy-200">
              See whether you could be paying less before your contract renews. A UK-based
              energy specialist will compare the market for you &ndash; no obligation, no pressure.
            </p>
          </div>

          <div className="mt-8 rounded-xl2 bg-white p-6 shadow-glow-teal sm:p-8" data-clarity-mask="True">
            {testModeNote && (
              <p className="mb-4 rounded-lg bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800">
                Test mode: this submission was saved and emailed as normal, but marked
                as a test lead and excluded from Google Ads conversion tracking.
              </p>
            )}
            <form onSubmit={handleSubmit} className="relative">
              {/* Honeypot field - hidden from real visitors with CSS, but a
                  bot filling in every field will fill this in too, marking
                  the submission as spam server-side. */}
              <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Leave this field blank</label>
                <input
                  id="website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <fieldset className="space-y-5">
                <legend className="mb-1 text-lg font-bold text-navy-900">
                  Get a Free Review of Your Business Energy Costs
                </legend>
                <p className="text-sm text-navy-600">
                  Tell us a little about your business and a UK-based energy specialist
                  will compare the market for you - no obligation.
                </p>

                <Field label="Business name">
                  <input
                    required
                    type="text"
                    value={data.businessName}
                    onChange={(e) => update('businessName', e.target.value)}
                    className="input"
                    placeholder="e.g. Smith's Bakery"
                  />
                </Field>

                <Field label="Business postcode">
                  <input
                    required
                    type="text"
                    value={data.postcode}
                    onChange={(e) => update('postcode', e.target.value.toUpperCase())}
                    className="input"
                    placeholder="e.g. M1 1AE"
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

                <Field label="Business email">
                  <input
                    required
                    type="email"
                    value={data.email}
                    onChange={(e) => update('email', e.target.value)}
                    className="input"
                    placeholder="e.g. you@yourbusiness.co.uk"
                  />
                </Field>

                <Field label="Contact telephone">
                  <input
                    required
                    type="tel"
                    value={data.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className="input"
                    placeholder="Your business contact number"
                  />
                </Field>

                <RadioGroup
                  label="Energy required"
                  name="energyType"
                  options={ENERGY_OPTIONS}
                  value={data.energyType}
                  onChange={(v) => update('energyType', v)}
                />

                <Field label="Current supplier (optional, if known)">
                  <input
                    type="text"
                    value={data.currentSupplier}
                    onChange={(e) => update('currentSupplier', e.target.value)}
                    className="input"
                    placeholder="e.g. British Gas, EDF, Octopus"
                  />
                </Field>

                <Field label="Contract end date (optional, if known)">
                  <input
                    type="text"
                    value={data.contractEndDate}
                    onChange={(e) => update('contractEndDate', e.target.value)}
                    className="input"
                    placeholder="e.g. March 2027"
                  />
                </Field>

                <Field label="Approximate annual energy spend (optional)">
                  <input
                    type="text"
                    value={data.spend}
                    onChange={(e) => update('spend', e.target.value)}
                    className="input"
                    placeholder="e.g. £15,000/year, or leave blank"
                  />
                </Field>
              </fieldset>

              {error && (
                <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
                  {error}
                </p>
              )}

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-navy-800 px-6 py-3 text-base font-bold text-white shadow-card transition hover:bg-navy-700 disabled:opacity-60"
                >
                  {submitting ? 'Submitting...' : 'Get my free energy review'}
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-xs text-navy-400">
              No obligation. A UK-based energy specialist will contact you to
              discuss your options.
            </p>
          </div>

          {/* Trust/legal footer - identical wording to components/Footer.js,
              which every other page on the site uses. This page intentionally
              has no header/nav (it's a standalone PPC landing page), but a
              page carrying paid ad traffic should still identify the company
              and disclose the broker relationship, same as the rest of the
              site does. Does not touch the form above in any way. */}
          <div className="mt-6 text-center text-xs leading-relaxed text-navy-400">
            <p>
              {siteConfig.companyName} is a trading name of Veer Infotech, an
              independent energy broker and intermediary for UK business
              (non-domestic) energy customers only. We are not a direct
              energy supplier.
            </p>
            <p className="mt-2">
              Trading Address: 21 Ackton Close, Stoke-on-Trent, ST3 6SB,
              England. Email:{' '}
              <a
                href={`mailto:${siteConfig.companyEmail}`}
                className="underline hover:text-teal-300"
              >
                {siteConfig.companyEmail}
              </a>
            </p>
          </div>
        </div>
      </main>
      <ConsentBanner />
    </>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-navy-700">{label}</span>
      {children}
    </label>
  );
}

function RadioGroup({ label, name, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-semibold text-navy-700">{label}</legend>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt} className="flex cursor-pointer items-center gap-3 text-sm text-navy-800">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="h-4 w-4 accent-teal-500"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
