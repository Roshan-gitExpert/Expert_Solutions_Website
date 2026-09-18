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
  title: 'Business Energy for New Premises | Setting Up Electricity & Gas',
  description:
    'Moving into a new UK business premises? Understand deemed rates, meter set-up and how to arrange electricity and gas before you move in.',
  alternates: { canonical: '/business-energy-new-premises' },
};

const faqs = [
  {
    q: 'What happens if I move into a premises without arranging a contract first?',
    a: 'If a business starts using electricity or gas at a premises without an agreed contract, the incumbent supplier can usually place you on a "deemed" or "out-of-contract" rate. These rates are typically set higher than a negotiated business contract and apply automatically from the date you start occupying the site.',
  },
  {
    q: 'How do I find out who currently supplies the premises?',
    a: 'The property’s meter serial number, MPAN (electricity) or MPRN (gas) reference is usually visible on the meter itself or in the landlord/letting agent’s paperwork. This is normally the starting point for identifying the incumbent supplier and requesting a switch.',
  },
  {
    q: 'Can I set up a new contract before I move in?',
    a: 'In many cases, yes - a contract can often be arranged to start from your planned move-in date, so you are not left on a deemed rate from day one. Timing depends on the supplier and the type of meter installed.',
  },
  {
    q: 'Do I need to take an opening meter reading?',
    a: 'Yes. Taking (and photographing) an opening meter reading on the day you take occupation is strongly recommended, so any billing dispute with a previous occupier’s supplier can be resolved with clear evidence.',
  },
  {
    q: 'What if the premises has no working meter or has been empty for a while?',
    a: 'A property that has been vacant for some time may need a meter inspection, a new connection, or reactivation of a disconnected supply. A specialist can talk through what is typically required before you can start using electricity or gas on-site.',
  },
];

export default function NewPremisesPage() {
  return (
    <>
      <Breadcrumbs items={[]} current="Business Energy for New Premises" />
      <ServiceSchema
        name="Business Energy Set-Up for New Premises"
        description="Support arranging electricity and gas contracts for UK businesses moving into a new commercial premises, including deemed-rate and meter set-up guidance."
      />
      <Hero
        eyebrow="New Premises"
        title="Setting Up Business Energy at a New Premises"
        subtitle="Moving your business into a new site? Get your electricity and gas set up correctly from day one - and avoid an expensive deemed rate."
        formVariant="new-premises"
      />
      <TrustBar />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          Why Energy Set-Up Matters When You Move Into a New Premises
        </h2>
        <p className="mt-4 text-navy-500">
          The moment a business starts drawing electricity or gas at a
          commercial premises, someone becomes responsible for the bill -
          usually from the first day of occupation, whether or not any
          paperwork has been signed. If no contract has been agreed with a
          supplier, the meter’s existing supplier can typically place the
          site on a deemed (sometimes called &ldquo;out-of-contract&rdquo;)
          rate, which is designed as a default fallback rather than a
          competitive business tariff.
        </p>
        <p className="mt-4 text-navy-500">
          Getting a contract arranged - or at least underway - before or
          shortly after you take occupation is generally the most
          straightforward way to avoid unnecessary cost and admin during an
          already busy move. It also helps to know the site’s meter
          details (MPAN for electricity, MPRN for gas), take an opening
          meter reading, and confirm whether the premises has any existing
          supply issues before you rely on it.
        </p>
      </section>

      <HowItWorks
        title="Getting Energy Set Up at Your New Premises"
        steps={[
          {
            step: '1',
            title: 'Tell us about the premises',
            desc: 'Share the address, move-in date and meter details if you have them (MPAN/MPRN, or a photo of the meter).',
          },
          {
            step: '2',
            title: 'We check the current supply',
            desc: 'We help identify the incumbent supplier and current rate, and talk through your contract options.',
          },
          {
            step: '3',
            title: 'We help you get set up',
            desc: 'We explain the steps to get a contract in place around your move-in date, reducing time spent on a deemed rate.',
          },
        ]}
      />

      <WhatWeNeed
        items={[
          'The premises address and your planned move-in date',
          'MPAN (electricity) or MPRN (gas) reference, if known',
          'A contact name, phone number and business email',
          'Whether the premises currently has a live supply, or has been vacant',
          'Your approximate expected usage, if known',
        ]}
      />

      <Benefits
        title="How We Can Help With a New Premises"
        intro="Moving into a new site brings a lot to organise at once - energy doesn't need to be complicated."
        benefits={[
          { title: 'Avoid deemed rates', desc: 'We help you understand and reduce time spent on a default deemed/out-of-contract rate.' },
          { title: 'Identify the incumbent supplier', desc: 'We help work out who currently supplies the premises using the meter details.' },
          { title: 'Timing guidance', desc: 'We explain realistic timescales for getting a new contract in place around your move-in date.' },
          { title: 'Meter reading guidance', desc: 'We explain why an opening reading matters and how to record it correctly.' },
          { title: 'Works alongside your move', desc: 'One point of contact for your energy set-up while you manage everything else involved in the move.' },
          { title: 'No obligation', desc: 'A review of your options does not commit your business to switching.' },
        ]}
      />

      <Faq faqs={faqs} title="New Premises Energy - Frequently Asked Questions" />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <RelatedLinks
          title="Other Business Moves We Help With"
          links={TRIGGER_PAGES.filter((t) => t.slug !== 'business-energy-new-premises').map((t) => ({
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
        title="Get Your New Premises Energy Sorted"
        subtitle="Speak to a specialist before or as soon as you move in, and avoid an unnecessary deemed rate."
      />
    </>
  );
}
