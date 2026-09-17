import { notFound } from 'next/navigation';
import CampaignHero from '@/components/CampaignHero';
import TrustBar from '@/components/TrustBar';
import Faq from '@/components/Faq';
import CtaBanner from '@/components/CtaBanner';
import { CAMPAIGNS, getCampaign, getAllCampaignSlugs } from '@/lib/campaigns';

// One dynamic route serves every synthetic-media campaign - the
// content all comes from lib/campaigns.js, so adding a new campaign
// never requires a new page file.
export function generateStaticParams() {
  return getAllCampaignSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const campaign = getCampaign(params.slug);
  if (!campaign) return {};
  return {
    title: `${campaign.headline} | Expert Solutions`,
    description: campaign.subtitle,
    alternates: { canonical: `/campaign/${campaign.slug}` },
  };
}

const SHARED_FAQS = [
  { q: 'Is this service really free for my business?', a: 'Yes. There is no cost to your business for requesting a review of your energy options through this form or by phone.' },
  { q: 'Will I have to switch supplier?', a: 'No. You are under no obligation to switch or take any action after speaking with us.' },
  { q: 'What happens after I submit the form?', a: 'A member of our team reviews your details, researches your business, and a specialist calls you to discuss your options.' },
  { q: 'Do you work with businesses with multiple sites?', a: 'Yes. We review energy across single or multi-site UK businesses.' },
];

export default function CampaignPage({ params }) {
  const campaign = getCampaign(params.slug);
  if (!campaign) notFound();

  const faqs = [campaign.faqIntro, ...SHARED_FAQS];

  return (
    <>
      <CampaignHero campaign={campaign} />
      <TrustBar />
      <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          Why This Matters
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-navy-500">{campaign.whyItMatters}</p>
      </section>
      <Faq faqs={faqs} title={`${campaign.campaignName} - Frequently Asked Questions`} />
      <CtaBanner
        title="See What You Could Save"
        subtitle="Leave your details and we'll check your business energy options for you - no obligation."
      />
    </>
  );
}

// Re-export so other code (e.g. the future master-engine sync job)
// can import the same campaign registry without reaching into this
// page file.
export { CAMPAIGNS };
