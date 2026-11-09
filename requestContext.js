import { parseUserAgent } from './deviceInfo';

// Reads visitor IP + approximate location from Vercel's own,
// zero-cost geolocation request headers (trusted / anti-spoofed by
// Vercel itself - never a third-party geo-IP service) plus a basic
// device/browser/OS breakdown from the User-Agent header.
//
// IMPORTANT: this is country/region/city-level ONLY. It is never
// treated as, or presented as, a precise physical address - see the
// cookie/privacy policy wording. None of this is ever returned by a
// public API response; it is written server-side straight into the
// `visitors` table, which only an authenticated admin can read.
export function getClientContext(request) {
  const h = request.headers;
  const forwardedFor = h.get('x-forwarded-for') || '';
  const ip = forwardedFor.split(',')[0].trim() || null;
  const ua = h.get('user-agent') || '';
  const { deviceType, browser, os } = parseUserAgent(ua);

  return {
    ip,
    country: h.get('x-vercel-ip-country') || null,
    region: h.get('x-vercel-ip-country-region') || null,
    city: h.get('x-vercel-ip-city') || null,
    userAgent: ua || null,
    deviceType,
    browser,
    os,
  };
}

export default getClientContext;
