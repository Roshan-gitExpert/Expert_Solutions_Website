import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import HowItWorks from '@/components/HowItWorks';
import WhatWeNeed from '@/components/WhatWeNeed';
import Benefits from '@/components/Benefits';
import Faq from '@/components/Faq';
import CtaBanner from '@/components/CtaBanner';
import RelatedLinks from '@/components/RelatedLinks';
import { SECTORS, LOCATIONS, TRIGGER_PAGES } from '@/lib/seoData';

export const metadata = {
  title: 'Compare Business Energy Costs | Free UK Commercial Energy Review',
  description:
    'Compare your business electricity and gas costs. Get a free, no-obligation commercial energy review from a UK business energy specialist.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero
        title="Compare Your Business Energy Costs"
        subtitle="See whether your business could get a better deal on electricity and gas. Get a free commercial energy review from a UK business energy specialist - no obligation."
        formVariant="homepage"
      />
      <TrustBar />
      <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          Why Review Your Business Energy?
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-navy-500">
          Most UK business energy contracts are agreed once and then left
          untouched until they roll over onto an out-of-contract rate -
          often at a higher price. A short review, based on your actual
          usage, contract type and renewal date, can help you understand
          where your business stands and what options are available before
          your current deal ends.
        </p>
      </section>
      <HowItWorks />
      <WhatWeNeed />
      <Benefits />
      <Faq />
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <RelatedLinks
          title="Business Energy by Sector"
          links={SECTORS.map((s) => ({ href: `/sectors/${s.slug}`, label: s.label }))}
        />
        <RelatedLinks
          title="Business Energy by Location"
          links={LOCATIONS.map((l) => ({ href: `/locations/${l.slug}`, label: `Business Energy in ${l.label}` }))}
        />
        <RelatedLinks
          title="Moving Premises or Starting Up?"
          links={TRIGGER_PAGES.map((t) => ({ href: `/${t.slug}`, label: t.shortLabel }))}
        />
      </section>
      <CtaBanner />
    </>
  );
}
