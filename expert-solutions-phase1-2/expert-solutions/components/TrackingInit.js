'use client';

import { useEffect } from 'react';
import { captureAttribution, sendEvent, EVENTS } from '@/lib/tracking';
import siteConfig from '@/lib/config';

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

    // Load Google Ads gtag.js only if an ID has been configured -
    // safe to leave blank, nothing renders/loads if empty.
    if (siteConfig.googleAdsId) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAdsId}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      }
      window.gtag = window.gtag || gtag;
      window.gtag('js', new Date());
      window.gtag('config', siteConfig.googleAdsId);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeOnPageTimer);
    };
  }, []);

  return null;
}
