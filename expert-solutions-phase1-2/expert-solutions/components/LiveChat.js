'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// ============================================================
// LIVE CHAT (Tawk.to) + KEYWORD-AWARE GREETING
// ------------------------------------------------------------
// Mounted once in app/layout.js so it covers www., quote. and
// renewals. (all served by this app). It is deliberately
// self-contained: it does not import or change the lead form,
// tracking, consent or lead API code, and it never touches
// /admin.
//
// What it does:
//  1. Loads the Tawk.to widget as soon as the page mounts, so the
//     team sees the visitor arrive in Tawk.to straight away.
//  2. Shows our own small greeting card immediately. The wording
//     follows the Google Ads keyword when the URL carries one
//     (utm_term, from the Final URL suffix utm_term={keyword}),
//     otherwise it follows the page. The raw keyword is NEVER
//     echoed back to the visitor - it is only matched against
//     fixed topics - so a crafted link cannot inject text.
//  3. Passes the keyword/page/campaign to Tawk.to as visitor
//     attributes so the team can see what the visitor searched.
//
// Kill switch: set NEXT_PUBLIC_LIVECHAT_DISABLED=true in Vercel
// and redeploy to remove the chat everywhere without code changes.
// ============================================================

const TAWK_PROPERTY_ID = '6af6ea000846d83c436bbe3d';
const TAWK_WIDGET_ID = '1k7a84522';

const DISABLED = process.env.NEXT_PUBLIC_LIVECHAT_DISABLED === 'true';

function normalise(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\+/g, ' ')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Picks one of a fixed set of greetings. Order matters: the most
// specific topics are checked first.
function pickGreeting(keyword, path) {
  const k = normalise(keyword);
  const p = normalise(path);
  const has = (re) => re.test(k);

  if (has(/tenan|moving|move|new premises|new business|new office|new shop|taken over|took over|takeover|relocat/) || /tenancy|new premises|relocation|new business|new branch/.test(p)) {
    return 'Hi! Just moved into new premises? Tap to chat with Stuart’s team — we’ll pull up the right business energy options for you.';
  }
  if (has(/renew|contract end|end of contract|out of contract|switch|compar/) || p.includes('renewal') || p.includes('comparison')) {
    return 'Hi! Looking to renew or compare your business energy contract? Tap to chat with Stuart’s team — we’ll pull up the latest details for you.';
  }
  if (has(/gas/) || p.includes('business gas')) {
    return 'Hi! Looking for business gas rates? Tap to chat with Stuart’s team — we’ll pull up the latest details for you.';
  }
  if (has(/electric/) || p.includes('electricity')) {
    return 'Hi! Looking for business electricity rates? Tap to chat with Stuart’s team — we’ll pull up the latest details for you.';
  }
  if (has(/rate|price|cost|quote|cheap|deal/)) {
    return 'Hi! Looking for better business energy rates? Tap to chat with Stuart’s team — we’ll pull up the latest details for you.';
  }
  if (has(/broker|consult|advice|supplier/) || p.includes('broker')) {
    return 'Hi! Need an independent view on business energy? Tap to chat with Stuart’s team.';
  }
  return 'Hi! Need help with business energy? Tap to chat with Stuart’s team — we’re happy to help.';
}

export default function LiveChat() {
  const pathname = usePathname();
  const [greeting, setGreeting] = useState('');
  const [open, setOpen] = useState(false);

  const skip =
    DISABLED || !pathname || pathname.startsWith('/admin');

  useEffect(() => {
    if (skip || typeof window === 'undefined') return undefined;

    // Automated/headless browsers (QA tools, scrapers) are not
    // shown the chat, so they never raise an alert for the team.
    if (navigator.webdriver === true) return undefined;

    const params = new URLSearchParams(window.location.search);
    const keyword = params.get('utm_term') || '';
    const gclid = params.get('gclid');
    const campaign = params.get('utm_campaign') || '';

    setGreeting(pickGreeting(keyword, pathname));
    setOpen(true);

    // Position the Tawk.to bubble clear of the mobile call bar.
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = window.Tawk_LoadStart || new Date();
    window.Tawk_API.customStyle = {
      visibility: {
        desktop: { position: 'br', xOffset: 20, yOffset: 20 },
        mobile: { position: 'br', xOffset: 12, yOffset: 84 },
      },
    };
    const previousOnLoad = window.Tawk_API.onLoad;
    window.Tawk_API.onLoad = function onLoad() {
      try {
        if (typeof previousOnLoad === 'function') previousOnLoad();
        window.Tawk_API.setAttributes(
          {
            keyword: keyword.slice(0, 100),
            landingPage: window.location.hostname + pathname,
            adClick: gclid ? 'yes' : 'no',
            campaign: campaign.slice(0, 100),
          },
          function noop() {}
        );
      } catch (e) {
        // never let chat attributes break the page
      }
    };

    if (!window.__esTawkLoaded) {
      window.__esTawkLoaded = true;
      try {
        const s1 = document.createElement('script');
        const s0 = document.getElementsByTagName('script')[0];
        s1.async = true;
        s1.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
      } catch (e) {
        // chat is optional - the page works without it
      }
    }
    return undefined;
  }, [skip, pathname]);

  if (skip || !open || !greeting) return null;

  function openChat() {
    try {
      if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
        window.Tawk_API.maximize();
      }
    } catch (e) {
      // ignore
    }
    setOpen(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Chat with our team"
      className="es-chat-card fixed right-3 z-[55] w-[min(320px,calc(100vw-1.5rem))] rounded-2xl border border-navy-200 bg-white p-4 shadow-2xl bottom-[156px] lg:right-5 lg:bottom-[96px]"
    >
      <button
        type="button"
        aria-label="Close chat greeting"
        onClick={() => setOpen(false)}
        className="absolute right-2 top-2 h-6 w-6 rounded-full text-navy-500 hover:bg-navy-50"
      >
        {'×'}
      </button>
      <button
        type="button"
        onClick={openChat}
        className="block w-full pr-5 text-left text-sm font-medium leading-snug text-navy-900"
      >
        {greeting}
      </button>
      <button
        type="button"
        onClick={openChat}
        className="mt-3 inline-flex rounded-lg bg-teal-500 px-3 py-2 text-sm font-bold text-navy-950 hover:bg-teal-400"
      >
        Chat now
      </button>
      <style>{`
        @keyframes es-chat-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .es-chat-card { animation: es-chat-in 0.25s ease-out; }
        @media (prefers-reduced-motion: reduce) { .es-chat-card { animation: none; } }
      `}</style>
    </div>
  );
}
