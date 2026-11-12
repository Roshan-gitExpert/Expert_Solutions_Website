'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { sendEvent, getAttribution, EVENTS } from '@/lib/tracking';
import siteConfig from '@/lib/config';

// reCAPTCHA v3 - invisible, no checkbox/puzzle, no change to the form
// itself. Runs only once a real site key is configured
// (NEXT_PUBLIC_RECAPTCHA_SITE_KEY); until then this resolves to null and
// the submission proceeds exactly as it does today.
async function getRecaptchaToken() {
    if (!siteConfig.recaptchaSiteKey || typeof window === 'undefined' || !window.grecaptcha) {
          return null;
    }
    try {
          return await new Promise((resolve) => {
                  window.grecaptcha.ready(() => {
                              window.grecaptcha
                                            .execute(siteConfig.recaptchaSiteKey, { action: 'lead_submit' })
                            .then(resolve)
                            .catch(() => resolve(null));
                  });
          });
    } catch (err) {
          return null;
    }
}

const TAKEOVER_OPTIONS = [
    'Already moved in',
    'Within the next 30 days',
    'More than 30 days away',
  ];

const ENERGY_OPTIONS = [
    'Electricity',
    'Gas',
    'Both gas and electricity',
    'Not sure',
  ];

const initialData = {
    businessName: '',
    contactName: '',
    postcode: '',
    takeoverTiming: '',
    energyType: '',
    phone: '',
    email: '',
    currentSupplier: '',
    contractEndDate: '',
    spend: '',
};

const QA_TOKEN_KEY = 'es_qa_token_v1';

// `formMode` controls which fields/copy are shown:
//  - 'tenancy'    -> the "new premises / change of tenancy" form used by
//                    quote.expertbridgesolutions.co.uk and the dedicated
//                    /business-energy-new-premises and
//                    /business-energy-change-of-tenancy landing pages.
//                    Do not change this branch's copy or fields.
//  - 'comparison' (default) -> the general-audience energy comparison
//                    form used everywhere else on
//                    www.expertbridgesolutions.co.uk (homepage and the
//                    rest of the main site), matching the fields
//                    promised in components/WhatWeNeed.js.
//
// `variant` is unrelated to formMode - it's only an attribution tag
// (which landing page/page drove this submission) and is unchanged.
export default function LeadForm({ variant = 'standard', formMode = 'comparison' }) {
    const router = useRouter();
    const isTenancy = formMode === 'tenancy';
    const [data, setData] = useState(initialData);
    const [website, setWebsite] = useState(''); // honeypot - stays empty for real visitors
  const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [testModeNote, setTestModeNote] = useState(false);
    const hasStarted = useRef(false);
    const hasCompleted = useRef(false);

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
                sendEvent(EVENTS.FORM_STARTED, { variant });
        }
        setData((prev) => ({ ...prev, [field]: value }));
  }

function validate() {
      if (isTenancy) {
              if (
                        !data.businessName.trim() ||
                        !data.contactName.trim() ||
                        !data.postcode.trim() ||
                        !data.takeoverTiming ||
                        !data.energyType ||
                        !data.phone.trim()
                      ) {
                        return 'Please fill in every field so we can get your review started.';
              }
              return '';
      }

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
      const lead = { ...data, variant, sourceType: 'form' };
      let qaToken = null;
      try {
              qaToken = window.sessionStorage.getItem(QA_TOKEN_KEY);
      } catch (err) {
              // ignore storage errors
      }
      const recaptchaToken = await getRecaptchaToken();

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
                        body: JSON.stringify({ lead, attribution, website, qaToken, recaptchaToken }),
              });
              const result = await res.json().catch(() => ({}));

  if (!res.ok || result.ok === false) {
            if (result.reason === 'not_configured') {
                        // Supabase isn't set up yet - don't block the visitor,
              // still count the conversion and let them through.
              // eslint-disable-next-line no-console
              console.warn('[lead] Supabase not configured yet - lead was not stored.');
            } else if (result.reason === 'invalid_details') {
                        setSubmitting(false);
                        setError(
                                      'A couple of details don’t look quite right - please double-check your phone number and postcode and try again.'
                                    );
                        return;
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
      // The server - not this client - decided isTest, by verifying the
      // signed QA token above. Only a confirmed real (non-test)
      // completion fires the Google Ads conversion (see lib/tracking.js).
      sendEvent(EVENTS.FORM_COMPLETED, { variant, isTest });

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
      {siteConfig.recaptchaSiteKey && (
            <Script
                  src={`https://www.google.com/recaptcha/api.js?render=${siteConfig.recaptchaSiteKey}`}
                  strategy="afterInteractive"
            />
      )}
      <div className="rounded-xl2 bg-white p-6 shadow-glow-teal sm:p-8" data-clarity-mask="True">
{testModeNote && (
          <p className="mb-4 rounded-lg bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800">
            Test mode: this submission was saved and emailed as normal, but marked
            as a test lead and excluded from Google Ads conversion tracking.
  </p>
        )}
      <form onSubmit={handleSubmit}>
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

{isTenancy ? (
            <fieldset className="space-y-5">
              <legend className="mb-1 text-lg font-bold text-navy-900">
                Business Energy for Your New Premises
  </legend>
             <p className="text-sm text-navy-600">
                Recently taken over a business premises? Let&apos;s explore your energy options.
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

            <Field label="Contact person">
                                <input
                required
                type="text"
                value={data.contactName}
                onChange={(e) => update('contactName', e.target.value)}
                className="input"
                placeholder="Your full name"
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

<RadioGroup
              label="When did you take over the premises?"
              name="takeoverTiming"
              options={TAKEOVER_OPTIONS}
              value={data.takeoverTiming}
              onChange={(v) => update('takeoverTiming', v)}
            />

                            <RadioGroup
              label="Energy required"
              name="energyType"
              options={ENERGY_OPTIONS}
              value={data.energyType}
              onChange={(v) => update('energyType', v)}
            />

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
                  </fieldset>
        ) : (
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
        )}

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
