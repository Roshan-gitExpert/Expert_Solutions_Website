import siteConfig from '@/lib/config';

const routes = [
  '',
  '/business-energy',
  '/business-electricity',
  '/business-gas',
  '/commercial-energy',
  '/business-energy-comparison',
  '/business-energy-renewal',
  '/business-energy-broker',
  '/contact-us',
  '/privacy-policy',
  '/cookie-policy',
  '/terms-and-conditions',
  '/complaints-procedure',
];

export default function sitemap() {
  const now = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
