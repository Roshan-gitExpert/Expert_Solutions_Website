import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import HowItWorks from '@/components/HowItWorks';
import WhatWeNeed from '@/components/WhatWeNeed';
import Benefits from '@/components/Benefits';
import Faq from '@/components/Faq';
import CtaBanner from '@/components/CtaBanner';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedLinks from '@/components/RelatedLinks';
import ServiceSchema from '@/components/ServiceSchema';
import { CORE_PAGES, TRIGGER_PAGES } from '@/lib/seoData';

export const metadata = {
  title: 'Business Energy for a New Branch | Multi-Site Expansion',
  description:
    'Opening a new branch or additional site? Understand how to add a new premises to your business energy set-up without disrupting existing sites.',
  alternates: { canonical: '/business-energy-new-branch' },
};

const faqs = [
  {
    q: 'Can I add a new branch to my existing energy contract?',
    a: 'It depends on your current supplier and contract type. Some multi-site businesses use a shared framework agreement that a new site can join; others need a standalone contract for the new premises. A specialist can explain which applies to your situation.',
  },
  {
    q: 'Should a new branch have the same renewal date as my other sites?',
    a: 'Not automatically - a new site will usually have its own contract start date. Some multi-site businesses choose to align renewal dates across sites over time to simplify admin, while others keep each site’s dates independent. Both are valid approaches depending on your preference.',
  },
  {
    q: 'What if my new branch doesn’t have a live energy supply yet?',
    a: 'A newly built or long-vacant unit may need a new connection or reactivation before a supply contract can start. It helps to confirm this with the landlord or developer as early as possible.',
  },
  {
    q: 'Do you only work with single-site businesses?',
    a: 'No - we work with both single-site and multi-site UK businesses, including those adding new branches to an existing portfolio.',
  },
  {
    q: 'Can I get one point of contact across all my sites?',
    a: 'This is something a specialist can talk through with you, including whether consolidating your sites with a single supplier or account manager makes sense for your business.',
  },
];

export default function NewBranchPage() {
  return (
    <>
      <Breadcrumbs items={[]} current="Business Energy for a New Branch" />
      <ServiceSchema
        name="Business Energy Support for New Branches and Expansion"
        description="Support for UK multi-site businesses opening a new branch or additional premises, including adding a site to an existing energy set-up."
      />
      <Hero
        eyebrow="New Branch / Expansion"
        title="Business Energy for a New Branch or Additional Site"
        subtitle="Expanding to a new location? We help you add a new branch to your energy set-up - whether that's your second site or your twentieth."
        formVariant="new-branch"
      />
      <TrustBar />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          Adding a New Site to a Growing Business
        </h2>
        <p className="mt-4 text-navy-500">
          Opening an additional branch means making a decision about how
          that new site’s energy fits alongside the ones you already
          operate. Some businesses prefer to bring a new site under an
          existing multi-site arrangement with the same supplier; others
          treat each new branch as its own standalone contract, particularly
          if the new premises has very different usage needs.
        </p>
        <p className="mt-4 text-navy-500">
          Either way, the earlier you start looking at the new site’s
          energy - ideally before it opens - the more time there is to avoid
          a deemed rate or a rushed decision in the run-up to launch day.
        </p>
      </section>

      <HowItWorks
        title="Adding a Branch to Your Energy Portfolio"
        steps={[
          {
            step: '1',
            title: 'Tell us about the new site',
            desc: 'Address, opening date, and roughly how it will be used (opening hours, equipment, etc).',
          },
          {
            step: '2',
            title: 'We look at your existing set-up',
            desc: 'Whether the new site can join an existing framework or needs its own contract.',
          },
          {
            step: '3',
            title: 'We help you decide and get it moving',
            desc: 'A recommendation that fits how you want to manage energy across your whole business.',
          },
        ]}
      />

      <WhatWeNeed
        items={[
          'New branch address and planned opening date',
          'A contact name, phone number and business email',
          'Details of your existing sites and supplier(s), if applicable',
          'Whether the new premises has a live energy supply already',
          'Roughly how the new site will use electricity and/or gas',
        ]}
      />

      <Benefits
        title="How We Help Growing, Multi-Site Businesses"
        intro="Every new branch is a chance to either simplify or complicate your energy admin - we help you choose the former."
        benefits={[
          { title: 'Portfolio view', desc: 'We can look at your new branch alongside your existing sites, not in isolation.' },
          { title: 'Framework or standalone', desc: 'Clear guidance on whether joining an existing arrangement or a new contract suits the site better.' },
          { title: 'Timed for launch', desc: 'We help you get energy moving ahead of your opening date wherever possible.' },
          { title: 'Consolidation options', desc: 'A specialist can talk through the pros and cons of aligning renewal dates across sites.' },
          { title: 'Single point of contact', desc: 'One conversation covering the new branch, without you having to start from scratch each time.' },
          { title: 'No obligation', desc: 'A review of your options does not commit your business to switching.' },
        ]}
      />

      <Faq faqs={faqs} title="New Branch Energy - Frequently Asked Questions" />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <RelatedLinks
          title="Other Business Moves We Help With"
          links={TRIGGER_PAGES.filter((t) => t.slug !== 'business-energy-new-branch').map((t) => ({
            href: `/${t.slug}`,
            label: t.shortLabel,
          }))}
        />
        <RelatedLinks
          title="Related Business Energy Pages"
          links={CORE_PAGES.map((p) => ({ href: `/${p.slug}`, label: p.label }))}
        />
      </section>

      <CtaBanner
        title="Opening a New Branch?"
        subtitle="Speak to a specialist about adding your new site to your business energy set-up."
      />
    </>
  );
}
