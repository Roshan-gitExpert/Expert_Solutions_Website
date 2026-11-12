'use client';

import { useEffect } from 'react';
import { captureAttribution, sendEvent, EVENTS } from '@/lib/tracking';
import { ensureGtag, gtagConsentState, readConsent } from '@/lib/consent';
import siteConfig from '@/lib/config';

// Mounted once in app/(marketing)/layout.js. Handles page view (with
// attribution), scroll depth past 50%, and 30s+ time on page, and
// loads Google Ads + Microsoft Clarity under Consent Mode v2.
export default function TrackingInit() {
  useEffect(() => {
    // Automated/headless browsers (Playwright, Selenium, Puppeteer, etc.)
    // identify themselves via navigator.webdriver. We keep our own
    // visitor/lead tracking (sendEvent -> /api/events, the lead form,
    // and the leads API) fully intact for these sessions - only the
    // third-party analytics/ad scripts below (Clarity, GA, Google Ads)
    // are skipped, so automated QA/testing traffic never reaches them.
    const isAutomatedBrowser =
      typeof navigator !== 'undefined' && navigator.webdriver === true;

    // Consent Mode v2 defaults MUST be set before gtag.js (and Clarity,
    // which reads the same signals) load - "deny everything unless the
    // visitor already told us otherwise" is the whole point of Consent
    // Mode, so this runs first, synchronously, on every page.
    const gtag = ensureGtag();
    const existingConsent = readConsent();
    gtag('consent', 'default', {
      ...gtagConsentState(existingConsent),
      wait_for_update: 500,
    });

    captureAttribution();
    sendEvent(EVENTS.LANDING_PAGE_VIEWED, { path: window.location.pathname });

    // Ad-click IP/geo capture - independent of cookie consent (see
    // app/api/track-visit/route.js for why). Scoped deliberately to
    // only the two PPC destinations this was built for: the
    // quote.expertbridgesolutions.co.uk domain and /renewals. Only
    // fires when the URL actually has a gclid, i.e. a real ad click -
    // never for ordinary organic/direct visits, and never more than
    // once per page load.
    try {
      const host = window.location.hostname;
      const path = window.location.pathname;
      const isTrackedDestination = host.includes('quote.expertbridgesolutions.co.uk') || path === '/renewals';
      const gclid = new URLSearchParams(window.location.search).get('gclid');
      if (isTrackedDestination && gclid && !window.__esAdVisitLogged) {
        window.__esAdVisitLogged = true;
        const params = new URLSearchParams(window.location.search);
        fetch('/api/track-visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gclid,
            utm_source: params.get('utm_source'),
            utm_medium: params.get('utm_medium'),
            utm_campaign: params.get('utm_campaign'),
            utm_term: params.get('utm_term'),
            utm_content: params.get('utm_content'),
            landingPage: path,
          }),
          keepalive: true,
        }).catch(() => {});
      }
    } catch (e) {
      // never let this break the page
    }

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

    // Google Ads gtag.js - only if an ID has been configured. Consent
    // defaults are already set above, before this script is appended.
    if (siteConfig.googleAdsId && !window.__esGtagLoaded && !isAutomatedBrowser) {
      window.__esGtagLoaded = true;
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAdsId}`;
      script.async = true;
      document.head.appendChild(script);

      gtag('js', new Date());
      gtag('config', siteConfig.googleAdsId);
    }

    // Microsoft Clarity - official standard snippet. Loads
    // unconditionally and reads the SAME Consent Mode `analytics_storage`
    // / `ad_storage` signals automatically (Microsoft's documented
    // behaviour) - no separate clarity('consentv2', ...) call is added,
    // since that would just duplicate what the GCM auto-read already
    // does. Same project id covers all three hostnames via this one
    // shared root-of-marketing-layout insertion.
    if (siteConfig.clarityProjectId && !window.__esClarityLoaded && !isAutomatedBrowser) {
      window.__esClarityLoaded = true;
      /* eslint-disable */
      (function (c, l, a, r, i, t, y) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', siteConfig.clarityProjectId);
      /* eslint-enable */
    }

    // If the visitor already made a choice on an earlier visit,
    // re-apply it immediately (don't wait for the banner, which won't
    // even show for them).
    if (existingConsent) {
      gtag('consent', 'update', gtagConsentState(existingConsent));
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeOnPageTimer);
    };
  }, []);

  return null;
}
