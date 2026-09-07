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
};

export const viewport = {
  themeColor: '#071b33',
};

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
    telephone: siteConfig.phoneTel,
    email: siteConfig.companyEmail,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      streetAddress: siteConfig.companyAddress,
    },
    areaServed: 'GB',
    description:
      'UK business and commercial energy comparison and brokerage service for electricity and gas.',
  };

  return (
    <html lang="en-GB">
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
