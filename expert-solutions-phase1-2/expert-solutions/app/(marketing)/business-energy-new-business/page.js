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
import { CORE_PAGES, TRIGGER_PAGES } from '@/lib/seoData';

export const metadata = {
  title: 'Business Energy for a New Business | First Contract Guidance',
  description:
    'Starting a new UK business? Understand how energy contracts, credit checks and deposits typically work when you have no trading history yet.',
  alternates: { canonical: '/business-energy-new-business' },
};

const faqs = [
  {
    q: 'Can a brand new business get a commercial energy contract?',
    a: 'Yes. New businesses take out commercial energy contracts regularly. Because there is no trading history, a supplier may ask for extra information, a deposit, or offer a shorter initial contract term rather than refusing to supply.',
  },
  {
    q: 'Will I need to pass a credit check?',
    a: 'Most suppliers carry out a credit check as part of setting up a new business energy contract. A new business with limited credit history is not unusual, and a specialist can talk you through what a supplier may ask for in that situation.',
  },
  {
    q: 'What if I don’t know how much energy my business will use yet?',
    a: 'This is common for new businesses. An estimated annual consumption based on your premises type, equipment and opening hours is normally enough to get an initial contract in place, with usage reviewed once you have real billing data.',
  },
  {
    q: 'Should I sign a long contract for a new business?',
    a: 'That depends on how established your usage patterns are and your appetite for locking in a rate. Some new businesses prefer a shorter initial term so they can review pricing again once they have a track record - a specialist can talk through the trade-offs.',
  },
  {
    q: 'Do I need a separate contract for electricity and gas?',
    a: 'Usually, yes - electricity and gas are typically billed under separate contracts, sometimes with the same supplier and sometimes with different ones, depending on which offers the better terms for your business.',
  },
];

export default function NewBusinessPage() {
  return (
    <>
      <Breadcrumbs items={[]} current="Business Energy for a New Business" />
      <ServiceSchema
        name="Business Energy Set-Up for New Businesses"
        description="Support for newly formed UK businesses arranging their first commercial electricity and gas contracts, including credit check and deposit guidance."
      />
      <Hero
        eyebrow="New Business"
        title="Business Energy for a Brand New Business"
        subtitle="Starting a new business? We help you understand your first energy contract - including credit checks, deposits and estimated usage."
        formVariant="new-business"
      />
      <TrustBar />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          Setting Up Energy for a New Business
        </h2>
        <p className="mt-4 text-navy-500">
          Arranging electricity and gas is one of many things to organise
          when starting a new business, and it works a little differently
          without an established trading history. Suppliers typically run a
          credit check as part of setting up a new commercial account, and
          may ask for a deposit, a guarantor, or offer a shorter initial
          contract term where a business is newly formed.
        </p>
        <p className="mt-4 text-navy-500">
          None of this is unusual, and it does not mean a new business
          cannot get a competitive contract. Having a clear idea of your
          premises type, expected opening hours and any energy-intensive
          equipment (kitchen equipment, machinery, servers, and so on) helps
          a specialist put together a realistic estimated usage figure to
          start with.
        </p>
      </section>

      <HowItWorks
        title="Getting Your First Business Energy Contract"
        steps={[
          {
            step: '1',
            title: 'Tell us about your new business',
            desc: 'Premises type, expected opening date and roughly how the site will use energy.',
          },
          {
            step: '2',
            title: 'We talk through supplier requirements',
            desc: 'What a credit check may involve, and whether a deposit or guarantor is likely to apply.',
          },
          {
            step: '3',
            title: 'We help you choose a starting contract',
            desc: 'A sensible initial term based on estimated usage, reviewed again once you have real consumption data.',
          },
        ]}
      />

      <WhatWeNeed
        items={[
          'Your business name and premises address',
          'Expected opening/trading date',
          'A contact name, phone number and business email',
          'Premises type and any energy-intensive equipment',
          'Whether you need electricity, gas, or both',
        ]}
      />

      <Benefits
        title="How We Help New Businesses"
        intro="Starting a business means a long list of first-time decisions - here's how we help with the energy one."
        benefits={[
          { title: 'Plain-English guidance', desc: 'Clear explanations of credit checks, deposits and estimated usage for new accounts.' },
          { title: 'Estimated usage support', desc: 'Help putting together a realistic starting estimate based on your premises and equipment.' },
          { title: 'Contract length advice', desc: 'A steer on shorter vs longer initial terms for a business with no trading history yet.' },
          { title: 'Electricity and gas together', desc: 'We can look at both fuel types in one conversation if your premises needs them.' },
          { title: 'Support as you grow', desc: 'We can review your contract again once you have real usage data from your first months trading.' },
          { title: 'No obligation', desc: 'A review of your options does not commit your business to switching.' },
        ]}
      />

      <Faq faqs={faqs} title="New Business Energy - Frequently Asked Questions" />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <RelatedLinks
          title="Other Business Moves We Help With"
          links={TRIGGER_PAGES.filter((t) => t.slug !== 'business-energy-new-business').map((t) => ({
            href: `/${t.slug}`,
            label: t.shortLabel,
          }))}
        />
        <RelatedLinks
          title="Related Business Energy Pages"
          links={CORE_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.label }))}
        />
      </section>

      <CtaBanner
        title="Starting a New Business?"
        subtitle="Speak to a specialist about your first business electricity and gas contract."
      />
    </>
  );
}
