'use client';

// ============================================================
// PPC ATTRIBUTION + EVENT TRACKING
// ------------------------------------------------------------
// Everything here is consent-aware (see lib/consent.js):
//  - A persistent visitor id, and our own event log in Supabase,
//    only exist once the visitor grants ANALYTICS consent.
//  - gclid/UTM attribution is only PERSISTED to localStorage once
//    the visitor grants ADVERTISING consent - but is still captured
//    in memory for the current page view either way, so a visitor
//    who clicks an ad and submits the form in the same visit still
//    gets correctly attributed even before they've made a choice.
//  - Submitting the lead form itself never depends on any of this -
//    see components/LeadForm.js and app/api/leads/route.js.
// ============================================================

import { hasConsent } from './consent';

const ATTRIBUTION_KEY = 'es_attribution_v1';
const SESSION_KEY = 'es_session_v1';
const VISITOR_ID_KEY = 'es_visitor_id_v1';

function lsGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}
function lsSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    // ignore - storage blocked
  }
}
function ssGet(key) {
  try {
    return window.sessionStorage.getItem(key);
  } catch (e) {
    return null;
  }
}
function ssSet(key, value) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch (e) {
    // ignore - storage blocked
  }
}

// A stable id for this browser, generated once persisted. Only
// created once the visitor has granted analytics consent - this is
// what ties together a visitor's events, their PPC attribution, and
// any lead they eventually submit in the `visitors` Supabase table.
// Without analytics consent, this returns null and no visitor row is
// ever created for this browser.
export function getOrCreateVisitorId() {
  if (typeof window === 'undefined') return null;
  if (!hasConsent('analytics')) return null;
  try {
    let id = window.localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `v_${Date.now()}_${Math.random().toString(16).slice(2)}`;
      window.localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch (e) {
    return null;
  }
}

const TRACKED_PARAMS = [
  'gclid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
];

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

// In-memory-only fallback used for the current page view while the
// visitor hasn't (yet, or ever) allowed storage. Nothing here touches
// the device; it exists only so the SAME page view's form submission
// can still carry its source, and is lost on navigation/reload.
let memAttribution = null;
let memSession = null;

// Captures gclid/utm params from the current URL. Call this once, as
// early as possible, on every page load (done in components/TrackingInit.js).
export function captureAttribution() {
  if (typeof window === 'undefined') return;

  const canStoreAds = hasConsent('advertising');
  const canStoreSession = hasConsent('analytics');

  const params = new URLSearchParams(window.location.search);
  const captured = {};
  TRACKED_PARAMS.forEach((key) => {
    const value = params.get(key);
    if (value) captured[key] = value;
  });

  const now = new Date().toISOString();
  const currentPath = window.location.pathname;

  // FIRST TOUCH - the very first campaign/keyword that brought this
  // visitor to the site. Written once, never overwritten, so you can
  // always answer "which ad actually generated this lead?". Only
  // persisted to the device with advertising consent.
  let attribution = (canStoreAds && safeParse(lsGet(ATTRIBUTION_KEY))) || memAttribution;
  if (!attribution) {
    attribution = {
      firstTouch: { ...captured, landingPage: currentPath, timestamp: now },
      lastTouch: { ...captured, landingPage: currentPath, timestamp: now },
    };
  } else if (Object.keys(captured).length > 0) {
    // LAST TOUCH - updated whenever a NEW set of campaign params
    // shows up (e.g. the visitor clicked a second, different ad).
    attribution.lastTouch = { ...captured, landingPage: currentPath, timestamp: now };
  }
  memAttribution = attribution;
  if (canStoreAds) lsSet(ATTRIBUTION_KEY, JSON.stringify(attribution));

  // SESSION - first page visited this browser session, used for
  // "first page visited" reporting. Only persisted with analytics
  // consent; otherwise held in memory for this page view only.
  let session = (canStoreSession && safeParse(ssGet(SESSION_KEY))) || memSession;
  if (!session) {
    session = {
      firstPageThisSession: currentPath,
      sessionStarted: now,
      pagesViewed: [currentPath],
    };
  } else if (session.pagesViewed[session.pagesViewed.length - 1] !== currentPath) {
    session.pagesViewed.push(currentPath);
  }
  memSession = session;
  if (canStoreSession) ssSet(SESSION_KEY, JSON.stringify(session));

  return attribution;
}

// Returns everything currently known about this visitor's
// attribution + session, in a shape ready to attach to a lead form
// submission or an event.
export function getAttribution() {
  if (typeof window === 'undefined') return null;
  const attribution =
    (hasConsent('advertising') && safeParse(lsGet(ATTRIBUTION_KEY))) || memAttribution;
  const session = (hasConsent('analytics') && safeParse(ssGet(SESSION_KEY))) || memSession;
  return {
    ...attribution,
    session,
    visitorId: getOrCreateVisitorId(),
    conversionPage: typeof window !== 'undefined' ? window.location.pathname : null,
  };
}

// Fires a tracked conversion/engagement event: logs to the console +
// pushes to window.dataLayer, fires the Google Ads conversion on a
// genuine (non-test) completed lead, and - only once analytics
// consent has produced a visitor id - POSTs to /api/events so it
// lands in Supabase's `visitors` + `visitor_events` tables. The POST
// is fire-and-forget; nothing on the page ever breaks because of it.
export function sendEvent(eventName, data = {}) {
  if (typeof window === 'undefined') return;

  const attribution = getAttribution();
  const payload = {
    event: eventName,
    ...data,
    attribution,
    timestamp: new Date().toISOString(),
  };

  // eslint-disable-next-line no-console
  console.log('[tracking]', eventName, payload);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  // Fire the Google Ads conversion the moment a REAL (non-test) lead
  // form is completed, so Ads measures genuine leads, not QA runs.
  // Consent Mode v2 (see lib/consent.js / TrackingInit) is what
  // restricts what Google actually does with this ping if the
  // visitor has not granted advertising consent - we don't need to
  // suppress the call itself for that; we only suppress it for a
  // confirmed test submission.
  if (eventName === EVENTS.FORM_COMPLETED && !data.isTest && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: 'AW-18547421856/IpmfCMTUwbAdEKDljIxF',
    });
  }

  // Our own event log needs the (consent-gated) visitor id; without
  // analytics consent there is none, so nothing is sent to the server.
  if (!attribution || !attribution.visitorId) return;

  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventName, data, attribution }),
    keepalive: true,
  }).catch(() => {
    // Silently ignore - never let tracking break the visitor's experience.
  });
}

// Convenience list of the standard event names used across the site,
// so every component fires the exact same string.
export const EVENTS = {
  LANDING_PAGE_VIEWED: 'landing_page_viewed',
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
  CTA_CLICKED: 'cta_clicked',
  FORM_STARTED: 'form_started',
  FORM_STEP_COMPLETED: 'form_step_completed',
  FORM_ABANDONED: 'form_abandoned',
  FORM_COMPLETED: 'form_completed',
  PHONE_CLICKED: 'phone_clicked',
  CALLBACK_REQUESTED: 'callback_requested',
  CHAT_OPENED: 'chat_opened',
  CONSENT_UPDATED: 'consent_updated',
};
