import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import HowItWorks from '@/components/HowItWorks';
import WhatWeNeed from '@/components/WhatWeNeed';
import Faq from '@/components/Faq';
import CtaBanner from '@/components/CtaBanner';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedLinks from '@/components/RelatedLinks';
import ServiceSchema from '@/components/ServiceSchema';
import { LOCATIONS, CORE_PAGES, SECTORS } from '@/lib/seoData';

export function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ slug: loc.slug }));
}

function getLocation(slug) {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function generateMetadata({ params }) {
  const loc = getLocation(params.slug);
  if (!loc) return {};
  return {
    title: `Business Energy in ${loc.label} | Local DNO & Commercial Energy`,
    description: `Business electricity and gas guidance for ${loc.label} businesses, including local distribution network operator (DNO) details for ${loc.region}.`,
    alternates: { canonical: `/locations/${loc.slug}` },
  };
}

export default function LocationPage({ params }) {
  const loc = getLocation(params.slug);
  if (!loc) notFound();

  const faqs = [
    {
      q: `Who is the electricity distribution network operator (DNO) for ${loc.label}?`,
      a: `${loc.dnoOperator} owns and maintains the electricity distribution network across ${loc.dnoRegion} (DNO area ${loc.dnoCode}), which covers ${loc.label}. This is separate from your energy supplier - the DNO is responsible for the physical network, faults and new connections, while your supplier bills you for the energy used.`,
    },
    {
      q: `Do I need to contact ${loc.dnoOperator} directly for a new business connection?`,
      a: `New connections, upgrades or reporting a power cut in the ${loc.dnoRegion} area are generally handled by the DNO (${loc.dnoOperator}) rather than your energy supplier. A specialist can help you understand which organisation to approach for your specific situation.`,
    },
    {
      q: `Does my choice of supplier depend on which DNO covers ${loc.label}?`,
      a: `No - you can generally choose any UK business energy supplier regardless of which DNO covers your area. The DNO manages the local network; your supplier is a separate, competitive choice.`,
    },
    {
      q: `Can you help businesses based outside ${loc.label} too?`,
      a: `Yes - we work with UK businesses nationwide, not just in ${loc.label}. See our locations page for other areas, or get in touch regardless of where your business is based.`,
    },
  ];

  return (
    <>
      <Breadcrumbs items={[{ label: 'Locations', href: '/locations' }]} current={loc.label} />
      <ServiceSchema
        name={`Business Energy Comparison in ${loc.label}`}
        description={`UK business electricity and gas comparison and brokerage guidance for businesses in ${loc.label}, ${loc.region}.`}
      />
      <Hero
        eyebrow={loc.region}
        title={`Business Energy in ${loc.label}`}
        subtitle={`Compare business electricity and gas options if your business is based in ${loc.label}. Free, no-obligation review from a UK specialist.`}
        formVariant={`location-${loc.slug}`}
      />
      <TrustBar />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          Your Local Electricity Network in {loc.label}
        </h2>
        <p className="mt-4 text-navy-500">
          Electricity in {loc.label} is distributed over the local network
          owned and maintained by <strong>{loc.dnoOperator}</strong>, the
          Distribution Network Operator (DNO) for {loc.dnoRegion} (DNO area{' '}
          {loc.dnoCode}). This is a separate organisation from whichever
          supplier bills your business for the electricity it uses - the
          DNO is responsible for the physical wires, substations, new
          connections and power cuts, regardless of which supplier you
          choose.
        </p>
        <p className="mt-4 text-navy-500">
          Knowing your local DNO is useful if you are arranging a new
          connection, reporting a supply fault, or simply want to
          understand how the network in your area is organised - none of
          which affects your freedom to choose a competitive business
          energy supplier.
        </p>

        <div className="mt-8 grid gap-4 rounded-2xl border border-navy-100 p-6 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-navy-400">DNO Operator</dt>
            <dd className="mt-1 text-base font-bold text-navy-900">{loc.dnoOperator}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-navy-400">DNO Region</dt>
            <dd className="mt-1 text-base font-bold text-navy-900">{loc.dnoRegion}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-navy-400">DNO Area Code</dt>
            <dd className="mt-1 text-base font-bold text-navy-900">{loc.dnoCode}</dd>
          </div>
        </div>
      </section>

      <HowItWorks />
      <WhatWeNeed />
      <Faq faqs={faqs} title={`Business Energy in ${loc.label} - Frequently Asked Questions`} />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <RelatedLinks
          title="Other Locations We Cover"
          links={LOCATIONS.filter((l) => l.slug !== loc.slug).map((l) => ({
            href: `/locations/${l.slug}`,
            label: l.label,
          }))}
        />
        <RelatedLinks
          title="Business Energy by Sector"
          links={SECTORS.map((s) => ({ href: `/sectors/${s.slug}`, label: s.label }))}
        />
        <RelatedLinks
          title="Related Business Energy Pages"
          links={CORE_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.label }))}
        />
      </section>

      <CtaBanner
        title={`Get a Free Business Energy Review in ${loc.label}`}
        subtitle="Speak to a specialist about your business electricity and gas options."
      />
    </>
  );
}
