'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { readConsent, saveConsent, CONSENT_OPEN_EVENT } from '@/lib/consent';
import { captureAttribution } from '@/lib/tracking';

// Cookie banner. Accept all / Reject all / Manage preferences carry
// equal prominence, nothing is pre-ticked, and the visitor can reopen
// it any time from "Cookie settings" in the footer.
export default function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) setOpen(true);

    function reopen() {
      const c = readConsent();
      setAnalytics(!!(c && c.analytics));
      setAdvertising(!!(c && c.advertising));
      setShowPrefs(true);
      setOpen(true);
    }
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  function choose(a, b) {
    saveConsent({ analytics: a, advertising: b });
    // Persist anything held in memory now that storage may be allowed.
    captureAttribution();
    setOpen(false);
    setShowPrefs(false);
  }

  if (!open) return null;

  const btn =
    'rounded-md border border-navy-300 bg-white px-4 py-2 text-sm font-semibold text-navy-900 hover:bg-navy-50';

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-navy-200 bg-white p-4 shadow-2xl"
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-sm text-navy-700">
          We use cookies to understand how visitors use this site and to measure
          our advertising. Essential functions (such as sending your enquiry)
          always work. Analytics and advertising cookies are only used if you
          allow them. See our{' '}
          <Link href="/cookie-policy" className="text-teal-700 underline">
            Cookie Policy
          </Link>
          .
        </p>

        {showPrefs && (
          <div className="mt-3 space-y-3 text-sm text-navy-700">
            <label className="flex items-start gap-3">
              <input type="checkbox" checked disabled className="mt-1" />
              <span>
                <strong>Strictly necessary</strong> - always on. Remembers your
                cookie choice and enquiry form confirmation.
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1"
              />
              <span>
                <strong>Analytics</strong> - Google Analytics and our own
                visitor measurement, to see which pages are useful.
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={advertising}
                onChange={(e) => setAdvertising(e.target.checked)}
                className="mt-1"
              />
              <span>
                <strong>Advertising</strong> - Google Ads measurement and
                storing which advert brought you here.
              </span>
            </label>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className={btn} onClick={() => choose(true, true)}>
            Accept all
          </button>
          <button type="button" className={btn} onClick={() => choose(false, false)}>
            Reject all
          </button>
          {showPrefs ? (
            <button type="button" className={btn} onClick={() => choose(analytics, advertising)}>
              Save choices
            </button>
          ) : (
            <button type="button" className={btn} onClick={() => setShowPrefs(true)}>
              Manage preferences
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
