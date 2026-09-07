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
// ============================================================

export const siteConfig = {
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Expert Solutions',
  companyLegalName:
    process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME || 'Expert Solutions Ltd',
  companyNumber:
    process.env.NEXT_PUBLIC_COMPANY_NUMBER ||
    '[Companies House number placeholder]',
  companyAddress:
    process.env.NEXT_PUBLIC_COMPANY_ADDRESS ||
    '[Registered business address placeholder], United Kingdom',
  companyEmail:
    process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'hello@expertsolutions.co.uk',
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.expertsolutions.co.uk',

  // Phone
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || '0800 123 4567',
  phoneTel: process.env.NEXT_PUBLIC_PHONE_TEL || '+448001234567',

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
