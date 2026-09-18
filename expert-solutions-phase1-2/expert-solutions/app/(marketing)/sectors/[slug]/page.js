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
import { SECTORS, CORE_PAGES } from '@/lib/seoData';
import { SECTOR_CONTENT } from '@/lib/sectorContent';

export function generateStaticParams() {
  return SECTORS.map((sector) => ({ slug: sector.slug }));
}

function getSector(slug) {
  return SECTORS.find((s) => s.slug === slug);
}

export function generateMetadata({ params }) {
  const sector = getSector(params.slug);
  if (!sector) return {};
  return {
    title: `Business Energy for ${sector.label} | UK Commercial Energy`,
    description: `Business electricity and gas guidance for UK ${sector.label.toLowerCase()}. ${sector.summary} Free, no-obligation review.`,
    alternates: { canonical: `/sectors/${sector.slug}` },
  };
}

export default function SectorPage({ params }) {
  const sector = getSector(params.slug);
  if (!sector) notFound();

  const content = SECTOR_CONTENT[sector.slug];

  return (
    <>
      <Breadcrumbs items={[{ label: 'Sectors', href: '/sectors' }]} current={sector.label} />
      <ServiceSchema
        name={`Business Energy for ${sector.label}`}
        description={`UK business electricity and gas comparison and brokerage guidance tailored to ${sector.label.toLowerCase()}.`}
      />
      <Hero
        eyebrow={sector.label}
        title={`Business Energy for ${sector.label}`}
        subtitle={`${sector.summary} Get a free review tailored to how your business actually uses energy.`}
        formVariant={`sector-${sector.slug}`}
      />
      <TrustBar />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          How {sector.label} Typically Use Energy
        </h2>
        <p className="mt-4 text-navy-500">{content.intro}</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {content.usagePoints.map((point) => (
            <div key={point.title} className="rounded-2xl border border-navy-100 p-6">
              <h3 className="text-base font-bold text-navy-900">{point.title}</h3>
              <p className="mt-2 text-sm text-navy-500">{point.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <HowItWorks />
      <WhatWeNeed />
      <Faq faqs={content.faqs} title={`${sector.label} - Frequently Asked Questions`} />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <RelatedLinks
          title="Other Sectors We Help"
          links={SECTORS.filter((s) => s.slug !== sector.slug).map((s) => ({
            href: `/sectors/${s.slug}`,
            label: s.label,
          }))}
        />
        <RelatedLinks
          title="Related Business Energy Pages"
          links={CORE_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.label }))}
        />
      </section>

      <CtaBanner
        title={`Get a Free Energy Review for Your ${sector.label.replace(/s$/, '')} Business`}
        subtitle="Speak to a specialist about your business electricity and gas options."
      />
    </>
  );
}
