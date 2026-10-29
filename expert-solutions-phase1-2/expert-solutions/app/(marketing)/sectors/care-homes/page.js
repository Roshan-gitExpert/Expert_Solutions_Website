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
// for exactly the "care-homes" slug - Next.js resolves a static route
// segment ahead of a dynamic one at the same level, so this page serves
// /sectors/care-homes instead of the generic template, while every other
// sector (restaurants, hotels, retail, offices, manufacturing) still goes
// through [slug]/page.js unaffected.

const CARE_HOME_FAQS = [
  {
    q: 'What determines the cheapest business gas rate for a care home?',
    a: 'Commercial gas rates move with the wholesale market and depend on your usage volume, meter type, contract length and location - there is no single fixed "cheapest" rate that applies to every care home. A whole-of-market comparison based on your actual usage is the only reliable way to see the genuinely lowest rates available to you right now.',
  },
  {
    q: 'Why are care home energy bills usually higher than other commercial buildings?',
    a: 'Generally, the requirement for continuous heating and hot water to support resident welfare - alongside on-site laundry and kitchen usage - creates a steadier, higher baseline load than many other business types. That different usage shape can open up different contract structures than a standard small-business tariff.',
  },
  {
    q: 'Can a whole-of-market review account for our laundry and kitchen usage, not just heating?',
    a: 'Yes. We look at your overall usage profile - heating, hot water, laundry and kitchen load together - rather than quoting against a single headline unit rate, so the comparison reflects how your care home actually consumes energy.',
  },
  {
    q: 'Is the energy review free, with no obligation to switch?',
    a: 'Yes. There is no cost to your care home for requesting a review, and you are under no obligation to switch or take any action afterwards - the review is designed to help you make an informed decision.',
  },
  {
    q: 'What happens if our gas contract lapses without a renewal in place?',
    a: 'Many suppliers move a business onto a deemed or out-of-contract rate once a contract lapses, which is typically more expensive than an agreed rate. It is worth reviewing your options ahead of your renewal date rather than after the contract has already rolled over.',
  },
  {
    q: 'Can you help a care group with several homes under one contract approach?',
    a: 'Yes - we work with both single-site and multi-site care operators, and can look at a full portfolio of homes under one review rather than site by site.',
  },
  {
    q: 'Are care home energy bills charged differently to a domestic property?',
    a: 'Yes. As a non-domestic (business) supply, a care home is generally charged VAT at the standard rate rather than the domestic rate, and may be liable for the Climate Change Levy, both of which sit on top of the unit rate itself. A whole-of-market review looks at these non-domestic overheads alongside the headline rate, not just the rate in isolation.',
  },
];

export const metadata = {
  title: 'Care Home Energy Bills | Cheapest Business Gas Rates for Care Homes UK',
  description:
    'Compare the cheapest business gas rates for UK care homes and get a clearer handle on care home energy bills shaped by 24/7 heating, hot water and laundry demand. Free, no-obligation review.',
  alternates: { canonical: '/sectors/care-homes' },
};

export default function CareHomesGasPage() {
  const content = SECTOR_CONTENT['care-homes'];

  return (
    <>
      <Breadcrumbs items={[{ label: 'Sectors', href: '/sectors' }]} current="Care Homes" />
      <ServiceSchema
        name="Care Home Energy Bills & Business Gas Comparison"
        description="UK business gas comparison and brokerage guidance for care homes, built around continuous heating, hot water and laundry demand."
      />

      <Hero
        eyebrow="Care Home Energy"
        title="Care Home Energy Bills: Compare the Cheapest Business Gas Rates"
        subtitle="A whole-of-market comparison built around 24/7 heating, hot water and laundry demand, and the non-domestic overhead costs that sit on top of a standard commercial contract - free review, no obligation."
        formVariant="sector-care-homes-gas"
      />

      <TrustBar />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          Why Care Home Energy Bills Run High
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
        title="How a Care Home Energy Review Works"
        steps={[
          {
            step: '1',
            title: 'Tell us about your home (or group)',
            desc: 'Complete our short online form or call us directly - covering one site or a full portfolio.',
          },
          {
            step: '2',
            title: 'We review usage, not just the unit rate',
            desc: 'A specialist looks at your heating, hot water, laundry and kitchen load alongside your current contract and renewal date.',
          },
          {
            step: '3',
            title: 'You get a plain-English comparison',
            desc: 'We talk through the options in terms a finance director can take straight to budget planning - no pressure, no obligation.',
          },
        ]}
      />

      <WhatWeNeed
        items={[
          'Your care home name(s) and postcode(s)',
          'A contact name, phone number and business email',
          'Your current gas supplier and contract end date, if known',
          'Whether you run on-site laundry and/or catering facilities',
          'An approximate idea of your current annual energy spend',
        ]}
      />

      <Benefits
        title="Built for How Care Home Finance Directors Manage Energy Spend"
        intro="Care home energy bills carry a different risk profile to a standard commercial unit - continuous heating and hot water leave little room for a contract to lapse unmanaged. Here's how a review is shaped around that."
        benefits={[
          {
            title: 'Budget certainty',
            desc: 'Clear, comparable fixed-term options so energy costs can be planned with confidence rather than reacting to renewal surprises.',
          },
          {
            title: 'Whole-of-market comparison',
            desc: 'We look across multiple UK suppliers rather than a single price list, reflecting your actual usage shape.',
          },
          {
            title: 'Renewal protection',
            desc: 'We flag your renewal window so you are not rolled onto a deemed or out-of-contract rate by default.',
          },
          {
            title: 'Usage-aware, not headline-rate-only',
            desc: 'Heating, hot water, laundry and kitchen load are factored in - not just a single advertised unit rate.',
          },
          {
            title: 'Multi-site portfolio support',
            desc: 'Single care home or a group of homes, we can review the full portfolio under one approach.',
          },
          {
            title: 'No cost to enquire',
            desc: 'A review of your options does not commit your care home to switching, and costs nothing to request.',
          },
        ]}
      />

      <Faq faqs={CARE_HOME_FAQS} title="Care Home Energy Bills - Frequently Asked Questions" />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <RelatedLinks
          title="Other Sectors We Help"
          links={SECTORS.filter((s) => s.slug !== 'care-homes').map((s) => ({
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
        title="Get a Free Gas Comparison for Your Care Home"
        subtitle="Speak to a specialist about your business gas options - takes about two minutes online."
      />
    </>
  );
}
