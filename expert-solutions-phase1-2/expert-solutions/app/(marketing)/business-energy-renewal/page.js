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
  title: 'Business Energy Renewal | Renew Your UK Commercial Contract',
  description:
    'Approaching your business energy renewal date? Get a free review before your contract ends, to avoid rolling onto an out-of-contract rate.',
  alternates: { canonical: '/business-energy-renewal' },
};

const faqs = [
  { q: 'When should I start looking at renewal?', a: 'It is generally worth reviewing your options well ahead of your contract end date, rather than waiting until the last minute - a specialist can advise on suitable timing for your specific contract.' },
  { q: 'What happens if my contract ends and I do nothing?', a: 'Many suppliers move businesses onto a deemed or out-of-contract rate automatically, which is typically higher than a negotiated contract rate.' },
  { q: 'Can you help me find my current renewal date?', a: 'If you are not sure of your exact renewal date, a specialist can help you work out where to find it, such as on a recent bill or contract letter.' },
  { q: 'Do I have to renew with my current supplier?', a: 'No. Renewal is a good opportunity to review whether staying with your current supplier, or considering other options, best suits your business.' },
  { q: 'Is there a cost to reviewing my renewal?', a: 'No, requesting a renewal review through our form or by phone does not cost your business anything.' },
];

export default function BusinessEnergyRenewalPage() {
  return (
    <>
      <Breadcrumbs items={[]} current="Business Energy Renewal" />
      <Hero
        title="Is Your Business Energy Contract Up for Renewal?"
        subtitle="Avoid rolling onto a higher out-of-contract rate. Get a free review of your options before your renewal date."
        formVariant="business-energy-renewal"
      />
      <TrustBar />
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          Don&apos;t Let Your Contract Roll Over
        </h2>
        <p className="mt-4 text-navy-500">
          When a business energy contract reaches its end date without a
          new agreement in place, many suppliers automatically move the
          account onto a deemed, or &ldquo;out-of-contract&rdquo;, rate.
          These rates are usually higher than a contract you actively
          negotiate or renew. Reviewing your options ahead of your renewal
          date gives your business time to make an informed decision.
        </p>
        <p className="mt-4 text-navy-500">
          If you are not sure exactly when your current contract ends, our
          specialists can help you work that out as part of your free
          review.
        </p>
      </section>
      <HowItWorks
        steps={[
          { step: '1', title: 'Find your renewal date', desc: 'We help you locate your current contract end date if you are not sure of it.' },
          { step: '2', title: 'Review your options', desc: 'We look at what is available ahead of your renewal, in good time.' },
          { step: '3', title: 'Decide with confidence', desc: 'A specialist explains your options clearly, with no obligation to proceed.' },
        ]}
        title="Renewing Your Business Energy Contract"
      />
      <WhatWeNeed
        items={[
          'Your business name and postcode',
          'Your current supplier, if known',
          'Your contract renewal or end date, if known',
          'A contact number and business email',
          'Whether you need electricity, gas, or both',
        ]}
      />
      <Benefits
        title="Why Review Ahead of Renewal"
        benefits={[
          { title: 'Avoid out-of-contract rates', desc: 'Reviewing ahead of time reduces the risk of lapsing onto a higher rate.' },
          { title: 'More time to decide', desc: 'Starting early means less pressure to make a rushed decision.' },
          { title: 'Understand your notice period', desc: 'We explain what notice, if any, your current contract requires.' },
          { title: 'Multi-site renewal tracking', desc: 'Helpful if your business has several contracts ending at different times.' },
          { title: 'Clear next steps', desc: 'You will know exactly what to expect once your review is complete.' },
          { title: 'No obligation', desc: 'A renewal review does not commit you to switching or renewing with anyone.' },
        ]}
      />
      <Faq faqs={faqs} title="Business Energy Renewal - Frequently Asked Questions" />
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
          links={CORE_PAGES.filter((p) => p.slug !== 'business-energy-renewal').map((p) => ({ href: `/${p.slug}`, label: p.label }))}
        />
      </section>
      <CtaBanner
        title="Review Your Business Energy Before Renewal"
        subtitle="Speak to a specialist ahead of your contract end date."
      />
    </>
  );
}
