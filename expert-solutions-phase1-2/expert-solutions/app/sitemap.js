import siteConfig from '@/lib/config';
import {
    TRIGGER_PAGES,
    SECTORS,
    LOCATIONS,
    COMPLIANCE_PAGES,
    METERING_PAGES,
    EXTRA_SECTOR_PAGES,
} from '@/lib/seoData';

const CORE_ROUTES = [
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

const HUB_ROUTES = ['/sectors', '/locations'];

const TRIGGER_ROUTES = TRIGGER_PAGES.map((t) => `/${t.slug}`);
const SECTOR_ROUTES = SECTORS.map((s) => `/sectors/${s.slug}`);
const LOCATION_ROUTES = LOCATIONS.map((l) => `/locations/${l.slug}`);
const EXTRA_SECTOR_ROUTES = EXTRA_SECTOR_PAGES.map((s) => `/sectors/${s.slug}`);
const COMPLIANCE_ROUTES = COMPLIANCE_PAGES.map((c) => `/compliance/${c.slug}`);
const METERING_ROUTES = METERING_PAGES.map((m) => `/metering/${m.slug}`);

// Priority/change-frequency reflect genuine importance in the site
// structure (homepage highest, trigger/sector/location pages next,
// legal/trust pages lowest) - not an attempt to game crawl budget.
function priorityFor(route) {
    if (route === '') return 1;
    if (HUB_ROUTES.includes(route)) return 0.8;
    if (
          TRIGGER_ROUTES.includes(route) ||
          SECTOR_ROUTES.includes(route) ||
          LOCATION_ROUTES.includes(route) ||
          EXTRA_SECTOR_ROUTES.includes(route) ||
          COMPLIANCE_ROUTES.includes(route) ||
          METERING_ROUTES.includes(route)
        ) {
          return 0.7;
    }
    if (['/privacy-policy', '/cookie-policy', '/terms-and-conditions', '/complaints-procedure'].includes(route)) {
          return 0.3;
    }
    return 0.6;
}

export default function sitemap() {
    const now = new Date();
    const routes = [
          ...CORE_ROUTES,
          ...HUB_ROUTES,
          ...TRIGGER_ROUTES,
          ...SECTOR_ROUTES,
          ...LOCATION_ROUTES,
          ...EXTRA_SECTOR_ROUTES,
          ...COMPLIANCE_ROUTES,
          ...METERING_ROUTES,
        ];

  return routes.map((route) => ({
        url: `${siteConfig.siteUrl}${route}`,
        lastModified: now,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: priorityFor(route),
  }));
}
