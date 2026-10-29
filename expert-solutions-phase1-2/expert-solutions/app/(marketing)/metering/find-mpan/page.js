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
import { CORE_PAGES, METERING_PAGES, SECTORS } from '@/lib/seoData';

// MPAN/MPRN format and lookup-route facts (21-digit MPAN with 13-digit
// core identifier, 6-10 digit MPRN, DNO lookup via Energy Networks
// Association, Find My Supplier for gas) are genuine, published
// industry facts - not invented.

const FIND_MPAN_FAQS = [
  {
    q: 'What is an MPAN, exactly?',
    a: 'Your Meter Point Administration Number identifies the electricity supply at a specific premises - not your account with a supplier. It is a 21-digit number starting with "S", made up of a profile type, meter time-switch code, line loss factor, distributor ID, a core meter point ID, and a check digit. The bottom-row 13-digit unique identifier (distributor ID + meter point ID + check digit) is usually the part a supplier or broker will ask you for.',
  },
  {
    q: 'Does my MPAN change if I switch electricity supplier?',
    a: 'No - the MPAN identifies the physical supply point at your premises and stays the same regardless of which supplier you are with.',
  },
  {
    q: 'How do I find my MPAN without a bill?',
    a: 'Three genuine routes: ask your landlord or the previous occupier for a copy of a recent bill (it is printed there); contact your current supplier directly if you know who it is; or, if you don’t know your supplier, find your local electricity Distribution Network Operator using the Energy Networks Association’s postcode search tool and contact them - DNOs can confirm the MPAN for a given premises.',
  },
  {
    q: 'What about my gas MPRN - is it the same process?',
    a: 'Similar, but gas uses the separate Meter Point Reference Number (MPRN), a 6-10 digit number. You can look this up using the "Find My Supplier" online tool with your postcode, or by calling the Meter Number Helpline.',
  },
  {
    q: 'Why would a broker need my MPAN before giving a quote?',
    a: 'Your MPAN lets a broker pull the correct network, distributor and meter information for your exact premises, rather than relying on a generic postcode estimate - this is what makes a quote specific to your actual connection rather than a ballpark figure.',
  },
];

export const metadata = {
  title: 'How to Find Your Business MPAN Number Without a Bill | Expert Solutions',
  description:
    'What an MPAN actually is, how it differs from your gas MPRN, and every genuine way to look yours up without a copy of a bill to hand.',
  alternates: { canonical: '/metering/find-mpan' },
};

export default function FindMpanPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Metering', href: '/metering/find-mpan' }]} current="Find Your Business MPAN" />
      <ServiceSchema
        name="Business MPAN Lookup Guidance"
        description="Guidance on finding a UK business electricity MPAN (and gas MPRN) without a copy of a bill."
      />

      <Hero
        eyebrow="Metering"
        title="How to Find Your Business MPAN Number Without a Bill"
        subtitle="What the number actually means, and every genuine way to look it up when you don't have a bill in front of you."
        formVariant="metering-find-mpan"
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
          MPAN (Electricity) vs MPRN (Gas)
        </h2>
        <p className="mt-4 text-navy-500">
          Both numbers identify your supply point rather than your account, and neither changes
          when you switch supplier. They are looked up in different places, which is the most
          common source of confusion.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">MPAN - 21 digits, starts with &quot;S&quot;</h3>
            <p className="mt-2 text-sm text-navy-500">Made up of profile type, meter time-switch code, line loss factor, distributor ID, meter point ID and a check digit. The 13-digit core identifier is the part usually requested.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">MPRN - 6 to 10 digits</h3>
            <p className="mt-2 text-sm text-navy-500">The gas equivalent - a shorter numeric reference with no letter prefix.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Finding your MPAN</h3>
            <p className="mt-2 text-sm text-navy-500">Ask your landlord/previous occupier for a bill, contact your supplier if known, or use the Energy Networks Association&apos;s DNO lookup tool by postcode and contact that network operator.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Finding your MPRN</h3>
            <p className="mt-2 text-sm text-navy-500">Use the online &quot;Find My Supplier&quot; search tool with your postcode, or call the Meter Number Helpline.</p>
          </div>
        </div>
      </section>

      <HowItWorks />
      <WhatWeNeed />
      <Faq faqs={FIND_MPAN_FAQS} title="Finding Your Business MPAN - Frequently Asked Questions" />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <RelatedLinks
          title="More Metering Guides"
          links={METERING_PAGES.filter((m) => m.slug !== 'find-mpan').map((m) => ({
            href: `/metering/${m.slug}`,
            label: m.label,
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
        title="Found Your MPAN? Get a Free Comparison"
        subtitle="Share your details and a specialist can pull your exact supply information and compare your options."
      />
    </>
  );
}
