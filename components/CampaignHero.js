import ClickToCallGroup from './ClickToCallGroup';
import DeepFakeLeadForm from './DeepFakeLeadForm';

// Hero for every /campaign/[slug] synthetic-media landing page.
// Deliberately separate from components/Hero.js (used by the PPC
// pages) because the content above the form is different in kind -
// a hook-driven video, not a multi-step form - even though the
// visual language (navy background, amber CTA) matches the rest of
// the site on purpose.
//
// `videoUrl` is optional. Until a campaign's AI video has actually
// been produced, this renders a clean placeholder instead of a
// broken <video> tag, so a campaign page is always safe to publish.
export default function CampaignHero({ campaign, videoUrl }) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:py-20 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <span className="inline-block rounded-full bg-teal-500/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-teal-300">
            {campaign.eyebrow}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            {campaign.headline}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-navy-200">{campaign.subtitle}</p>

          <div className="mt-6 aspect-[9/16] max-w-xs overflow-hidden rounded-2xl border border-navy-700 bg-navy-950 sm:max-w-sm">
            {videoUrl ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video
                src={videoUrl}
                controls
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                <span className="rounded-full bg-teal-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-300">
                  Video in production
                </span>
                <p className="text-sm font-semibold text-white">&ldquo;{campaign.script.hook}&rdquo;</p>
                <p className="text-xs text-navy-400">
                  This campaign&apos;s AI presenter video is being produced. The form below is fully live.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="#lead-form"
              className="rounded-lg bg-amber-500 px-6 py-4 text-center text-base font-bold text-navy-950 shadow-card transition hover:bg-amber-400"
            >
              See What You Could Save
            </a>
          </div>
          <ClickToCallGroup location={`campaign-${campaign.slug}`} className="mt-4" />
        </div>

        <div id="lead-form" className="scroll-mt-24">
          <DeepFakeLeadForm
            campaignSlug={campaign.slug}
            campaignName={campaign.campaignName}
            aiVideoId={campaign.aiVideoId || null}
          />
        </div>
      </div>
    </section>
  );
}
