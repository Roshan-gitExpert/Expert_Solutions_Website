'use client';

// ============================================================
// COOKIE CONSENT (UK PECR / UK GDPR) + GOOGLE CONSENT MODE v2
// ------------------------------------------------------------
// Two optional categories, both OFF until the visitor opts in:
//   analytics   -> GA4 measurement + our own visitor id / event log
//   advertising -> Google Ads storage, ad user data, personalisation
//                  + stored campaign attribution (gclid / UTM)
// Strictly necessary storage (the consent choice itself, the
// enquiry form's "last lead" confirmation) needs no consent.
//
// Lead capture, Supabase lead records and email notifications do
// NOT depend on consent and are never gated by anything here.
// ============================================================

export const CONSENT_KEY = 'es_consent_v1';
export const CONSENT_CHANGE_EVENT = 'es-consent-change';
export const CONSENT_OPEN_EVENT = 'es-consent-open';
const CONSENT_VERSION = 1;

export function readConsent() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.v !== CONSENT_VERSION) return null;
    return { analytics: !!parsed.analytics, advertising: !!parsed.advertising };
  } catch (e) {
    return null;
  }
}

export function hasConsent(category) {
  const c = readConsent();
  return !!(c && c[category]);
}

// Maps our two categories onto the four Consent Mode v2 signals.
export function gtagConsentState(consent) {
  const analytics = consent && consent.analytics ? 'granted' : 'denied';
  const advertising = consent && consent.advertising ? 'granted' : 'denied';
  return {
    analytics_storage: analytics,
    ad_storage: advertising,
    ad_user_data: advertising,
    ad_personalization: advertising,
  };
}

// Defines window.gtag/dataLayer if not already present (the same
// helper the single Google tag loader uses - nothing is duplicated).
export function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
  return window.gtag;
}

const ANALYTICS_STORAGE_KEYS = ['es_visitor_id_v1'];
const ANALYTICS_SESSION_KEYS = ['es_session_v1'];
const ADVERTISING_STORAGE_KEYS = ['es_attribution_v1'];

function expireCookie(name) {
  const host = window.location.hostname;
  const parts = host.split('.');
  const domains = [undefined, host];
  if (parts.length > 2) domains.push(parts.slice(-3).join('.'));
  domains.push(parts.slice(-2).join('.'));
  domains.forEach((d) => {
    document.cookie =
      `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/` +
      (d ? `; domain=.${d.replace(/^\./, '')}` : '');
  });
}

// When a visitor withdraws a category, remove what that category stored.
function clearWithdrawn(consent) {
  try {
    if (!consent.analytics) {
      ANALYTICS_STORAGE_KEYS.forEach((k) => window.localStorage.removeItem(k));
      ANALYTICS_SESSION_KEYS.forEach((k) => window.sessionStorage.removeItem(k));
      document.cookie.split(';').forEach((c) => {
        const name = c.split('=')[0].trim();
        if (name === '_ga' || name.indexOf('_ga_') === 0) expireCookie(name);
      });
    }
    if (!consent.advertising) {
      ADVERTISING_STORAGE_KEYS.forEach((k) => window.localStorage.removeItem(k));
      document.cookie.split(';').forEach((c) => {
        const name = c.split('=')[0].trim();
        if (name.indexOf('_gcl_') === 0 || name.indexOf('_gac_') === 0) expireCookie(name);
      });
    }
  } catch (e) {
    // never break the page over cleanup
  }
}

export function saveConsent({ analytics, advertising }) {
  if (typeof window === 'undefined') return;
  const consent = { analytics: !!analytics, advertising: !!advertising };
  try {
    window.localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ v: CONSENT_VERSION, ...consent, ts: new Date().toISOString() })
    );
  } catch (e) {
    // storage blocked - choice applies for this page view only
  }
  clearWithdrawn(consent);
  const gtag = ensureGtag();
  gtag('consent', 'update', gtagConsentState(consent));
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: consent }));
}

export function openConsentSettings() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
