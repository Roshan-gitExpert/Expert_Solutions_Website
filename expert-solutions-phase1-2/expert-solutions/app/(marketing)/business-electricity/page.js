import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import HowItWorks from '@/components/HowItWorks';
import WhatWeNeed from '@/components/WhatWeNeed';
import Benefits from '@/components/Benefits';
import Faq from '@/components/Faq';
import CtaBanner from '@/components/CtaBanner';

export const metadata = {
  title: 'Business Electricity Prices | Compare UK Commercial Electricity',
  description:
    'Compare business electricity prices for your UK company. Free, no-obligation review covering half-hourly and non-half-hourly commercial electricity contracts.',
  alternates: { canonical: '/business-electricity' },
};

const benefits = [
  { title: 'Half-hourly & non-half-hourly', desc: 'We can talk through options whether your business is on a half-hourly (HH) or non-half-hourly (NHH) meter.' },
  { title: 'Understand standing charges', desc: 'We explain how unit rates and standing charges combine to make up your bill.' },
  { title: 'Contract type guidance', desc: 'Fixed, flexible or deemed rate - we explain what each means for your business.' },
  { title: 'Multi-meter support', desc: 'Businesses with several electricity meters across one or more sites are welcome to enquire.' },
  { title: 'Renewal timing advice', desc: 'We help you understand when to start reviewing ahead of your contract end date.' },
  { title: 'No obligation', desc: 'A review of your electricity options does not commit you to switching.' },
];

const faqs = [
  { q: 'What is a half-hourly (HH) meter?', a: 'A half-hourly meter records electricity usage every 30 minutes and is common for larger businesses with higher consumption. Non-half-hourly (NHH) meters are more typical for smaller businesses.' },
  { q: 'Will you need my MPAN number?', a: 'It can help, but is not essential to get started. Your business postcode and current supplier are often enough for an initial review.' },
  { q: 'Can you help if I am on a deemed or out-of-contract rate?', a: 'Yes. Many businesses end up on these higher rates after a contract lapses without being renewed - we can talk through your options.' },
  { q: 'Do you compare renewable electricity options?', a: 'We can discuss renewable-backed electricity tariffs where suppliers offer them as part of your review.' },
  { q: 'How is business electricity billed?', a: 'Business electricity is usually billed based on a unit rate (pence per kWh) plus a standing charge, set out in your commercial contract.' },
];

export default function BusinessElectricityPage() {
  return (
    <>
      <Hero
        title="Compare Business Electricity Prices"
        subtitle="Get a free review of your commercial electricity contract - unit rates, standing charges and renewal options explained clearly."
        formVariant="business-electricity"
      />
      <TrustBar />
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          Understanding Your Business Electricity Contract
        </h2>
        <p className="mt-4 text-navy-500">
          Business electricity pricing is made up of a unit rate (charged
          per kWh used) and a standing charge (a fixed daily cost regardless
          of usage). The rate your business pays depends on factors such as
          your location, meter type, contract length, and when you last
          agreed terms with a supplier.
        </p>
        <p className="mt-4 text-navy-500">
          If your contract is close to its renewal date, or you are not
          sure what rate you are currently on, a specialist can talk you
          through what to check and what your options may be.
        </p>
      </section>
      <HowItWorks />
      <WhatWeNeed />
      <Benefits title="What We Help With" benefits={benefits} />
      <Faq faqs={faqs} title="Business Electricity - Frequently Asked Questions" />
      <CtaBanner
        title="Get a Free Business Electricity Review"
        subtitle="Speak to a specialist about your commercial electricity contract today."
      />
    </>
  );
}
