'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { hasConsent, CONSENT_CHANGE_EVENT } from '@/lib/consent';

// ============================================================
// LEADFEEDER (Dealfront) VISITOR TRACKER
// ------------------------------------------------------------
// Mounted once in app/layout.js so it runs on www., quote. and
// renewals. (and never on /admin). Self-contained: it does not
// touch the lead form, other trackers, consent banner or lead API.
//
// It is the standard Leadfeeder snippet (same tracker id, same
// script URL, same ldfdr queue) loaded asynchronously, with one
// addition: it only loads once the visitor has allowed ANALYTICS
// cookies in our banner - the same rule Microsoft Clarity and our
// own visitor log follow. If the visitor already allowed it on an
// earlier visit it loads straight away; if they click Accept all /
// Save choices later, it loads at that moment.
//
// Automated/headless browsers are skipped, as for the other
// third-party scripts (see components/TrackingInit.js).
// ============================================================

const LEADFEEDER_TRACKER_ID = 'ywVkO4XXWze4Z6Bj';

function loadLeadfeeder() {
  if (window.__esLeadfeederLoaded) return;
  window.__esLeadfeederLoaded = true;
  try {
    // Standard Leadfeeder queue stub, so ldfdr() calls made before the
    // script arrives are not lost.
    window.ldfdr =
      window.ldfdr ||
      function ldfdr() {
        (window.ldfdr._q = window.ldfdr._q || []).push([].slice.call(arguments));
      };
    const first = document.getElementsByTagName('script')[0];
    const tag = document.createElement('script');
    tag.src = `https://sc.lfeeder.com/lftracker_v1_${LEADFEEDER_TRACKER_ID}.js`;
    tag.async = true;
    if (first && first.parentNode) {
      first.parentNode.insertBefore(tag, first);
    } else {
      document.head.appendChild(tag);
    }
  } catch (e) {
    // tracking is optional - never let it break the page
  }
}

export default function LeadfeederTracker() {
  const pathname = usePathname();
  const skip = !pathname || pathname.startsWith('/admin');

  useEffect(() => {
    if (skip || typeof window === 'undefined') return undefined;
    if (navigator.webdriver === true) return undefined;

    function maybeLoad() {
      if (hasConsent('analytics')) loadLeadfeeder();
    }

    maybeLoad();
    window.addEventListener(CONSENT_CHANGE_EVENT, maybeLoad);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, maybeLoad);
  }, [skip]);

  return null;
}
