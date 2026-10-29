import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import HowItWorks from '@/components/HowItWorks';
import WhatWeNeed from '@/components/WhatWeNeed';
import Benefits from '@/components/Benefits';
import Faq from '@/components/Faq';
import CtaBanner from '@/components/CtaBanner';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedLinks from '@/components/RelatedLinks';
import ServiceSchema from '@/components/ServiceSchema';
import { SECTORS, CORE_PAGES } from '@/lib/seoData';
import { SECTOR_CONTENT } from '@/lib/sectorContent';

// This file is a static override of app/(marketing)/sectors/[slug]/page.js
// for exactly the "hotels" slug, following the same pattern as the
// care-homes and restaurants overrides - Next.js resolves the static
// route ahead of the dynamic sibling, so this page serves /sectors/hotels
// with a long-tail-specific layout while every other sector still goes
// through [slug]/page.js unaffected.

const HOTEL_ENERGY_FAQS = [
  {
    q: 'Why are hotel energy bills higher than a similarly sized office building?',
    a: 'Mainly because of the baseline load - heating, hot water and lighting typically run around the clock across many guest rooms and communal areas, on top of variable demand from any on-site restaurant, bar, spa or conference facility. That continuous, multi-facility load is different from a standard daytime-hours office profile.',
  },
  {
    q: 'Does occupancy level change what we should be contracting for?',
    a: 'Yes. Usage estimates should reflect realistic seasonal occupancy swings - a hotel running near capacity in summer and quieter in winter has a different usage shape to one with flat year-round demand, and that shape is worth discussing when setting up or renewing a contract.',
  },
  {
    q: 'We have several meters across one hotel site - does that affect our contract?',
    a: 'It can. Larger hotels sometimes have more than one meter across a single site (for example, separate supplies for the main building, kitchens or a spa), which can affect how a contract is structured and whether consolidating meters under one agreement makes sense.',
  },
  {
    q: 'Do hotel groups need one contract per site, or one overall?',
    a: 'Both approaches exist - some multi-site hospitality businesses use a shared framework across properties, while others contract each site separately. A specialist can talk through which suits your group.',
  },
  {
    q: 'Can you help with a hotel that has just changed ownership or management?',
    a: 'Yes - this is usually treated as a change of tenancy. See our change of tenancy page for what evidence typically helps.',
  },
  {
    q: 'Is the energy review free, with no obligation to switch?',
    a: 'Yes. There is no cost to request a review, and you are under no obligation to switch or take any action afterwards - the review is designed to help you make an informed decision.',
  },
];

const HOTEL_BENEFITS = [
  {
    title: 'Built around 24/7 occupancy',
    desc: 'Comparisons reflect round-the-clock heating, hot water and lighting rather than a standard business-hours usage profile.',
  },
  {
    title: 'Seasonal occupancy accounted for',
    desc: 'Usage estimates can reflect realistic seasonal swings between peak and quiet periods, instead of a flat average that under- or over-states your real demand.',
  },
  {
    title: 'Whole-site view, not just the headline rate',
    desc: 'Restaurants, bars, spas, laundry and conference facilities on the same site are factored into the overall usage picture.',
  },
  {
    title: 'Multi-meter sites reviewed together',
    desc: 'Where a hotel has more than one meter on site, we look at whether consolidating under one contract structure makes sense.',
  },
  {
    title: 'Multi-property portfolio support',
    desc: 'Single hotel or a group of properties, we can review a shared framework or site-by-site contracts depending on what suits your business.',
  },
  {
    title: 'No cost to enquire',
    desc: 'A review of your options does not commit your business to switching, and costs nothing to request.',
  },
];

export const metadata = {
  title: 'Hotel Energy Bills | Business Electricity & Gas Rates for UK Hotels',
  description:
    'Compare business electricity and gas rates for UK hotels, built around 24/7 heating, hot water and multi-facility hospitality demand. Free, no-obligation review.',
  alternates: { canonical: '/sectors/hotels' },
};

export default function HotelsEnergyPage() {
  const content = SECTOR_CONTENT.hotels;

  return (
    <>
      <Breadcrumbs items={[{ label: 'Sectors', href: '/sectors' }]} current="Hotels & Hospitality" />
      <ServiceSchema
        name="Business Energy for Hotels & Hospitality"
        description="UK business electricity and gas comparison for hotels and hospitality venues, built around 24/7 occupancy and multi-facility demand."
      />

      <Hero
        eyebrow="Hotels & Hospitality"
        title="Hotel Energy Bills: Compare Business Electricity & Gas Rates"
        subtitle="A whole-of-market comparison built around 24/7 heating, hot water and the restaurants, bars and spas that sit on the same site - free review, no obligation."
        formVariant="sector-hotels"
      />

      <TrustBar />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          Why Hotel Energy Bills Run High
        </h2>
        <p className="mt-4 text-navy-500">{content.intro}</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {content.usagePoints.map((point) => (
            <div key={point.title} className="rounded-2xl border border-navy-100 p-6">
              <h3 className="text-base font-bold text-navy-900">{point.title}</h3>
              <p className="mt-2 text-sm text-navy-500">{point.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <HowItWorks
        title="How a Hotel Energy Review Works"
        steps={[
          {
            step: '1',
            title: 'Tell us about your property (or group)',
            desc: 'Complete our short online form or call us directly - a single hotel or a multi-property portfolio.',
          },
          {
            step: '2',
            title: 'We review occupancy and site facilities',
            desc: 'A specialist looks at seasonal occupancy, on-site facilities and meter setup alongside your current contract and renewal date.',
          },
          {
            step: '3',
            title: 'You get a plain-English comparison',
            desc: 'We talk through the options in whole-site, total-cost terms - no pressure, no obligation.',
          },
        ]}
      />

      <WhatWeNeed
        items={[
          'Your hotel name(s) and postcode(s)',
          'A contact name, phone number and business email',
          'Your current supplier(s) and contract end date, if known',
          'Which on-site facilities draw significant energy (restaurant, bar, spa, laundry, conference rooms)',
          'Whether the site has more than one meter, if known',
        ]}
      />

      <Benefits
        title="Built for How Hotels Actually Use Energy"
        intro="A hotel's usage shape - continuous occupancy, seasonal swings and several facilities under one roof - rarely fits a standard office or retail tariff. Here's how a review is shaped around that."
        benefits={HOTEL_BENEFITS}
      />

      <Faq faqs={HOTEL_ENERGY_FAQS} title="Hotel Energy Bills - Frequently Asked Questions" />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <RelatedLinks
          title="Other Sectors We Help"
          links={SECTORS.filter((s) => s.slug !== 'hotels').map((s) => ({
            href: `/sectors/${s.slug}`,
            label: s.label,
          }))}
        />
        <RelatedLinks
          title="Related Business Energy Pages"
          links={CORE_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.label }))}
        />
      </section>

      <CtaBanner
        title="Get a Free Energy Review for Your Hotel"
        subtitle="Speak to a specialist about your business electricity and gas options - takes about two minutes online."
      />
    </>
  );
}
