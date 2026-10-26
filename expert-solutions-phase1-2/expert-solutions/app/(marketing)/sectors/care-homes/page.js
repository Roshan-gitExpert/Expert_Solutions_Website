import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import FeatureGrid from '@/components/FeatureGrid';
import MarketPriceTrend from '@/components/MarketPriceTrend';
import HowItWorks from '@/components/HowItWorks';
import WhatWeNeed from '@/components/WhatWeNeed';
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
        q: 'Do care homes get different gas rates to other commercial buildings?',
        a: 'Generally yes - the requirement for continuous heating and hot water to support resident welfare typically creates a steadier, higher baseline usage pattern than many other business types, which can open up different contract structures than a standard small-business tariff.',
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
        a: 'Yes - we work with both single-site and multi-site care operators.',
  },
  ];

export const metadata = {
    title: 'Cheapest Business Gas Rates for Care Homes UK | Expert Solutions',
    description:
          'Compare whole-of-market commercial gas rates for UK care homes. Built for 24/7 heating and hot water demand. Free, no-obligation review.',
    alternates: { canonical: '/sectors/care-homes' },
};

export default function CareHomesGasPage() {
    const content = SECTOR_CONTENT['care-homes'];

  return (
        <>
          <Breadcrumbs items={[{ label: 'Sectors', href: '/sectors' }]} current="Care Homes" />
          <ServiceSchema
          name="Business Gas for Care Homes"
          description="UK business gas comparison and brokerage guidance for care homes, built around continuous heating and hot water demand."
        />

                  <Hero
          eyebrow="Care Home Energy"
          title="Cheapest Business Gas Rates for Care Homes UK"
          subtitle="Compare whole-of-market commercial gas contracts built for 24/7 heating and hot water demand - free review, no obligation."
          formVariant="sector-care-homes-gas"
        />

                  <TrustBar />
                  <FeatureGrid />

                  <section className="bg-navy-950 pb-16 sm:pb-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <MarketPriceTrend />
            </div>
            </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
                      Why Care Home Gas Contracts Need a Specialist Look
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

      <HowItWorks />
                  <WhatWeNeed />

                  <section className="bg-navy-950 py-16 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                      <span className="label-eyebrow">Stay In Contract</span>
          <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
                        Don&apos;t Get Rolled Onto a Deemed Rate
            </h2>
          <p className="mx-auto mt-3 max-w-2xl text-navy-300">
                        If your current gas contract lapses without a renewal in place,
                        many suppliers move you onto a deemed or out-of-contract rate -
                        often significantly higher than an agreed one. We flag your
            renewal window so you&apos;re not paying a penalty rate by
            default.
</p>
              </div>
              </section>

      <Faq faqs={CARE_HOME_FAQS} title="Care Home Business Gas - Frequently Asked Questions" />

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
