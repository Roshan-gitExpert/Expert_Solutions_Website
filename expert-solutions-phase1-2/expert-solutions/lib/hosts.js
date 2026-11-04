// Plain (server-safe) host allow-list shared by client and server code.
// GA4 + the consent banner + the updated cookie/privacy wording apply
// ONLY to the quote subdomain. Everything else (www, the apex, any
// other host) keeps its previous behaviour and content.
export const GA4_HOST = 'quote.expertbridgesolutions.co.uk';

export function isGa4HostName(host) {
  return host === GA4_HOST;
}

// Quote host, localhost, and preview deployments of the QUOTE project
// only (its Vercel preview hostnames start with the project name, so
// www previews do NOT match and behave exactly like www).
export function isConsentHostName(host) {
  const h = String(host || '').split(':')[0].toLowerCase();
  return (
    h === GA4_HOST ||
    h === 'localhost' ||
    (h.endsWith('.vercel.app') && h.startsWith('business-electricity-rates'))
  );
}
