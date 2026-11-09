'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { readConsent, saveConsent, CONSENT_OPEN_EVENT } from '@/lib/consent';
import { captureAttribution, sendEvent, EVENTS } from '@/lib/tracking';

// Site-wide cookie banner (all three hostnames). Accept all / Reject
// all / Customise carry equal visual weight, nothing is pre-ticked,
// and the visitor can reopen it any time from "Cookie settings" in
// the footer. Mounted once in app/(marketing)/layout.js.
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
    const consent = saveConsent({ analytics: a, advertising: b });
    // Re-run attribution capture now that storage may be allowed, so
    // anything held only in memory gets persisted immediately.
    captureAttribution();
    // Record the choice against the visitor row, but only when
    // analytics consent exists to create one - see lib/consent.js
    // and app/api/events/route.js for why a rejection never needs a
    // row of its own.
    if (consent.analytics) {
      sendEvent(EVENTS.CONSENT_UPDATED, { analytics: consent.analytics, advertising: consent.advertising });
    }
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
          We use cookies and similar storage to run this site, and - only if
          you allow it - to understand how it&apos;s used and measure our
          Google Ads advertising. Sending your enquiry always works, whatever
          you choose. See our{' '}
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
                cookie choice and your enquiry confirmation.
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
                <strong>Analytics</strong> - Microsoft Clarity and our own
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
                <strong>Advertising</strong> - Google Ads measurement, and
                storing which advert or search term brought you here.
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
              Customise
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
