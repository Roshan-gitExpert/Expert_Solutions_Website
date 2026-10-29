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

// Regulatory facts on this page (Ofgem Supply Licence Conditions 7.3,
// 7.4, 7.6A and 7A) are drawn from Ofgem's published Deemed Contract
// guidance (last updated November 2023) and micro-business protection
// rules - not paraphrased marketing claims. No invented rates, dates or
// figures beyond what that guidance actually sets out.

const DEEMED_RATES_FAQS = [
  {
    q: 'What is a "deemed" energy contract?',
    a: 'A deemed contract can arise when a business starts consuming electricity or gas at a premises without having agreed a supply contract - for example moving into new premises, or an existing contract ending without any arrangement for what happens next while the business keeps consuming energy.',
  },
  {
    q: 'Why are deemed rates more expensive?',
    a: 'There is no agreed, negotiated contract holding prices down, so a deemed contract is typically charged at the supplier’s highest standard unit rates and standing charges rather than a competitive rate.',
  },
  {
    q: 'How do I avoid being put on a deemed rate in the first place?',
    a: 'The main trigger is consuming energy at a premises with no contract in place - so arranging a supply contract before you start trading from new premises (or before an old contract lapses) is the most reliable way to avoid it.',
  },
  {
    q: 'If I am already on a deemed rate, can I switch away immediately?',
    a: 'Yes. Under Ofgem’s Supply Licence Conditions (SLC 7.6A), a deemed contract cannot include a fixed term, a termination fee, or a notice requirement before you switch - so you are free to arrange and move to a new contract without being locked in or charged an exit fee.',
  },
  {
    q: 'Are there extra protections for small (micro) businesses specifically?',
    a: 'Yes. Since 18 January 2010, Ofgem’s rules (SLC 7A) require suppliers to take reasonable steps to bring the main terms of a micro-business contract to your attention in plain language, and separate Ofgem guidance for micro-businesses provides further protection on top of the general deemed contract rules.',
  },
  {
    q: 'Can a supplier ask a deemed customer for a security deposit?',
    a: 'Ofgem’s guidance treats routinely charging security deposits to deemed customers as generally inconsistent with suppliers’ fair-treatment obligations - this is not something that should happen as standard practice.',
  },
];

export const metadata = {
  title: 'How to Avoid Deemed Energy Rates as a Micro Business | Expert Solutions',
  description:
    'What a deemed business energy contract is, why deemed rates cost more, and the genuine Ofgem rules that let micro businesses avoid or escape them. Free, no-obligation review.',
  alternates: { canonical: '/compliance/deemed-rates' },
};

export default function DeemedRatesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Compliance', href: '/compliance/deemed-rates' }]} current="Deemed Energy Rates" />
      <ServiceSchema
        name="Deemed Energy Rates Guidance for Micro Businesses"
        description="Guidance on avoiding and escaping deemed business energy contracts in the UK, based on Ofgem Supply Licence Conditions."
      />

      <Hero
        eyebrow="Compliance"
        title="How to Avoid Deemed Energy Rates as a Micro Business"
        subtitle="Deemed contracts carry a supplier's highest rates by default - here's exactly what triggers one, and the Ofgem rules that let you avoid or escape it."
        formVariant="compliance-deemed-rates"
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
          What Actually Triggers a Deemed Contract
        </h2>
        <p className="mt-4 text-navy-500">
          Ofgem&apos;s guidance on Supply Licence Conditions 7.3 and 7.4 sets out two main
          situations where a deemed contract arises: a business begins consuming energy at a
          premises without having agreed a contract (most commonly when moving into new
          premises), or an existing contract comes to an end with no provision for what follows
          and the business keeps consuming energy regardless. In both cases, the supplier is
          entitled to supply you - but on its own deemed terms, not a negotiated one.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">No agreed contract, new premises</h3>
            <p className="mt-2 text-sm text-navy-500">Starting to consume energy at a site before any supply contract is arranged is the most common route into a deemed contract.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Contract ends, nothing arranged</h3>
            <p className="mt-2 text-sm text-navy-500">If a fixed-term contract ends and you keep consuming energy with no renewal or follow-on arrangement in place, this can also result in deemed terms.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Highest standard rates apply</h3>
            <p className="mt-2 text-sm text-navy-500">Deemed rates are generally the supplier&apos;s highest published unit rates and standing charges - there is no negotiated discount built in.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Not the same as "out of contract"</h3>
            <p className="mt-2 text-sm text-navy-500">Out-of-contract tariffs (what you move to when a fixed term simply expires without a deemed scenario) are a related but separate issue - see our tariff penalties guide.</p>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="label-eyebrow">Know Your Way Out</span>
          <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
            You Can Switch Off a Deemed Contract With No Penalty
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-navy-300">
            Under Ofgem&apos;s rules, a deemed contract cannot carry a fixed term, a termination
            fee, or a notice period before you switch. If you discover you are on deemed rates,
            you are free to arrange a new contract and move away immediately - the sooner you
            compare your options, the sooner you are off the supplier&apos;s highest rates.
          </p>
        </div>
      </section>

      <HowItWorks />
      <WhatWeNeed />
      <Faq faqs={DEEMED_RATES_FAQS} title="Deemed Energy Rates - Frequently Asked Questions" />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <RelatedLinks
          title="More Compliance Guides"
          links={COMPLIANCE_PAGES.filter((c) => c.slug !== 'deemed-rates').map((c) => ({
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
        title="Think You Might Be on a Deemed Rate?"
        subtitle="Speak to a specialist about your current rate and contract options - takes about two minutes online."
      />
    </>
  );
}
