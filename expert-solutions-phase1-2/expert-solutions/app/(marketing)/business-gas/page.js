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
  title: 'Business Gas Prices | Compare UK Commercial Gas Contracts',
  description:
    'Compare business gas prices for your UK company. Free, no-obligation commercial gas contract review, including renewal and annual consumption guidance.',
  alternates: { canonical: '/business-gas' },
};

const benefits = [
  { title: 'AQ explained', desc: 'We help explain Annual Quantity (AQ) and how it affects your business gas pricing.' },
  { title: 'Kitchen, heating & process use', desc: 'From commercial kitchens to industrial process heat, we work with a wide range of gas usage profiles.' },
  { title: 'Renewal date tracking', desc: 'Helping make sure your business gas contract does not lapse onto a deemed rate.' },
  { title: 'Multi-site gas supply', desc: 'Support for businesses managing gas across more than one site.' },
  { title: 'Clear contract explanations', desc: 'Plain-English guidance on fixed vs variable commercial gas contracts.' },
  { title: 'No obligation', desc: 'A review of your gas options does not commit your business to anything.' },
];

const faqs = [
  { q: 'What is Annual Quantity (AQ) for business gas?', a: 'AQ is an estimate of how much gas your business uses in a year, based on historical consumption. Suppliers use it to help set your commercial gas pricing.' },
  { q: 'Do restaurants and hotels use business gas contracts?', a: 'Yes - commercial kitchens, hotels and similar premises typically use business gas contracts due to their higher and more consistent usage.' },
  { q: 'Can I review gas on its own, without electricity?', a: 'Yes. You can request a review of gas only, electricity only, or both, depending on what your business needs.' },
  { q: 'What if my business gas contract has already ended?', a: 'If your contract has lapsed, you may be on a deemed or out-of-contract rate. A specialist can talk through what that means and your options going forward.' },
  { q: 'How is business gas priced?', a: 'Business gas is typically priced per kWh used, plus a standing charge, similar in structure to business electricity but based on gas consumption and AQ.' },
];

export default function BusinessGasPage() {
  return (
    <>
      <Breadcrumbs items={[]} current="Business Gas" />
      <Hero
        title="Compare Business Gas Prices"
        subtitle="Get a free review of your commercial gas contract - Annual Quantity, unit rates and renewal options explained clearly."
        formVariant="business-gas"
      />
      <TrustBar />
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          Understanding Your Business Gas Contract
        </h2>
        <p className="mt-4 text-navy-500">
          Business gas contracts are priced using your Annual Quantity (AQ)
          - an estimate of your yearly consumption - along with a unit rate
          and standing charge. Businesses with commercial kitchens, heating
          systems, or industrial processes often have higher and more
          consistent gas usage than a typical office.
        </p>
        <p className="mt-4 text-navy-500">
          If you are approaching the end of your current gas contract, or
          unsure what rate you are on, our specialists can help you
          understand your position and the options available.
        </p>
      </section>
      <HowItWorks />
      <WhatWeNeed />
      <Benefits title="What We Help With" benefits={benefits} />
      <Faq faqs={faqs} title="Business Gas - Frequently Asked Questions" />
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
          links={CORE_PAGES.filter((p) => p.slug !== 'business-gas').map((p) => ({ href: `/${p.slug}`, label: p.label }))}
        />
      </section>
      <CtaBanner
        title="Get a Free Business Gas Review"
        subtitle="Speak to a specialist about your commercial gas contract today."
      />
    </>
  );
}
