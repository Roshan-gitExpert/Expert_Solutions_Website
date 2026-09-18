import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import HowItWorks from '@/components/HowItWorks';
import WhatWeNeed from '@/components/WhatWeNeed';
import Benefits from '@/components/Benefits';
import Faq from '@/components/Faq';
import CtaBanner from '@/components/CtaBanner';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedLinks from '@/components/RelatedLinks';
import { CORE_PAGES, SECTORS } from '@/lib/seoData';

export const metadata = {
  title: 'Business Energy Broker | UK Commercial Energy Intermediary',
  description:
    'What does a business energy broker do? Learn how Expert Solutions works as a UK commercial energy intermediary, and how we are paid.',
  alternates: { canonical: '/business-energy-broker' },
};

const faqs = [
  { q: 'What does a business energy broker do?', a: 'A business energy broker (or intermediary) helps businesses review and compare commercial electricity and gas options across suppliers, without the business needing to contact each supplier directly.' },
  { q: 'How does a broker get paid?', a: 'Brokers are typically paid a commission by the supplier once a business proceeds with a contract, rather than charging the business directly. [Specific commission/remuneration details to be confirmed and added once supplied.]' },
  { q: 'Does using a broker cost my business anything?', a: 'Requesting a review through us does not cost your business anything directly.' },
  { q: 'Are you tied to one supplier?', a: 'We work with a panel of UK business energy suppliers rather than a single supplier. [Full supplier panel list to be confirmed and added once supplied.]' },
  { q: 'Why use a broker instead of contacting suppliers myself?', a: 'A broker can save you time by reviewing multiple options in one conversation, and can help explain contract terms in plain English.' },
];

export default function BusinessEnergyBrokerPage() {
  return (
    <>
      <Breadcrumbs items={[]} current="Business Energy Broker" />
      <Hero
        title="Your UK Business Energy Broker"
        subtitle="We help UK businesses review and compare commercial electricity and gas options - clearly, and with no obligation."
        formVariant="business-energy-broker"
      />
      <TrustBar />
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          What Is a Business Energy Broker?
        </h2>
        <p className="mt-4 text-navy-500">
          A business energy broker acts as an intermediary between your
          business and the energy market, helping you review commercial
          electricity and gas options without needing to contact each
          supplier individually. As a broker, we do not generate or supply
          energy ourselves - we help you understand your position and the
          options available.
        </p>
        <h3 className="mt-8 text-lg font-bold text-navy-900">How We Get Paid</h3>
        <p className="mt-2 text-navy-500">
          We aim to be transparent about how our service works. [Detailed,
          verified explanation of commission/remuneration arrangements to be
          added here once supplied by the business - placeholder only, no
          figures have been invented.]
        </p>
      </section>
      <HowItWorks />
      <WhatWeNeed />
      <Benefits
        title="Why Work With a Broker"
        benefits={[
          { title: 'Saves you time', desc: 'One conversation instead of contacting multiple suppliers yourself.' },
          { title: 'Plain-English explanations', desc: 'We explain contract terms so you can make an informed decision.' },
          { title: 'Works across sectors', desc: 'Hotels, restaurants, retail, offices, warehouses and more.' },
          { title: 'Multi-site support', desc: 'Helpful if your business manages energy across several locations.' },
          { title: 'Transparent process', desc: 'We are clear that we act as an intermediary, not a supplier.' },
          { title: 'No obligation', desc: 'Speaking with a broker does not commit you to switching or renewing.' },
        ]}
      />
      <Faq faqs={faqs} title="Business Energy Broker - Frequently Asked Questions" />
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <RelatedLinks
          title="Business Energy by Sector"
          links={SECTORS.map((s) => ({ href: `/sectors/${s.slug}`, label: s.label }))}
        />
        <RelatedLinks
          title="Related Business Energy Pages"
          links={CORE_PAGES.filter((p) => p.slug !== 'business-energy-broker').map((p) => ({ href: `/${p.slug}`, label: p.label }))}
        />
      </section>
      <CtaBanner
        title="Talk to a Business Energy Broker"
        subtitle="Get a free, no-obligation review of your commercial energy options."
      />
    </>
  );
}
