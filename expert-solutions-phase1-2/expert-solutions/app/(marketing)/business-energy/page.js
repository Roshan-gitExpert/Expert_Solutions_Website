import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import HowItWorks from '@/components/HowItWorks';
import WhatWeNeed from '@/components/WhatWeNeed';
import Benefits from '@/components/Benefits';
import Faq from '@/components/Faq';
import CtaBanner from '@/components/CtaBanner';

export const metadata = {
  title: 'Business Energy | Compare Electricity & Gas for UK Companies',
  description:
    'Business energy made simple. Compare commercial electricity and gas options for your UK business and get a free, no-obligation energy review.',
  alternates: { canonical: '/business-energy' },
};

const benefits = [
  { title: 'One point of contact', desc: 'Manage electricity and gas together instead of dealing with multiple suppliers separately.' },
  { title: 'Renewal tracking', desc: 'We help flag when your business energy contract is approaching its end date.' },
  { title: 'Works for any sector', desc: 'From offices to warehouses, hotels to care homes - we work with all types of UK business.' },
  { title: 'Multi-site friendly', desc: 'Whether you run one site or several, we can look at your energy as a whole.' },
  { title: 'No-obligation review', desc: 'Getting a review of your options does not commit your business to anything.' },
  { title: 'Support with paperwork', desc: 'We help make switching or renewing as straightforward as possible.' },
];

const faqs = [
  { q: 'What is business energy?', a: 'Business energy refers to the electricity and gas supplied to non-domestic premises such as offices, shops, factories and other commercial buildings, usually billed under commercial contract terms rather than domestic tariffs.' },
  { q: 'Is business energy priced differently to domestic energy?', a: 'Yes. Business energy contracts are typically negotiated individually or via a broker, with pricing based on your usage profile, contract length, and current market rates - unlike the price cap that applies to domestic tariffs.' },
  { q: 'Can I compare electricity and gas together?', a: 'Yes - many UK businesses use both. We can review electricity and gas together, or just one, depending on what your business needs.' },
  { q: 'Do you cover businesses across the whole of the UK?', a: 'Yes, we work with UK commercial energy customers across England, Scotland, Wales and Northern Ireland, subject to supplier coverage in your area.' },
  { q: 'What if I do not know my current usage?', a: 'That is fine. We can start with what you know - such as your postcode and current supplier - and build from there.' },
];

export default function BusinessEnergyPage() {
  return (
    <>
      <Hero
        title="Business Energy Made Simple for UK Companies"
        subtitle="Compare your business electricity and gas costs in one place. Get a free, no-obligation commercial energy review from a UK specialist."
        formVariant="business-energy"
      />
      <TrustBar />
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          Business Energy, Handled Properly
        </h2>
        <p className="mt-4 text-navy-500">
          Business energy is one of the biggest fixed costs for many UK
          companies, yet it is often reviewed only once - when the business
          first moves premises or signs its first contract. From there,
          contracts can silently roll over onto out-of-contract rates.
          Reviewing your business energy ahead of renewal gives you the
          chance to understand your current position and see what other
          options exist in the market.
        </p>
        <p className="mt-4 text-navy-500">
          Whether you are running a single office or a multi-site operation
          across hotels, retail units, warehouses or care homes, our
          specialists can talk you through electricity, gas, or both, in
          plain English.
        </p>
      </section>
      <HowItWorks />
      <WhatWeNeed />
      <Benefits title="Why Businesses Review Their Energy With Us" benefits={benefits} />
      <Faq faqs={faqs} title="Business Energy - Frequently Asked Questions" />
      <CtaBanner />
    </>
  );
}
