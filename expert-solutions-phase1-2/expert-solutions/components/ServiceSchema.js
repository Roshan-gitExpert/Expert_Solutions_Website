import siteConfig from '@/lib/config';

// Emits Service structured data for a genuine service page (not
// used on trigger/sector/location pages, which are informational -
// only on pages describing an actual service Expert Solutions
// performs: comparing/arranging business electricity, gas, etc.)
export default function ServiceSchema({ name, description, areaServed = 'GB' }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: siteConfig.companyLegalName,
      url: siteConfig.siteUrl,
    },
    areaServed,
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'UK businesses',
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
