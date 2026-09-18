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
  title: 'Business Energy When Relocating | Moving Premises Checklist',
  description:
    'Relocating your UK business to a new premises? Understand how to close your old energy account and set up a new one without gaps or overlaps.',
  alternates: { canonical: '/business-energy-relocation' },
};

const faqs = [
  {
    q: 'Can I take my existing energy contract with me when I relocate?',
    a: 'Usually not directly - business energy contracts are tied to a specific meter/premises, so relocating generally means closing the account at your old site and opening a new one at your new premises, sometimes with the option to negotiate similar terms with the same supplier.',
  },
  {
    q: 'What is an early termination or "deemed" risk when relocating?',
    a: 'If you vacate a premises while still under contract there, you may remain liable for charges (or early termination costs) unless the account is closed correctly, and the incoming occupier could otherwise be placed on a deemed rate if nothing is arranged. Closing meter readings on your move-out date help avoid disputes.',
  },
  {
    q: 'How far in advance should I arrange energy for the new site?',
    a: 'As early as practical once your move date is confirmed. This gives more time to compare options for the new premises and reduces the chance of a gap - or an expensive deemed rate - between your old and new sites.',
  },
  {
    q: 'What readings do I need to take when I move out?',
    a: 'A final (closing) meter reading at your old premises, ideally with a photo, on the day you vacate. This is the key piece of evidence if there is ever a query about usage after you have left.',
  },
  {
    q: 'Can you help with both the old site closure and the new site set-up?',
    a: 'Yes - we can talk through both sides of a relocation together, so nothing falls through the gap between closing one account and opening another.',
  },
];

export default function RelocationPage() {
  return (
    <>
      <Breadcrumbs items={[]} current="Business Energy for Relocation" />
      <ServiceSchema
        name="Business Energy Support for Relocating Businesses"
        description="Support for UK businesses relocating premises, including closing the outgoing energy account and arranging a new contract at the new site."
      />
      <Hero
        eyebrow="Relocation"
        title="Business Energy When You're Relocating"
        subtitle="Moving your business to a new premises? We help you close your old energy account correctly and get the new one set up without a gap."
        formVariant="relocation"
      />
      <TrustBar />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          Two Sites, One Move: What Relocating Means for Energy
        </h2>
        <p className="mt-4 text-navy-500">
          Relocating a business usually means dealing with energy at two
          premises at once: closing the account at the site you are
          leaving, and opening one at the site you are moving into. Getting
          the timing and paperwork right on both sides helps avoid overlap
          charges, billing disputes with a landlord or new occupier, or a
          period on a deemed rate at the new premises.
        </p>
        <p className="mt-4 text-navy-500">
          A closing meter reading (with a photo) on your move-out date, and
          an opening reading on your move-in date, are the two pieces of
          evidence that matter most if either account is ever queried later.
        </p>
      </section>

      <HowItWorks
        title="Managing Energy Across Your Relocation"
        steps={[
          {
            step: '1',
            title: 'Confirm both dates',
            desc: 'Your move-out date at the old site and move-in date at the new one.',
          },
          {
            step: '2',
            title: 'We help close the old account',
            desc: 'Guidance on final readings and notifying your current supplier correctly.',
          },
          {
            step: '3',
            title: 'We help set up the new site',
            desc: 'A contract arranged to start around your new move-in date, avoiding a deemed-rate gap.',
          },
        ]}
      />

      <WhatWeNeed
        items={[
          'Old and new premises addresses',
          'Confirmed (or expected) move-out and move-in dates',
          'A contact name, phone number and business email',
          'Your current supplier and contract details, if known',
          'MPAN/MPRN for the new premises, if known',
        ]}
      />

      <Benefits
        title="How We Help With a Business Relocation"
        intro="Relocating already involves logistics, leases and lead times - here's how we help on the energy side."
        benefits={[
          { title: 'Both sides handled together', desc: 'We look at closing your old account and setting up the new one in the same conversation.' },
          { title: 'Avoid overlap charges', desc: 'Guidance on final and opening readings to keep both accounts accurate.' },
          { title: 'Reduce deemed-rate risk', desc: 'We help you get a new contract moving before or soon after your move-in date.' },
          { title: 'Multi-site continuity', desc: 'If you’re keeping other sites, we can look at how the new one fits your wider portfolio.' },
          { title: 'Clear timeline', desc: 'A specialist explains realistic timescales so you know what to expect and when.' },
          { title: 'No obligation', desc: 'A review of your options does not commit your business to switching.' },
        ]}
      />

      <Faq faqs={faqs} title="Business Relocation Energy - Frequently Asked Questions" />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <RelatedLinks
          title="Other Business Moves We Help With"
          links={TRIGGER_PAGES.filter((t) => t.slug !== 'business-energy-relocation').map((t) => ({
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
        title="Relocating Your Business?"
        subtitle="Speak to a specialist about closing your old energy account and setting up your new one."
      />
    </>
  );
}
