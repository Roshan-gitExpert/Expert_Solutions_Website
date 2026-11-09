import siteConfig from '@/lib/config';
import CookieSettingsButton from '@/components/CookieSettingsButton';

export const metadata = {
  title: 'Cookie Policy',
  description: `Cookie policy for ${siteConfig.companyName}, explaining how we use cookies and similar technologies.`,
  alternates: { canonical: '/cookie-policy' },
};

export default function CookiePolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-navy-900">Cookie Policy</h1>
      <p className="mt-2 text-sm text-navy-400">Last updated: 9 November 2026</p>

      <div className="prose-sm mt-8 space-y-6 text-navy-600">
        <p>
          This website uses cookies and similar browser storage to work
          properly and, only if you allow it, to understand how the site is
          used and how our Google Ads campaigns perform. Non-essential
          cookies are off until you make a choice. You can change your
          choice at any time: <CookieSettingsButton className="text-teal-600 underline" />.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Strictly necessary (always on)</h2>
        <p>
          Remembers your cookie choice (<code>es_consent_v1</code>) and the
          confirmation of an enquiry you have just sent
          (<code>es_last_lead</code>). These do not need your consent.
          Sending an enquiry, and us saving and emailing it to our team,
          always works whatever you choose below.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Analytics (only with your permission)</h2>
        <p>
          With your permission, Microsoft Clarity records how visitors use
          this site (for example mouse movement, scrolling and clicks) to
          help us improve it, and may use session recordings and heatmaps
          for that purpose. Clarity automatically masks text typed into
          form fields, and we additionally mask our whole enquiry form as
          an extra precaution. We also keep a random visitor ID
          (<code>es_visitor_id_v1</code>) and a session record
          (<code>es_session_v1</code>) of our own, so we can understand
          visits to our own site. None of this is a substitute for proper
          anonymisation - masking and pseudonymising reduce what is
          exposed, they do not guarantee nobody could ever be identified.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Advertising (only with your permission)</h2>
        <p>
          With your permission, Google Ads measurement may set cookies such
          as <code>_gcl_au</code> and <code>_gcl_aw</code> (typically kept
          up to 90 days) to tell us whether an advert led to an enquiry. We
          also store which advert or search term brought you here
          (<code>es_attribution_v1</code>, including a Google Click ID and
          UTM parameters). If you provide a phone number through our
          enquiry form, it may be used, in a one-way hashed (pseudonymised,
          not anonymous) form, to help Google match an enquiry back to the
          ad that generated it - this is for advertising measurement only,
          and only happens with your advertising consent. Google may
          receive information such as your IP address and the pages you
          visit as part of this; see{' '}
          <a href="https://policies.google.com/technologies/partner-sites" className="text-teal-600 underline">
            how Google uses data from sites that use its services
          </a>
          . We do not promise that no information is ever shared with
          Google - what is shared, and when, is exactly what is described
          on this page and depends on the choice you make.
        </p>
        <p>
          If you do not allow analytics or advertising cookies, the Google
          Ads and Clarity tags still load on the page, but operate in a
          restricted mode: no advertising or analytics cookies are set, and
          only limited, non-identifying signals may still be sent (for
          example, that a page was visited, without anything that
          identifies you).
        </p>

        <h2 className="text-lg font-bold text-navy-900">Approximate Location and Device Information</h2>
        <p>
          Separately from cookies, our server automatically notes the
          approximate country, region and city your visit appears to come
          from (not a precise physical address), along with basic device
          and browser information, for every visit. This is used to
          understand genuine traffic and to help dispute invalid or
          fraudulent ad clicks, and is only ever visible to our own
          authorised staff - it is never shown publicly or to any other
          website visitor.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Managing Cookies</h2>
        <p>
          Use <CookieSettingsButton className="text-teal-600 underline" /> above or
          in the footer of any page to accept, reject, or change your
          choice at any time; withdrawing a category removes what it
          previously stored on your device. You can also control or delete
          cookies through your own browser settings.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Contact Us</h2>
        <p>
          Questions about this policy can be sent to {siteConfig.companyEmail}.
        </p>

        <p className="text-sm text-navy-400">
          [This page describes what the site actually does as implemented.
          It should still be reviewed by a qualified legal adviser before
          being relied on as a complete, compliant policy.]
        </p>
      </div>
    </section>
  );
}
