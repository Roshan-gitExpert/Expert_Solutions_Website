import './globals.css';
import siteConfig from '@/lib/config';

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.companyName} | UK Business Energy Comparison`,
    template: `%s | ${siteConfig.companyName}`,
  },
  description:
    'Compare UK business electricity and gas costs with Expert Solutions. Free, no-obligation commercial energy review for businesses across the UK.',
  robots: { index: true, follow: true },
  openGraph: {
    siteName: siteConfig.companyName,
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.companyName} | UK Business Energy Comparison`,
    description:
      'Compare UK business electricity and gas costs. Free, no-obligation commercial energy review.',
  },
};

export const viewport = {
  themeColor: '#071b33',
};

// A value still holding a bracketed placeholder (e.g. "[Registered
// business address placeholder]") is deliberately left OUT of
// structured data entirely - emitting a fake-looking address/phone
// in JSON-LD would be worse than emitting nothing, and the site
// owner has explicitly asked not to invent this information before
// it's verified and supplied for real.
function isRealValue(value) {
  return Boolean(value) && !value.includes('[');
}

// This is the TRUE root layout - it wraps absolutely everything,
// including both the public marketing site (app/(marketing)/layout.js)
// and the internal /admin dashboard (app/admin/layout.js). It is kept
// deliberately minimal (just <html>/<body>, global styles, and
// sitewide SEO/schema metadata) so neither area inherits chrome it
// doesn't want.
export default function RootLayout({ children }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.companyLegalName,
    url: siteConfig.siteUrl,
    ...(isRealValue(siteConfig.phoneTel) ? { telephone: siteConfig.phoneTel } : {}),
    ...(isRealValue(siteConfig.companyEmail) ? { email: siteConfig.companyEmail } : {}),
    ...(isRealValue(siteConfig.companyAddress)
      ? {
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'GB',
            streetAddress: siteConfig.companyAddress,
          },
        }
      : {}),
    areaServed: 'GB',
    description:
      'UK business and commercial energy comparison and brokerage service for electricity and gas.',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.companyName,
    url: siteConfig.siteUrl,
    inLanguage: 'en-GB',
  };

  return (
    <html lang="en-GB">
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
