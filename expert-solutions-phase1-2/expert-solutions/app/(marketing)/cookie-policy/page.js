import { headers } from 'next/headers';
import siteConfig from '@/lib/config';
import { isConsentHostName } from '@/lib/hosts';
import LegacyCookiePolicy from './LegacyCookiePolicy';
import QuoteCookiePolicy from './QuoteCookiePolicy';

export const metadata = {
  title: 'Cookie Policy',
  description: `Cookie policy for ${siteConfig.companyName}, explaining how we use cookies and similar technologies.`,
  alternates: { canonical: '/cookie-policy' },
};

// Updated wording (analytics/advertising consent) is shown on the quote
// site only; www and any other host keep the original policy unchanged.
export default function CookiePolicyPage() {
  const h = headers();
  const host = h.get('x-forwarded-host') || h.get('host') || '';
  return isConsentHostName(host) ? <QuoteCookiePolicy /> : <LegacyCookiePolicy />;
}
