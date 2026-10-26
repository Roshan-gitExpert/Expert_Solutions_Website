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

const FIXED_VS_PASSTHROUGH_FAQS = [
  {
        q: 'What is a fully fixed business energy contract?',
        a: 'A single per-kWh rate is agreed for the whole contract term (usually 1-3 years), covering wholesale energy, third-party network costs, supplier admin and standing charges together. Once fixed, that unit rate does not change even if non-commodity costs rise during the term.',
  },
  {
        q: 'What is a pass-through (flexible) contract?',
        a: 'Your bill is split into a fixed element (often the wholesale rate) and variable "pass-through" costs - transmission and distribution charges, capacity and balancing costs, environmental levies, metering and industry charges, and system losses - which move up or down as those underlying charges change.',
  },
  {
        q: 'Which one is cheaper?',
        a: 'There is no universal answer - it depends on market conditions. A fully fixed deal can work out cheaper when non-commodity charges are expected to rise or markets are volatile; a pass-through deal can work out cheaper when wholesale markets are stable or falling, since you are not paying a risk premium for certainty you did not need.',
  },
  {
        q: 'Which type of business typically chooses each option?',
        a: 'Fully fixed contracts suit businesses that want budget certainty and limited appetite for monitoring energy markets - tight-margin operations and public-facing services where a surprise bill is a real problem. Pass-through suits businesses comfortable with monthly bill fluctuation, higher energy users who can shift consumption, and larger multi-site operations with their own energy management.',
  },
  {
        q: 'Is there a middle-ground option?',
        a: 'Some suppliers offer partially fixed structures that sit between the two. If neither a fully fixed nor a fully pass-through contract feels right for your business, it is worth asking what partially fixed options are available for your usage profile.',
  },
  ];

export const metadata = {
    title: 'Fixed Rate vs Pass-Through Commercial Energy Explained | Expert Solutions',
    description:
          'The real difference between a fully fixed and a pass-through (flexible) UK business energy contract - how each is priced, and which suits which type of business.',
    alternates: { canonical: '/compliance/fixed-vs-pass-through' },
};

export default function FixedVsPassThroughPage() {
    return (
          <>
            <Breadcrumbs items={[{ label: 'Compliance', href: '/compliance/fixed-vs-pass-through' }]} current="Fixed vs Pass-Through Contracts" />
            <ServiceSchema
          name="Fixed vs Pass-Through Business Energy Contracts"
          description="Explanation of fully fixed and pass-through (flexible) UK commercial energy contract structures."
        />

                  <Hero
          eyebrow="Compliance"
          title="Difference Between Fixed Rate vs Pass-Through Commercial Energy"
          subtitle="Two different ways a business energy contract can be priced - and why the 'cheaper' one depends on where the market is heading, not which one sounds simpler."
          formVariant="compliance-fixed-vs-pass-through"
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
                      How Each Contract Type Is Actually Priced
            </h2>
          <p className="mt-4 text-navy-500">
                      The difference is not just "fixed vs flexible" marketing language - it is about where
            the risk of non-commodity costs changing during your contract sits. A fully fixed
            contract moves that risk onto the supplier (reflected in the rate they quote you); a
            pass-through contract keeps that risk with you, in exchange for not paying a premium
            for certainty.
              </p>


        <div className="mt-8 grid gap-6 sm:grid-cols-2">
                        <div className="rounded-2xl border border-navy-100 p-6">
                          <h3 className="text-base font-bold text-navy-900">Fully fixed</h3>
              <p className="mt-2 text-sm text-navy-500">One all-in rate for the whole term (typically 1-3 years). Protected from price spikes, but no benefit if wholesale prices fall, and less visibility into the underlying cost breakdown.</p>
              </div>
            <div className="rounded-2xl border border-navy-100 p-6">
                          <h3 className="text-base font-bold text-navy-900">Pass-through</h3>
              <p className="mt-2 text-sm text-navy-500">A fixed wholesale element plus variable network, balancing, environmental and metering charges. More transparent, but bills move month to month and are harder to budget precisely.</p>
              </div>
            <div className="rounded-2xl border border-navy-100 p-6">
                          <h3 className="text-base font-bold text-navy-900">Who tends to pick fully fixed</h3>
              <p className="mt-2 text-sm text-navy-500">Businesses that want budget certainty, have tight margins, or run public-facing services where an unpredictable bill is a real operational problem.</p>
              </div>
            <div className="rounded-2xl border border-navy-100 p-6">
                          <h3 className="text-base font-bold text-navy-900">Who tends to pick pass-through</h3>
              <p className="mt-2 text-sm text-navy-500">Larger, often half-hourly metered sites that can monitor markets, shift consumption, and tolerate monthly bill variation in exchange for potential savings.</p>
              </div>
              </div>
              </section>

      <HowItWorks />
                    <WhatWeNeed />
                    <Faq faqs={FIXED_VS_PASSTHROUGH_FAQS} title="Fixed vs Pass-Through Contracts - Frequently Asked Questions" />


                    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
                      <RelatedLinks
            title="More Compliance Guides"
            links={COMPLIANCE_PAGES.filter((c) => c.slug !== 'fixed-vs-pass-through').map((c) => ({
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
        title="Not Sure Which Contract Structure Suits You?"
        subtitle="Tell us about your site and usage and a specialist can talk through which structure fits best."
      />
          </>
  );
}
