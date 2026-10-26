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
import { SECTORS, CORE_PAGES, COMPLIANCE_PAGES } from '@/lib/seoData';
import { SECTOR_CONTENT } from '@/lib/sectorContent';

// This file is a static override of app/(marketing)/sectors/[slug]/page.js
// for exactly the "restaurants" slug, following the same pattern as the
// care-homes override - Next.js resolves the static route ahead of the
// dynamic sibling, so this page serves /sectors/restaurants with a
// long-tail-specific layout while every other sector still goes through
// [slug]/page.js unaffected.
//
// Standing-charge reduction mechanisms below are drawn from genuine,
// published guidance on how business electricity standing charges are
// built up (supplier margin, Maximum Import Capacity, meter
// consolidation, half-hourly network pricing bands, connection type,
// tariff structure) - no invented savings percentages or case studies.

const RESTAURANT_STANDING_CHARGE_FAQS = [
  {
        q: 'Can a restaurant actually reduce its electricity standing charge?',
        a: 'In several genuine ways: moving off a default/out-of-contract tariff (these typically carry a higher built-in margin than a negotiated fixed contract), comparing suppliers (each adds its own margin on top of network costs), and - where relevant - reviewing your Maximum Import Capacity so you are not paying fixed charges for more capacity than your kitchen actually draws at peak.',
  },
  {
        q: 'Does a smaller cafe or takeaway qualify for reduced-rate VAT?',
        a: 'HMRC applies the reduced 5% VAT rate (instead of 20%) where average usage is low: under 33 kWh of electricity per day (1,000 kWh per month), or under 145 kWh of gas per day (4,397 kWh per month). A very small kitchen or takeaway with modest usage may qualify - it is worth checking your actual average consumption against these thresholds rather than assuming either way.',
  },
  {
        q: 'We run a commercial kitchen on a half-hourly meter - does that affect our standing charge?',
        a: 'It can. Half-hourly (HH) metered supplies sit in different network charging bands to standard meters, and some HH customers can arrange metering costs through a separate Meter Operator contract rather than paying them inside the supplier’s standing charge. Whether this is worth doing depends on your specific site - a specialist can compare the two for you.',
  },
  {
        q: 'Would a "no standing charge" tariff be cheaper for our restaurant?',
        a: 'Not necessarily. A nil-standing-charge tariff usually moves that fixed cost into a higher unit rate instead of removing it. For a kitchen with heavy, fairly constant equipment and refrigeration load, it is the total projected cost across both the standing charge and the unit rate that matters, not the standing charge in isolation.',
  },
  {
        q: 'Do you work with both single-site restaurants and multi-site groups?',
        a: 'Yes - we work with independent restaurants and cafes as well as multi-site restaurant groups. See our business energy for a new branch page if you are opening an additional site.',
  },
  ];

export const metadata = {
    title: 'How to Reduce Restaurant Electricity Standing Charges | Expert Solutions',
    description:
          'Practical, genuine ways UK restaurants and cafes can reduce their business electricity standing charge - capacity, meter type, VAT and contract structure. Free, no-obligation review.',
    alternates: { canonical: '/sectors/restaurants' },
};

export default function RestaurantsStandingChargesPage() {
    const content = SECTOR_CONTENT.restaurants;

  return (
        <>
          <Breadcrumbs items={[{ label: 'Sectors', href: '/sectors' }]} current="Restaurants & Cafes" />
          <ServiceSchema
          name="Business Electricity for Restaurants"
          description="UK business electricity comparison and standing-charge review for restaurants, cafes and takeaways."
        />

                  <Hero
          eyebrow="Restaurants & Cafes"
          title="How to Reduce Restaurant Electricity Standing Charges"
          subtitle="Kitchen, extraction and refrigeration loads make standing charges a real line item for restaurants - compare whole-of-market contracts built around how your kitchen actually runs."
          formVariant="sector-restaurants-standing-charges"
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
                      Why Restaurant Standing Charges Are Worth a Closer Look
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

      <section className="bg-navy-950 py-16 sm:py-20">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                      <span className="label-eyebrow">Where The Charge Actually Comes From</span>
          <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
                        Five Genuine Ways to Bring Your Standing Charge Down
            </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
                        <div className="panel-light p-6">
                          <h3 className="text-base font-bold text-navy-900">1. Get off out-of-contract rates</h3>
              <p className="mt-2 text-sm text-navy-500">Default/out-of-contract tariffs typically build a higher margin into the standing charge than a negotiated fixed contract.</p>
            </div>
            <div className="panel-light p-6">
                          <h3 className="text-base font-bold text-navy-900">2. Compare suppliers</h3>
              <p className="mt-2 text-sm text-navy-500">Every supplier adds its own margin on top of network costs - a whole-of-market comparison shows where that margin is lowest for your usage.</p>
            </div>
            <div className="panel-light p-6">
                          <h3 className="text-base font-bold text-navy-900">3. Review your Maximum Import Capacity</h3>
              <p className="mt-2 text-sm text-navy-500">Network charges scale with your agreed capacity. If your kitchen&apos;s real peak demand is lower than the capacity on record, that mismatch can be reviewed.</p>
            </div>
            <div className="panel-light p-6">
                          <h3 className="text-base font-bold text-navy-900">4. Check your meter and connection type</h3>
              <p className="mt-2 text-sm text-navy-500">Half-hourly meters and three-phase connections sit in different network pricing bands to standard single-phase supplies - worth checking against what your site actually needs.</p>
            </div>
            </div>
          <p className="mt-6 text-sm text-navy-400">
                        A nil-standing-charge tariff does not remove these costs - it folds them into a higher unit rate instead, so the comparison that matters is total projected cost, not the standing charge line on its own.
            </p>
            </div>
            </section>

      <HowItWorks />
                  <WhatWeNeed />
                  <Faq faqs={RESTAURANT_STANDING_CHARGE_FAQS} title="Restaurant Electricity Standing Charges - Frequently Asked Questions" />

                  <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
                    <RelatedLinks
          title="Other Sectors We Help"
          links={SECTORS.filter((s) => s.slug !== 'restaurants').map((s) => ({
                        href: `/sectors/${s.slug}`,
                        label: s.label,
          }))}
        />
        <RelatedLinks
          title="Compliance Guides"
          links={COMPLIANCE_PAGES.map((c) => ({ href: `/compliance/${c.slug}`, label: c.label }))}
        />
        <RelatedLinks
          title="Related Business Energy Pages"
          links={CORE_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.label }))}
        />
          </section>

      <CtaBanner
        title="Get a Free Electricity Review for Your Restaurant"
        subtitle="Speak to a specialist about your standing charge, capacity and contract options - takes about two minutes online."
      />
          </>
  );
}
