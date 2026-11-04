'use client';

import { useEffect } from 'react';
import { captureAttribution, sendEvent, EVENTS } from '@/lib/tracking';
import siteConfig from '@/lib/config';
import { ensureGtag, gtagConsentState, readConsent } from '@/lib/consent';

// Mounted once in app/layout.js. Handles the "meaningful events only"
// tracking required in Phase 4's spec, kept minimal for Phase 1:
// page view (with attribution), scroll depth past 50%, and 30s+ time
// on page. No mouse-tracking, no noisy events.
export default function TrackingInit() {
  useEffect(() => {
    captureAttribution();
    sendEvent(EVENTS.LANDING_PAGE_VIEWED, { path: window.location.pathname });

    let scrollFired = false;
    function onScroll() {
      if (scrollFired) return;
      const scrolled = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (pageHeight > 0 && scrolled / pageHeight > 0.5) {
        scrollFired = true;
        sendEvent(EVENTS.SCROLL_DEPTH, { depth: '50%+', path: window.location.pathname });
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    const timeOnPageTimer = setTimeout(() => {
      sendEvent(EVENTS.TIME_ON_PAGE, { seconds: 30, path: window.location.pathname });
    }, 30000);

    // ONE Google tag loader (gtag.js) shared by Google Ads and GA4.
    // Consent Mode v2 defaults are set BEFORE the tag loads: everything
    // denied unless the visitor already chose otherwise. GA4 only runs
    // on the real site hostname (not previews/localhost).
    const adsId = siteConfig.googleAdsId;
    const ga4Id = siteConfig.ga4Id;
    const ga4Allowed =
      Boolean(ga4Id) && /(^|\.)expertbridgesolutions\.co\.uk$/.test(window.location.hostname);
    const loaderId = adsId || (ga4Allowed ? ga4Id : '');

    if (loaderId && !window.__esGtagLoaded) {
      window.__esGtagLoaded = true;
      const gtag = ensureGtag();
      gtag('consent', 'default', {
        ...gtagConsentState(readConsent()),
        wait_for_update: 500,
      });
      gtag('set', 'url_passthrough', true);
      gtag('set', 'ads_data_redaction', true);

      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${loaderId}`;
      script.async = true;
      document.head.appendChild(script);

      gtag('js', new Date());
      if (adsId) gtag('config', adsId);
      if (ga4Allowed) {
        window.__esGa4Id = ga4Id;
        gtag('config', ga4Id);
      }
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeOnPageTimer);
    };
  }, []);

  return null;
}
