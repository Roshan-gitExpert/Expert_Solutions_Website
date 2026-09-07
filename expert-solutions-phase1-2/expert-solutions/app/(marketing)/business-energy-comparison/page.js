import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import HowItWorks from '@/components/HowItWorks';
import WhatWeNeed from '@/components/WhatWeNeed';
import Benefits from '@/components/Benefits';
import Faq from '@/components/Faq';
import CtaBanner from '@/components/CtaBanner';

export const metadata = {
  title: 'Business Energy Comparison | Compare UK Commercial Energy Options',
  description:
    'Compare business energy options side by side. See how your current electricity and gas contract compares before you renew.',
  alternates: { canonical: '/business-energy-comparison' },
};

const steps = [
  { step: '1', title: 'Share your current details', desc: 'Tell us your postcode, current supplier and contract end date.' },
  { step: '2', title: 'We compare the market', desc: 'Your details are checked against options available from UK business energy suppliers.' },
  { step: '3', title: 'We explain what we find', desc: 'A specialist calls you to talk through the comparison in plain English.' },
];

const faqs = [
  { q: 'How does a business energy comparison work?', a: 'We take your current contract details - such as supplier, rate and renewal date - and compare them against other options available in the market, then explain what we find.' },
  { q: 'Do I need to already have a quote to compare?', a: 'No. We can start a comparison using your current contract details, even without an existing quote from another supplier.' },
  { q: 'Is the comparison independent?', a: 'We review options from the UK business energy suppliers we work with. [List of specific suppliers to be confirmed and added once supplied.]' },
  { q: 'Will comparing my energy affect my current contract?', a: 'No. Requesting a comparison does not change or affect your existing contract - nothing happens unless you decide to proceed.' },
  { q: 'How long does a comparison take?', a: 'The initial form takes about two minutes. A specialist will then be in touch to talk through your results.' },
];

export default function BusinessEnergyComparisonPage() {
  return (
    <>
      <Hero
        title="Compare Business Energy Options Side by Side"
        subtitle="See how your current business electricity and gas contract compares before you renew. Free, no-obligation comparison."
        formVariant="business-energy-comparison"
      />
      <TrustBar />
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          Why Compare Before You Renew?
        </h2>
        <p className="mt-4 text-navy-500">
          Many businesses renew their energy contract with their existing
          supplier by default, without checking what else is available.
          A comparison gives you a clearer picture of your current position
          relative to the wider market, so any decision you make is an
          informed one.
        </p>
      </section>
      <HowItWorks steps={steps} title="How Our Comparison Process Works" />
      <WhatWeNeed />
      <Benefits
        title="What You Get From a Comparison"
        benefits={[
          { title: 'Clear current-position summary', desc: 'Understand where your existing contract sits before deciding anything.' },
          { title: 'Multiple options considered', desc: 'Your details are checked against a range of UK business energy suppliers.' },
          { title: 'No pressure to switch', desc: 'A comparison is informational - the decision on what happens next is yours.' },
          { title: 'Support for multi-site businesses', desc: 'Comparisons can be run across more than one site if needed.' },
          { title: 'A named specialist contact', desc: 'One person to talk to about your results, not a call centre queue.' },
          { title: 'Fast turnaround', desc: 'We aim to get back to you promptly once your details are submitted.' },
        ]}
      />
      <Faq faqs={faqs} title="Business Energy Comparison - Frequently Asked Questions" />
      <CtaBanner
        title="Start Your Free Business Energy Comparison"
        subtitle="Takes about two minutes - see how your current contract compares."
      />
    </>
  );
}
