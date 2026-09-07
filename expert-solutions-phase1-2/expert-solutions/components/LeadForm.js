'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendEvent, getAttribution, EVENTS } from '@/lib/tracking';

const BUSINESS_TYPES = [
  'Hotel',
  'Restaurant / Hospitality',
  'Retail',
  'Office',
  'Warehouse',
  'Manufacturing',
  'Construction',
  'Care Home',
  'School / Private Education',
  'Logistics',
  'Professional Services',
  'Other SME',
];

const SPEND_RANGES = [
  'Not sure',
  'Under £500 / month',
  '£500 - £1,000 / month',
  '£1,000 - £5,000 / month',
  '£5,000 - £20,000 / month',
  'Over £20,000 / month',
];

const CONTACT_TIMES = [
  'Anytime during business hours',
  'Morning (9am - 12pm)',
  'Afternoon (12pm - 3pm)',
  'Late afternoon (3pm - 5:30pm)',
];

const initialData = {
  businessName: '',
  postcode: '',
  contactName: '',
  phone: '',
  email: '',
  businessType: '',
  energyType: '',
  spend: '',
  currentSupplier: '',
  contractEndDate: '',
  numberOfSites: '1',
  annualConsumption: '',
  bestTimeToContact: '',
};

export default function LeadForm({ variant = 'standard' }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
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
        sendEvent(EVENTS.FORM_ABANDONED, { lastStepReached: step });
      }
    }
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [step]);

  function update(field, value) {
    if (!hasStarted.current) {
      hasStarted.current = true;
      sendEvent(EVENTS.FORM_STARTED, { variant });
    }
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function validateStep(current) {
    if (current === 1) {
      if (!data.businessName || !data.postcode || !data.contactName || !data.phone || !data.email) {
        return 'Please fill in every field so we can get your review started.';
      }
    }
    if (current === 2) {
      if (!data.businessType || !data.energyType) {
        return 'Please tell us your business type and energy type.';
      }
    }
    return '';
  }

  function nextStep() {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    sendEvent(EVENTS.FORM_STEP_COMPLETED, { step, variant });
    setStep((s) => s + 1);
  }

  function prevStep() {
    setError('');
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationError = validateStep(1) || validateStep(2);
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

  const progressPercent = (step / 3) * 100;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm font-semibold text-navy-700">
          <span>Step {step} of 3</span>
          <span>{step === 3 ? 'Almost done!' : 'Free & takes under 2 minutes'}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-navy-100">
          <div
            className="h-full rounded-full bg-teal-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

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
        {step === 1 && (
          <fieldset className="space-y-4">
            <legend className="mb-1 text-lg font-bold text-navy-900">
              Tell us about your business
            </legend>
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
            <Field label="Phone number">
              <input
                required
                type="tel"
                value={data.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="input"
                placeholder="07000 000000"
              />
            </Field>
            <Field label="Business email">
              <input
                required
                type="email"
                value={data.email}
                onChange={(e) => update('email', e.target.value)}
                className="input"
                placeholder="you@yourbusiness.co.uk"
              />
            </Field>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="space-y-4">
            <legend className="mb-1 text-lg font-bold text-navy-900">
              About your energy needs
            </legend>
            <Field label="Business type">
              <select
                required
                value={data.businessType}
                onChange={(e) => update('businessType', e.target.value)}
                className="input"
              >
                <option value="">Select business type</option>
                {BUSINESS_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Electricity, gas, or both?">
              <div className="grid grid-cols-3 gap-2">
                {['Electricity', 'Gas', 'Both'].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => update('energyType', opt)}
                    className={`rounded-lg border-2 px-3 py-2 text-sm font-semibold transition ${
                      data.energyType === opt
                        ? 'border-teal-500 bg-teal-50 text-navy-900'
                        : 'border-navy-100 text-navy-600 hover:border-navy-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Approximate energy spend">
              <select
                value={data.spend}
                onChange={(e) => update('spend', e.target.value)}
                className="input"
              >
                <option value="">Select a range (optional)</option>
                {SPEND_RANGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Current supplier (if known)">
              <input
                type="text"
                value={data.currentSupplier}
                onChange={(e) => update('currentSupplier', e.target.value)}
                className="input"
                placeholder="e.g. British Gas, EDF, Octopus..."
              />
            </Field>
            <Field label="Contract renewal / end date (if known)">
              <input
                type="date"
                value={data.contractEndDate}
                onChange={(e) => update('contractEndDate', e.target.value)}
                className="input"
              />
            </Field>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="space-y-4">
            <legend className="mb-1 text-lg font-bold text-navy-900">
              Just a few final details
            </legend>
            <Field label="Number of business sites">
              <select
                value={data.numberOfSites}
                onChange={(e) => update('numberOfSites', e.target.value)}
                className="input"
              >
                {['1', '2', '3', '4', '5', '6-10', '10+'].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Approximate annual consumption (kWh), if known">
              <input
                type="text"
                value={data.annualConsumption}
                onChange={(e) => update('annualConsumption', e.target.value)}
                className="input"
                placeholder="Optional - leave blank if unsure"
              />
            </Field>
            <Field label="Best time to contact you">
              <select
                value={data.bestTimeToContact}
                onChange={(e) => update('bestTimeToContact', e.target.value)}
                className="input"
              >
                <option value="">Select a preference (optional)</option>
                {CONTACT_TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
          </fieldset>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-navy-600 hover:text-navy-900"
            >
              Back
            </button>
          ) : (
            <span />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 rounded-lg bg-navy-800 px-6 py-3 text-base font-bold text-white shadow-card transition hover:bg-navy-700 sm:flex-none"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-lg bg-amber-500 px-6 py-3 text-base font-bold text-navy-950 shadow-card transition hover:bg-amber-400 disabled:opacity-60 sm:flex-none"
            >
              {submitting ? 'Submitting...' : 'GET MY FREE ENERGY REVIEW'}
            </button>
          )}
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
