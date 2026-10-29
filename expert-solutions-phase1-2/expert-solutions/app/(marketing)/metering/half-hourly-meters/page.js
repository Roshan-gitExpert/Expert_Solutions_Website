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

// Rollout dates/figures (MHHS migration starting 22 Oct 2025, ~18-month
// programme, ~80% migrated by Oct 2026, final supplier migration
// deadline 7 May 2027, ~67% of non-domestic meters smart/advanced as of
// Q1 2026) are drawn from Elexon/Ofgem-sponsored MHHS programme
// reporting as published - treated as a live, moving programme rather
// than a fixed one-off fact, since the rollout continues to progress.

const HALF_HOURLY_METER_FAQS = [
  {
    q: 'What is a half-hourly (HH) meter?',
    a: 'A half-hourly meter records electricity use in 30-minute intervals rather than through an estimated usage pattern. Historically, this was mainly used for larger commercial and industrial sites.',
  },
  {
    q: 'What is Market-wide Half-Hourly Settlement (MHHS)?',
    a: 'MHHS is an Ofgem-sponsored reform, delivered by Elexon, requiring every electricity meter in Great Britain to eventually be settled in 30-minute periods - moving the whole market away from estimate-based settlement for smaller sites. It applies to electricity only; gas is not part of this programme.',
  },
  {
    q: 'Do I need to do anything to get a half-hourly / smart meter installed?',
    a: 'For most businesses, no - suppliers are responsible for migrating eligible meters as part of the MHHS rollout, and you do not need to request a switch or change supplier for this to happen. If you do not yet have a smart or advanced meter, it is worth asking your supplier where your premises sits in their migration plan.',
  },
  {
    q: 'What is the rollout timeline?',
    a: 'Central MHHS systems went live in 2025, with meter migration beginning on 22 October 2025 and running for roughly 18 months. The programme has targeted around 80% of meters migrated by October 2026, with all suppliers required to have migrated all remaining MPANs by 7 May 2027. These are programme milestones and can shift - check current status with your supplier for your specific site.',
  },
  {
    q: 'How many business meters are still affected?',
    a: 'Industry reporting around Q1 2026 put roughly two-thirds of non-domestic electricity meters on a smart or advanced meter already, meaning a significant number of smaller business meters (reported at around 3 million) were still being settled on estimates rather than actual half-hourly readings at that point - the proportion continues to fall as migration progresses.',
  },
];

export const metadata = {
  title: 'Half-Hourly Meter Installation Commercial Property Guidelines | Expert Solutions',
  description:
    'What a half-hourly (HH) meter is, how Market-wide Half-Hourly Settlement (MHHS) affects commercial electricity meters, and the current UK rollout timeline.',
  alternates: { canonical: '/metering/half-hourly-meters' },
};

export default function HalfHourlyMetersPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Metering', href: '/metering/half-hourly-meters' }]} current="Half-Hourly Meter Installation" />
      <ServiceSchema
        name="Half-Hourly Meter Guidance for Commercial Property"
        description="Guidance on half-hourly electricity metering and the Market-wide Half-Hourly Settlement (MHHS) rollout for UK commercial premises."
      />

      <Hero
        eyebrow="Metering"
        title="Half-Hourly Meter Installation: Commercial Property Guidelines"
        subtitle="What a half-hourly meter actually measures, what Market-wide Half-Hourly Settlement means for your business, and where the rollout currently stands."
        formVariant="metering-half-hourly-meters"
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
          Where the MHHS Rollout Currently Stands
        </h2>
        <p className="mt-4 text-navy-500">
          Market-wide Half-Hourly Settlement is a market-wide reform, not an opt-in service -
          suppliers are migrating eligible meters as part of an industry-wide programme rather
          than businesses requesting it individually. The milestones below are programme-level
          figures from Ofgem/Elexon reporting, not a guarantee for any specific site.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Migration began 22 Oct 2025</h3>
            <p className="mt-2 text-sm text-navy-500">Central MHHS systems went live in 2025, with meter-by-meter migration starting from this date over a roughly 18-month programme.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">~80% migrated by October 2026</h3>
            <p className="mt-2 text-sm text-navy-500">Programme reporting has targeted around 80% of in-scope meters being accepted into the new arrangements by this point.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Full migration deadline: 7 May 2027</h3>
            <p className="mt-2 text-sm text-navy-500">All suppliers are required to have migrated every remaining MPAN into half-hourly settlement by this date.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Electricity only</h3>
            <p className="mt-2 text-sm text-navy-500">MHHS is an electricity settlement reform - gas metering and settlement is not part of this programme.</p>
          </div>
        </div>
      </section>

      <HowItWorks />
      <WhatWeNeed />
      <Faq faqs={HALF_HOURLY_METER_FAQS} title="Half-Hourly Meters - Frequently Asked Questions" />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <RelatedLinks
          title="More Metering Guides"
          links={METERING_PAGES.filter((m) => m.slug !== 'half-hourly-meters').map((m) => ({
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
        title="Not Sure Where Your Meter Sits in the Rollout?"
        subtitle="Tell us about your site and a specialist can help you check your current meter and contract options."
      />
    </>
  );
}
