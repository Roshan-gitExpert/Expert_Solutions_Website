'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendEvent, getAttribution, EVENTS } from '@/lib/tracking';

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
};

export default function LeadForm({ variant = 'standard' }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [website, setWebsite] = useState(''); // honeypot - stays empty for real visitors
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const hasStarted = useRef(false);
  const hasCompleted = useRef(false);

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

    try {
      window.sessionStorage.setItem(
        'es_last_lead',
        JSON.stringify({ ...lead, attribution, submittedAt: new Date().toISOString() })
      );
    } catch (err) {
      // ignore storage errors
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead, attribution, website }),
      });
      const result = await res.json().catch(() => ({}));

      if (!res.ok || result.ok === false) {
        if (result.reason === 'not_configured') {
          // Supabase isn't set up yet - don't block the visitor,
          // still count the conversion and let them through.
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
    } catch (err) {
      setSubmitting(false);
      setError(
        'Something went wrong submitting your details. Please try again, or call us directly - see the number above.'
      );
      return;
    }

    hasCompleted.current = true;
    sendEvent(EVENTS.FORM_COMPLETED, { variant });

    setTimeout(() => {
      router.push('/thank-you');
    }, 300);
  }

  return (
    <div className="rounded-xl2 bg-white p-6 shadow-glow-teal sm:p-8">
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
