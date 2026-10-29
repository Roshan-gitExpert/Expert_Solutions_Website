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
import { SECTORS, CORE_PAGES, COMPLIANCE_PAGES } from '@/lib/seoData';

// Standalone long-tail page - deliberately NOT part of the SECTORS array
// (which already has a generic "retail" sector served by
// sectors/[slug]/page.js). This page targets small independent shops
// specifically and the "broker" angle, so it is written as its own
// page rather than duplicating/overriding the existing generic retail
// sector page.

const RETAIL_SHOP_BROKER_FAQS = [
  {
    q: 'What does a commercial electricity broker actually do for a small shop?',
    a: 'A broker compares whole-of-market business electricity contracts on your behalf, handles the paperwork for switching supplier, and - where you ask us to - keeps track of your renewal date so you are not rolled onto a default or out-of-contract rate when your current deal ends.',
  },
  {
    q: 'Is using a broker free for a small retail shop?',
    a: 'Yes - there is no cost to your shop for requesting a review, and brokers are typically paid a commission by the supplier you go on to choose, not by you directly. You are under no obligation to switch after a review.',
  },
  {
    q: 'My shop is quite small - is it still worth comparing contracts?',
    a: 'Generally yes. Every UK business premises needs its own business (non-domestic) energy contract regardless of size, and a small shop can still be moved onto an expensive out-of-contract tariff if a renewal is missed - comparing options costs nothing and takes a couple of minutes.',
  },
  {
    q: 'Can you help if I’m opening a new shop or taking over an existing unit?',
    a: 'Yes. A new unit is usually treated as a new business energy connection, while taking over a unit from a previous retailer is usually treated as a change of tenancy - see our new business and change of tenancy pages for what each involves.',
  },
  {
    q: 'Do you only work with single shops, or multi-store retailers too?',
    a: 'Both - we work with independent shop owners and multi-site retail chains, including businesses adding new stores. See our new branch page for expansion-specific guidance.',
  },
];

export const metadata = {
  title: 'Commercial Electricity Broker for Small Retail Shops | Expert Solutions',
  description:
    'Independent commercial electricity broker helping small UK retail shops compare whole-of-market business electricity contracts. Free, no-obligation review.',
  alternates: { canonical: '/sectors/retail-shops' },
};

export default function RetailShopsBrokerPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Sectors', href: '/sectors' }]} current="Small Retail Shops" />
      <ServiceSchema
        name="Commercial Electricity Broker for Small Retail Shops"
        description="Independent business electricity broker service for small UK retail shops - whole-of-market contract comparison and switching support."
      />

      <Hero
        eyebrow="Small Retail Shops"
        title="A Commercial Electricity Broker Built for Small Retail Shops"
        subtitle="Independent whole-of-market comparison for single-unit and small retail shops - no call centre script, just a specialist who checks your options."
        formVariant="sector-retail-shops-broker"
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
          Why a Small Shop Benefits From a Broker, Not Just a Comparison Site
        </h2>
        <p className="mt-4 text-navy-500">
          Small retail units are often treated as an afterthought by the big energy-comparison
          sites, which are built around high-volume, generic quotes. A broker working with your
          actual usage, meter type and trading hours can check whole-of-market options
          specifically for a shop your size, flag when your current deal is coming up for renewal,
          and handle the switching paperwork so it doesn&apos;t fall on you to chase.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Extended trading hours</h3>
            <p className="mt-2 text-sm text-navy-500">Shops open evenings, weekends or late-night hours have a longer active-usage window than a standard 9-to-5 business, which is worth reflecting in your contract.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Shopfront & window lighting</h3>
            <p className="mt-2 text-sm text-navy-500">Display and window lighting can run well beyond opening hours for visibility and security.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Refrigeration (food retail)</h3>
            <p className="mt-2 text-sm text-navy-500">Chilled and frozen display units in convenience stores and similar outlets run continuously, not just during opening hours.</p>
          </div>
          <div className="rounded-2xl border border-navy-100 p-6">
            <h3 className="text-base font-bold text-navy-900">Single-unit vs multi-site</h3>
            <p className="mt-2 text-sm text-navy-500">A single independent shop and a multi-site chain are typically offered different contract structures - worth checking which applies to you.</p>
          </div>
        </div>
      </section>

      <HowItWorks />
      <WhatWeNeed />

      <section className="bg-navy-950 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="label-eyebrow">Stay In Contract</span>
          <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
            Don&apos;t Get Rolled Onto a Default Rate
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-navy-300">
            If your current electricity contract lapses without a renewal in place, most suppliers
            move you onto a deemed or out-of-contract rate - these typically sit above a negotiated
            rate because there is no agreed contract holding prices down. We flag your renewal
            window so a missed date doesn&apos;t cost you.
          </p>
        </div>
      </section>

      <Faq faqs={RETAIL_SHOP_BROKER_FAQS} title="Commercial Electricity Broker for Retail Shops - Frequently Asked Questions" />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <RelatedLinks
          title="Other Sectors We Help"
          links={SECTORS.map((s) => ({ href: `/sectors/${s.slug}`, label: s.label }))}
        />
        <RelatedLinks
          title="Compliance Guides"
          links={COMPLIANCE_PAGES.map((c) => ({ href: `/compliance/${c.slug}`, label: c.label }))}
        />
        <RelatedLinks
          title="Related Business Energy Pages"
          links={CORE_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.label }))}
        />
      </section>

      <CtaBanner
        title="Get a Free Electricity Comparison for Your Shop"
        subtitle="Speak to a specialist about your business electricity options - takes about two minutes online."
      />
    </>
  );
}
