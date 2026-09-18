import Link from 'next/link';
import siteConfig from '@/lib/config';
import { TRIGGER_PAGES, SECTORS, LOCATIONS } from '@/lib/seoData';

const COLUMNS = [
  {
    heading: 'Business Energy',
    links: [
      { href: '/business-energy', label: 'Business Energy' },
      { href: '/business-electricity', label: 'Business Electricity' },
      { href: '/business-gas', label: 'Business Gas' },
      { href: '/commercial-energy', label: 'Commercial Energy' },
      { href: '/business-energy-comparison', label: 'Business Energy Comparison' },
      { href: '/business-energy-renewal', label: 'Business Energy Renewal' },
      { href: '/business-energy-broker', label: 'Business Energy Broker' },
    ],
  },
  {
    heading: 'Moving or Starting Up',
    links: TRIGGER_PAGES.map((t) => ({ href: `/${t.slug}`, label: t.shortLabel })),
  },
  {
    heading: 'By Sector',
    links: [
      { href: '/sectors', label: 'All Sectors' },
      ...SECTORS.map((s) => ({ href: `/sectors/${s.slug}`, label: s.label })),
    ],
  },
  {
    heading: 'By Location',
    links: [
      { href: '/locations', label: 'All Locations' },
      ...LOCATIONS.map((l) => ({ href: `/locations/${l.slug}`, label: `Business Energy in ${l.label}` })),
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/contact-us', label: 'Contact Us' },
      { href: '/complaints-procedure', label: 'Complaints Procedure' },
      { href: '/terms-and-conditions', label: 'Terms & Conditions' },
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/cookie-policy', label: 'Cookie Policy' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500 text-lg font-black text-navy-950">
                ES
              </span>
              <span className="text-lg font-extrabold text-white">{siteConfig.companyName}</span>
            </div>
            <p className="max-w-sm text-sm text-navy-300">
              {siteConfig.companyName} helps UK businesses compare commercial
              electricity and gas contracts and understand their options
              ahead of renewal. We work with businesses only - not
              residential or domestic customers.
            </p>
            {siteConfig.phoneConfigured ? (
              <p className="mt-4 text-sm text-navy-300">
                Call us: <a href={`tel:${siteConfig.phoneTel}`} className="font-semibold text-teal-300 hover:underline">{siteConfig.phoneDisplay}</a>
              </p>
            ) : (
              <p className="mt-4 text-sm text-navy-300">
                <a href="#lead-form" className="font-semibold text-teal-300 hover:underline">Request a free energy review</a>
              </p>
            )}
            <p className="text-sm text-navy-300">
              Email: <a href={`mailto:${siteConfig.companyEmail}`} className="font-semibold text-teal-300 hover:underline">{siteConfig.companyEmail}</a>
            </p>
            <p className="text-sm text-navy-300">{siteConfig.openingHours}</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
                {col.heading}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-navy-300 hover:text-teal-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-navy-800 pt-6 text-xs leading-relaxed text-navy-400">
          <p className="mb-2">
            {siteConfig.companyLegalName} is registered in England and Wales,
            company number {siteConfig.companyNumber}. Registered office:{' '}
            {siteConfig.companyAddress}.
          </p>
          <p className="mb-2">
            {siteConfig.companyName} is an energy broker/intermediary for UK
            business (non-domestic) energy customers only. We do not supply
            energy directly. [Regulatory / accreditation information
            placeholder - add once supplied, e.g. relevant Ofgem or trade
            body membership details.]
          </p>
          <p>&copy; {new Date().getFullYear()} {siteConfig.companyLegalName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
