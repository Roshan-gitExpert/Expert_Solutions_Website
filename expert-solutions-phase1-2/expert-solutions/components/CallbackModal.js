'use client';

import { useState } from 'react';
import { sendEvent, getAttribution, EVENTS } from '@/lib/tracking';

// "REQUEST A CALLBACK" secondary conversion path - lighter-weight
// than the full multi-step form, for visitors who want a human to
// call them rather than filling in details themselves.
export default function CallbackModal({ open, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bestTime, setBestTime] = useState('Anytime during business hours');
  const [website, setWebsite] = useState(''); // honeypot
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const attribution = getAttribution();

    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, bestTime, attribution, website }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok && result.reason !== 'not_configured') {
        setSubmitting(false);
        setError('Something went wrong - please call us directly instead.');
        return;
      }
    } catch (err) {
      setSubmitting(false);
      setError('Something went wrong - please call us directly instead.');
      return;
    }

    sendEvent(EVENTS.CALLBACK_REQUESTED, { name, phone, bestTime });
    setSubmitting(false);
    setDone(true);
  }

  function handleClose() {
    setDone(false);
    setError('');
    setName('');
    setPhone('');
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        {!done ? (
          <>
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-xl font-bold text-navy-900">Request a Callback</h3>
              <button
                onClick={handleClose}
                aria-label="Close"
                className="text-2xl leading-none text-navy-400 hover:text-navy-700"
              >
                &times;
              </button>
            </div>
            <p className="mb-4 text-sm text-navy-500">
              Leave your details and a UK-based energy specialist will call you
              back - no obligation.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="cb-website">Leave this field blank</label>
                <input
                  id="cb-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <input
                required
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              />
              <input
                required
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input"
              />
              <select
                value={bestTime}
                onChange={(e) => setBestTime(e.target.value)}
                className="input"
              >
                <option>Anytime during business hours</option>
                <option>Morning (9am - 12pm)</option>
                <option>Afternoon (12pm - 3pm)</option>
                <option>Late afternoon (3pm - 5:30pm)</option>
              </select>
              {error && (
                <p className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-amber-500 px-6 py-3 text-base font-bold text-navy-950 shadow-card transition hover:bg-amber-400 disabled:opacity-60"
              >
                {submitting ? 'Submitting...' : 'REQUEST A CALLBACK'}
              </button>
            </form>
          </>
        ) : (
          <div className="py-4 text-center">
            <h3 className="mb-2 text-xl font-bold text-navy-900">Thank you!</h3>
            <p className="mb-4 text-navy-500">
              An energy specialist will contact you shortly.
            </p>
            <button
              onClick={handleClose}
              className="rounded-lg bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
