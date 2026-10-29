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
import { CORE_PAGES, COMPLIANCE_PAGES, SECTORS } from '@/lib/seoData';

// Notice-period and rollover figures here (30-120 days typical, 30-day
// cap and 12-month rollover cap for micro-businesses) are genuine,
// commonly-published figures - but every contract differs, so the page
// consistently tells the reader to check their own terms rather than
// presenting one number as universal.

const TARIFF_PENALTY_FAQS = [
  {
    q: 'What is an "out of contract" rate?',
    a: 'When your fixed-term business energy contract ends and you have not agreed a new one, most suppliers move you onto an out-of-contract tariff. This is typically well above a negotiated rate, because there is no agreed deal holding the price down.',
  },
  {
    q: 'What is a contract "rollover" and how is it different?',
    a: 'Some suppliers automatically place you on a new fixed term if you take no action before your renewal date, at rates you did not actively agree to - this is a rollover, distinct from an out-of-contract tariff, though both can result in paying more than necessary.',
  },
  {
    q: 'How much notice do I need to give before my contract ends?',
    a: 'This varies by supplier and is set out in your own contract terms - commonly somewhere between 30 and 120 days before the end date. For micro-businesses specifically, Ofgem rules mean a supplier cannot require more than 30 days’ notice. Always check your own agreement rather than assuming a figure.',
  },
  {
    q: 'What happens if I miss my notice window?',
    a: 'Typically the contract rolls over automatically for a further fixed term - commonly 12 months - often at a rate higher than you would get by comparing the market. For micro-businesses, Ofgem rules cap an automatic rollover at 12 months; some suppliers apply longer rollover terms for non-micro businesses, so check your terms.',
  },
  {
    q: 'Is there a way to avoid rollover and out-of-contract rates altogether?',
    a: 'Yes - the reliable way is to start comparing your options well before your renewal date (ideally as soon as you know when your contract ends) so a new deal is in place before the old one lapses, rather than reacting after you’ve already been moved onto a default rate.',
  },
];

export const metadata = {
  title: 'UK Business Energy Out-of-Contract Tariff Penalties | Expert Solutions',
  description:
    'What happens if your business energy contract lapses or rolls over - out-of-contract rates, rollover terms, notice periods, and how to avoid paying the penalty rate.',
  alternates: { canonical: '/compliance/tariff-penalties' },
};

export default function TariffPenaltiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Compliance', href: '/compliance/tariff-penalties' }]} current="Out-of-Contract Tariff Penalties" />
      <ServiceSchema
        name="Out-of-Contract Business Energy Tariff Guidance"
        description="Guidance on UK business energy out-of-contract rates, rollover terms and renewal notice periods."
      />

      <Hero
        eyebrow="Compliance"
        title="UK Business Energy Out-of-Contract Tariff Penalties"
        subtitle="What actually happens when your fixed term ends without a renewal in place - and the notice windows that determine whether you avoid it."
        formVariant="compliance-tariff-penalties"
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
          Out-of-Contract vs Rollover - Two Different Penalties
        </h2>
        <p className="mt-4 text-navy-500">
          These two terms get used interchangeably but describe different situations. An
          out-of-contract rate applies when your fixed term simply ends with nothing agreed to
          follow it - you default to the supplier&apos;s standard, typically highest, tariff. A
          rollover is different: your contract terms automatically renew into a new fixed term
          (commonly 12 months) at a rate you did not actively negotiate, unless you take action
          before the deadline in your contract.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Notice window: 30-120 days (typical)</h3>
            <p className="mt-2 text-sm text-navy-500">Most suppliers require notice somewhere in this range before your end date - the exact figure is set out in your own contract, not a single industry-wide number.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Micro-business cap: 30 days</h3>
            <p className="mt-2 text-sm text-navy-500">Ofgem rules mean a supplier cannot require a micro-business to give more than 30 days&apos; notice before the contract end date.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Rollover length cap (micro-business)</h3>
            <p className="mt-2 text-sm text-navy-500">For micro-businesses, an automatic rollover cannot exceed 12 months. Some suppliers apply longer rollover terms for larger businesses, so check your own terms.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Out-of-contract has no fixed cap</h3>
            <p className="mt-2 text-sm text-navy-500">Unlike a deemed contract, an out-of-contract tariff is a standard published rate - costly, but not subject to the same no-termination-fee protections as a deemed contract.</p>
          </div>
        </div>
      </section>

      <HowItWorks />
      <WhatWeNeed />

      <section className="bg-navy-950 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="label-eyebrow">Act Before the Window Closes</span>
          <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
            We Flag Your Renewal Window So You Don&apos;t Miss It
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-navy-300">
            Once we know your contract end date, we can help you compare options in good time -
            well before your supplier&apos;s notice deadline - so you are never forced onto an
            out-of-contract rate or an unwanted rollover by default.
          </p>
        </div>
      </section>

      <Faq faqs={TARIFF_PENALTY_FAQS} title="Out-of-Contract Tariff Penalties - Frequently Asked Questions" />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <RelatedLinks
          title="More Compliance Guides"
          links={COMPLIANCE_PAGES.filter((c) => c.slug !== 'tariff-penalties').map((c) => ({
            href: `/compliance/${c.slug}`,
            label: c.label,
          }))}
        />
        <RelatedLinks
          title="Sectors We Help"
          links={SECTORS.map((s) => ({ href: `/sectors/${s.slug}`, label: s.label }))}
        />
        <RelatedLinks
          title="Related Business Energy Pages"
          links={CORE_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.label }))}
        />
      </section>

      <CtaBanner
        title="Not Sure When Your Contract Ends?"
        subtitle="Tell us your supplier and we'll help you check your renewal window before it costs you."
      />
    </>
  );
}
