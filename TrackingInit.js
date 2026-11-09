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
    if (siteConfig.googleAdsId && !window.__esGtagLoaded) {
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
    if (siteConfig.clarityProjectId && !window.__esClarityLoaded) {
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
