'use client';

// ============================================================
// PPC ATTRIBUTION + EVENT TRACKING (Phase 1)
// ------------------------------------------------------------
// Phase 1 stores everything in the visitor's browser (localStorage
// + sessionStorage) so nothing is lost between page views, and logs
// every tracked event to the console so you can see it working.
//
// In Phase 2, `sendEvent()` and `getAttribution()` below get wired
// up to Supabase so this same data is written against the lead
// record in the `visitors`, `visitor_events` and
// `campaign_attribution` tables. Nothing in the rest of the site
// needs to change when that happens - every page already calls
// these two functions.
// ============================================================

const ATTRIBUTION_KEY = 'es_attribution_v1';
const SESSION_KEY = 'es_session_v1';
const VISITOR_ID_KEY = 'es_visitor_id_v1';

// A stable id for this browser, generated once and reused on every
// visit. This is what ties together a visitor's events, their PPC
// attribution, and any lead they eventually submit in the `visitors`
// Supabase table.
export function getOrCreateVisitorId() {
  if (typeof window === 'undefined') return null;
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

// Captures gclid/utm params from the current URL. Call this once,
// as early as possible, on every page load (done in app/layout.js).
export function captureAttribution() {
  if (typeof window === 'undefined') return;

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
  // always answer "which ad actually generated this lead?".
  let attribution = safeParse(window.localStorage.getItem(ATTRIBUTION_KEY));
  if (!attribution) {
    attribution = {
      firstTouch: {
        ...captured,
        landingPage: currentPath,
        timestamp: now,
      },
      lastTouch: {
        ...captured,
        landingPage: currentPath,
        timestamp: now,
      },
    };
    window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } else if (Object.keys(captured).length > 0) {
    // LAST TOUCH - updated whenever a NEW set of campaign params
    // shows up (e.g. the visitor clicked a second, different ad).
    attribution.lastTouch = {
      ...captured,
      landingPage: currentPath,
      timestamp: now,
    };
    window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  }

  // SESSION - first page visited this browser session (tab open),
  // used for "first page visited" reporting separate from all-time
  // first touch.
  let session = safeParse(window.sessionStorage.getItem(SESSION_KEY));
  if (!session) {
    session = {
      firstPageThisSession: currentPath,
      sessionStarted: now,
      pagesViewed: [currentPath],
    };
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else if (session.pagesViewed[session.pagesViewed.length - 1] !== currentPath) {
    session.pagesViewed.push(currentPath);
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  return attribution;
}

// Returns everything currently known about this visitor's
// attribution + session, in a shape ready to attach to a lead form
// submission (and, from Phase 2 onwards, the `campaign_attribution`
// table).
export function getAttribution() {
  if (typeof window === 'undefined') return null;
  const attribution = safeParse(window.localStorage.getItem(ATTRIBUTION_KEY));
  const session = safeParse(window.sessionStorage.getItem(SESSION_KEY));
  return {
    ...attribution,
    session,
    visitorId: getOrCreateVisitorId(),
    conversionPage:
      typeof window !== 'undefined' ? window.location.pathname : null,
  };
}

// Fires a tracked conversion/engagement event: logs to the console +
// pushes to window.dataLayer (so it's ready for GTM/GA4 the moment a
// container is added) AND, now that Phase 2 is wired up, POSTs to
// /api/events so it lands in Supabase's `visitors` + `visitor_events`
// tables. The POST is fire-and-forget - if Supabase isn't configured
// yet, or the request fails, tracking still works locally and
// nothing on the page breaks.
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
};
