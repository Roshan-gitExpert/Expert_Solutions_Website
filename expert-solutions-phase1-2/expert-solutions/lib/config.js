// ============================================================
// CENTRAL SITE CONFIGURATION
// ------------------------------------------------------------
// Every value a sales/marketing person might need to change later
// (phone number, pricing claims, company details) lives here and
// is read from environment variables, with a safe placeholder
// fallback so the site never breaks if a variable isn't set yet.
//
// To change these on the LIVE site once deployed to Netlify:
//   Netlify dashboard > Site configuration > Environment variables
// Then trigger a redeploy (Deploys > Trigger deploy > Deploy site).
// No code changes or file edits are needed.
//
// SEO EXPERIMENT NOTE: company number, address, and phone are
// intentionally NOT given realistic-looking placeholder defaults
// (e.g. no fake "0800 123 4567"). A value that looks like a real
// UK phone number or address but isn't would be actively
// misleading to real visitors once organic traffic starts landing
// here - so every field below is either genuinely configured via
// an environment variable, or comes through as empty/bracketed and
// every component that displays it is written to handle that
// gracefully (see ClickToCall.js).
// ============================================================

function isConfigured(value) {
  return Boolean(value && value.trim());
}

const phoneDisplay = process.env.NEXT_PUBLIC_PHONE_DISPLAY || '';
const phoneTel = process.env.NEXT_PUBLIC_PHONE_TEL || '';

export const siteConfig = {
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Expert Solutions',
  companyLegalName:
    process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME || 'Expert Solutions Ltd',
  companyNumber:
    process.env.NEXT_PUBLIC_COMPANY_NUMBER ||
    '[Companies House number placeholder]',
  companyAddress:
    process.env.NEXT_PUBLIC_COMPANY_ADDRESS ||
    '[Registered business address placeholder]',
  companyEmail:
    process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'hello@expertsolutions.co.uk',

  // siteUrl resolution order:
  //  1. NEXT_PUBLIC_SITE_URL - set this once a custom domain exists.
  //  2. process.env.URL - Netlify sets this automatically at build
  //     time to the site's real *.netlify.app address, with no
  //     configuration needed. This is what makes canonicals, the
  //     sitemap, and JSON-LD correct on the current Netlify domain
  //     during the SEO experiment, before a custom domain is bought.
  //  3. A placeholder, only ever used if neither of the above exists
  //     (e.g. a local build with no env vars set at all).
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    'https://www.expertsolutions.co.uk',

  // Phone - deliberately empty (not a fake-looking number) until a
  // real one is configured. phoneConfigured lets components decide
  // whether to show a live "Call Us Now" link or a neutral fallback.
  phoneDisplay,
  phoneTel,
  phoneConfigured: isConfigured(phoneDisplay) && isConfigured(phoneTel),

  // Pricing / savings claims - intentionally blank until the client
  // supplies verified figures. Components must handle an empty
  // string gracefully rather than showing "undefined" or a made-up
  // number.
  averageSavingClaim: process.env.NEXT_PUBLIC_AVERAGE_SAVING_CLAIM || '',

  // Analytics (optional - safe to leave blank)
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '',
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || '',

  // Opening hours - placeholder, edit freely
  openingHours: 'Monday - Friday, 9:00am - 5:30pm',
};

export default siteConfig;
