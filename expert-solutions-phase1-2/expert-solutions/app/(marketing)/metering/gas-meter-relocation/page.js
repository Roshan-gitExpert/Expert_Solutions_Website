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

// Deliberately gives no fixed "£X to move a gas meter" figure - every
// published source agrees cost depends on site-specific factors (who
// is involved, distance, internal/external routing, pipework
// complexity). Inventing a number here would be worse than being
// honest that a quote is site-specific.

const GAS_METER_RELOCATION_FAQS = [
  {
    q: 'Who is responsible for moving a commercial gas meter?',
    a: 'Several parties can be involved: your energy supplier (your first point of contact, who assesses the request and may set its own relocation charge), your local Gas Network Operator / gas transporter (e.g. Cadent, SGN or Northern Gas Networks - involved for larger moves or anything routing from inside to outside), the appointed meter asset manager (the only party legally permitted to work on the meter itself), and a Gas Safe registered engineer for any internal pipework changes.',
  },
  {
    q: 'How much does it cost to relocate a commercial gas meter?',
    a: 'There is no single UK-wide figure - cost depends on the distance involved, whether the move is internal or external, the complexity of new pipework (digging, structural work), any making-good work (plastering, decorating, brickwork), and labour. Your network operator provides a quotation for larger moves, and it is worth getting more than one quote for any internal pipework.',
  },
  {
    q: 'What is the process, step by step?',
    a: 'Decide why you need to move the meter and choose a new location (considering accessibility, protection from damage and ventilation); tell your energy supplier, who assesses the request; get a quote (your network operator quotes larger moves, you should get multiple quotes for internal pipework); approve the plan and schedule the work, which may involve a temporary gas supply disconnection while the old setup is disconnected, pipework rerouted, the meter reinstalled (often in a protective outdoor box) and the new installation tested for leaks and pressure.',
  },
  {
    q: 'Will my gas supply be interrupted?',
    a: 'Generally yes, temporarily, while the relocation work is carried out - your supplier or network operator will be able to tell you the expected disruption for your specific job.',
  },
  {
    q: 'Does moving the meter change my MPRN?',
    a: 'No - your Meter Point Reference Number identifies the supply at your premises and does not change when the physical meter is relocated or when you switch supplier.',
  },
];

export const metadata = {
  title: 'Cost of Moving a Commercial Gas Meter at UK Premises | Expert Solutions',
  description:
    'Who is responsible for relocating a commercial gas meter, the real process involved, and what actually drives the cost - no invented price, a genuine breakdown of the factors.',
  alternates: { canonical: '/metering/gas-meter-relocation' },
};

export default function GasMeterRelocationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Metering', href: '/metering/gas-meter-relocation' }]} current="Moving a Commercial Gas Meter" />
      <ServiceSchema
        name="Commercial Gas Meter Relocation Guidance"
        description="Guidance on the process and cost factors involved in relocating a commercial gas meter at UK business premises."
      />

      <Hero
        eyebrow="Metering"
        title="Cost of Moving a Commercial Gas Meter at UK Premises"
        subtitle="Who's actually involved, the real step-by-step process, and the genuine factors that drive the cost - there is no single fixed price, and we won't pretend there is."
        formVariant="metering-gas-meter-relocation"
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
          What Drives the Cost (There Is No Fixed Price)
        </h2>
        <p className="mt-4 text-navy-500">
          Every genuine source on this agrees: there is no standard UK price for moving a
          commercial gas meter, because the job depends entirely on your specific site. What
          does consistently affect the cost is set out below - use it to understand a quote
          rather than to estimate one yourself.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Distance moved</h3>
            <p className="mt-2 text-sm text-navy-500">A short move within the same wall is a different job to relocating the meter across the building or outdoors.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Internal vs external</h3>
            <p className="mt-2 text-sm text-navy-500">Moving a meter from inside to an external box generally involves more work than an internal-only relocation.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Pipework complexity</h3>
            <p className="mt-2 text-sm text-navy-500">New pipe runs, digging, or structural changes add cost on top of the meter move itself.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Making good & labour</h3>
            <p className="mt-2 text-sm text-navy-500">Plastering, decorating and brickwork after the work, plus the labour for the move itself, are separate cost lines to budget for.</p>
          </div>
        </div>
      </section>

      <HowItWorks />
      <WhatWeNeed />
      <Faq faqs={GAS_METER_RELOCATION_FAQS} title="Commercial Gas Meter Relocation - Frequently Asked Questions" />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <RelatedLinks
          title="More Metering Guides"
          links={METERING_PAGES.filter((m) => m.slug !== 'gas-meter-relocation').map((m) => ({
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
        title="Planning a Meter Move or Reviewing Your Gas Contract?"
        subtitle="Speak to a specialist about your site and current contract - takes about two minutes online."
      />
    </>
  );
}
