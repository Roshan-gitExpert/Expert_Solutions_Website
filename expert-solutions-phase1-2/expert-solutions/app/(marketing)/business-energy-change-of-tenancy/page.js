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
  title: 'Business Energy Change of Tenancy (COT) | UK Commercial Switch',
  description:
    'Taking over the lease on a commercial unit? Understand the business energy change of tenancy (COT) process and how to set up your own contract.',
  alternates: { canonical: '/business-energy-change-of-tenancy' },
};

const faqs = [
  {
    q: 'What is a change of tenancy (COT) in business energy?',
    a: 'A change of tenancy is the process of registering a new business as the party responsible for electricity or gas at a premises, typically triggered by a change in the lease or occupier. It notifies the supplier that a new organisation has taken over responsibility for the meter from a set date.',
  },
  {
    q: 'From what date am I responsible for the bill?',
    a: 'Responsibility is generally based on the date you take occupation of the premises (as agreed in your lease), not the date any energy paperwork is completed. This is why it helps to notify a supplier and take a meter reading as close to your move-in date as possible.',
  },
  {
    q: 'What if the previous tenant did not cancel their contract?',
    a: 'This is a common source of billing disputes. Providing your move-in date, a meter reading, and evidence such as your lease can help a supplier correctly separate the previous occupier’s usage from yours.',
  },
  {
    q: 'Do I have to use the previous tenant’s supplier and contract?',
    a: 'No. As the new occupier, you are generally free to arrange your own contract with a supplier of your choice, rather than being tied to whatever the previous business had in place - subject to any deemed rate applying until a new contract starts.',
  },
  {
    q: 'How long does a change of tenancy usually take?',
    a: 'Timescales vary by supplier and meter type. Starting the process as early as possible - ideally before your move-in date - is generally the best way to avoid a lengthy period on a deemed rate.',
  },
];

export default function ChangeOfTenancyPage() {
  return (
    <>
      <Breadcrumbs items={[]} current="Business Energy Change of Tenancy" />
      <ServiceSchema
        name="Business Energy Change of Tenancy (COT) Support"
        description="Support for UK businesses taking over a commercial lease, registering a change of tenancy for electricity and gas, and arranging a new contract."
      />
      <Hero
        eyebrow="Change of Tenancy"
        title="Business Energy Change of Tenancy (COT)"
        subtitle="Taking over a commercial lease? We help you register the change of tenancy and get your own energy contract in place."
        formVariant="change-of-tenancy"
      />
      <TrustBar />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          What a Change of Tenancy Means for Your Energy
        </h2>
        <p className="mt-4 text-navy-500">
          When a business takes over the lease on a commercial unit, office
          or other premises, the energy supplier needs to know that
          responsibility for the electricity and/or gas meter has passed to
          a new occupier. This is usually referred to as a change of
          tenancy, or &ldquo;COT&rdquo;. Getting this registered promptly
          helps make sure your business is billed correctly from your actual
          move-in date, rather than being left tangled up in a previous
          occupier’s account.
        </p>
        <p className="mt-4 text-navy-500">
          It also gives you the opportunity to agree your own contract terms
          with a supplier of your choice, rather than simply inheriting
          whatever arrangement (or lack of one) the previous tenant had in
          place.
        </p>
      </section>

      <HowItWorks
        title="How the Change of Tenancy Process Works"
        steps={[
          {
            step: '1',
            title: 'Confirm your move-in date',
            desc: 'Your lease start date or the date you take occupation is the key reference point for the whole process.',
          },
          {
            step: '2',
            title: 'Take a meter reading',
            desc: 'An opening reading, ideally with a photo, protects you if there is ever a dispute over usage before your tenancy.',
          },
          {
            step: '3',
            title: 'Register the change and agree a contract',
            desc: 'We help you notify the right supplier and put a contract in place under your business name.',
          },
        ]}
      />

      <WhatWeNeed
        items={[
          'The premises address and your lease/move-in date',
          'A meter reading, and photo if possible',
          'MPAN (electricity) or MPRN (gas) reference, if known',
          'A contact name, phone number and business email',
          'Details of the previous occupier’s supplier, if known',
        ]}
      />

      <Benefits
        title="How We Help With a Change of Tenancy"
        intro="Taking over a lease already involves plenty of paperwork - we help make the energy side of it straightforward."
        benefits={[
          { title: 'COT guidance', desc: 'We explain what a change of tenancy involves and what evidence typically helps.' },
          { title: 'Your own contract', desc: 'We help you agree terms in your own business name, rather than inheriting a previous arrangement.' },
          { title: 'Dispute support', desc: 'Guidance on using meter readings and lease dates to resolve billing overlaps with a previous tenant.' },
          { title: 'Multi-unit support', desc: 'If you are taking over several units at once, we can look at all of them together.' },
          { title: 'Clear next steps', desc: 'A specialist explains exactly what to do and by when.' },
          { title: 'No obligation', desc: 'A review of your options does not commit your business to switching.' },
        ]}
      />

      <Faq faqs={faqs} title="Change of Tenancy - Frequently Asked Questions" />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <RelatedLinks
          title="Other Business Moves We Help With"
          links={TRIGGER_PAGES.filter((t) => t.slug !== 'business-energy-change-of-tenancy').map((t) => ({
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
        title="Registering a Change of Tenancy?"
        subtitle="Speak to a specialist about getting your own business energy contract in place."
      />
    </>
  );
}
