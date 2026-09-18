import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import HowItWorks from '@/components/HowItWorks';
import WhatWeNeed from '@/components/WhatWeNeed';
import Benefits from '@/components/Benefits';
import Faq from '@/components/Faq';
import CtaBanner from '@/components/CtaBanner';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedLinks from '@/components/RelatedLinks';
import { CORE_PAGES, SECTORS, TRIGGER_PAGES } from '@/lib/seoData';

export const metadata = {
  title: 'Commercial Energy Solutions | UK Business Electricity & Gas',
  description:
    'Commercial energy support for UK businesses of every size - from single-site offices to multi-site retail, hospitality and industrial operations.',
  alternates: { canonical: '/commercial-energy' },
};

const benefits = [
  { title: 'Built for commercial operations', desc: 'Suited to retail chains, hospitality groups, manufacturers, logistics and other commercial operators.' },
  { title: 'Portfolio-level view', desc: 'See your energy position across multiple commercial sites, not just one meter at a time.' },
  { title: 'Procurement-friendly process', desc: 'Clear information to support finance directors and procurement managers in reviewing energy spend.' },
  { title: 'Flexible contact options', desc: 'Speak by phone, request a callback, or use live chat during business hours.' },
  { title: 'Works alongside your finance team', desc: 'We can provide the detail needed for internal budget and procurement discussions.' },
  { title: 'No obligation', desc: 'A commercial energy review does not commit your organisation to any action.' },
];

const faqs = [
  { q: 'What counts as commercial energy?', a: 'Commercial energy covers electricity and gas supplied to non-domestic premises used for business purposes - offices, retail units, warehouses, factories and similar commercial buildings.' },
  { q: 'Can you support multi-site commercial operators?', a: 'Yes. We can review energy across multiple commercial sites for retail groups, hospitality operators, logistics companies and similar organisations.' },
  { q: 'Who normally handles this within a business?', a: 'Typically an owner, director, finance director, operations manager, facilities manager or procurement manager - anyone responsible for reviewing overhead costs.' },
  { q: 'Do you provide information suitable for internal sign-off?', a: 'Our specialists can provide the contract detail needed to support an internal review or approval process.' },
  { q: 'Is there a minimum business size?', a: 'No - we work with small and medium-sized businesses as well as larger multi-site commercial operators.' },
];

export default function CommercialEnergyPage() {
  return (
    <>
      <Breadcrumbs items={[]} current="Commercial Energy" />
      <Hero
        title="Commercial Energy Solutions for UK Businesses"
        subtitle="From single offices to multi-site retail, hospitality and industrial operations - get a free commercial energy review tailored to your business."
        formVariant="commercial-energy"
      />
      <TrustBar />
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          Commercial Energy, Reviewed Properly
        </h2>
        <p className="mt-4 text-navy-500">
          Commercial energy costs are rarely a single line item - larger
          operators often manage electricity and gas across several sites,
          each with different contract dates, meter types and suppliers.
          Keeping track of renewal dates across a portfolio of sites can be
          difficult without a dedicated review.
        </p>
        <p className="mt-4 text-navy-500">
          Our specialists work with business owners, directors, finance
          directors, operations managers, facilities managers and
          procurement managers to provide a clear picture of where things
          stand and what the options are.
        </p>
      </section>
      <HowItWorks />
      <WhatWeNeed />
      <Benefits title="Built for Commercial Operators" benefits={benefits} />
      <Faq faqs={faqs} title="Commercial Energy - Frequently Asked Questions" />
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <RelatedLinks
          title="Business Energy by Sector"
          links={SECTORS.map((s) => ({ href: `/sectors/${s.slug}`, label: s.label }))}
        />
        <RelatedLinks
          title="Moving or Starting Up?"
          links={TRIGGER_PAGES.map((t) => ({ href: `/${t.slug}`, label: t.shortLabel }))}
        />
        <RelatedLinks
          title="Related Business Energy Pages"
          links={CORE_PAGES.filter((p) => p.slug !== 'commercial-energy').map((p) => ({ href: `/${p.slug}`, label: p.label }))}
        />
      </section>
      <CtaBanner
        title="Get a Free Commercial Energy Review"
        subtitle="Speak to a specialist about your commercial electricity and gas today."
      />
    </>
  );
}
