import siteConfig from '@/lib/config';
import CookieSettingsButton from '@/components/CookieSettingsButton';

export default function QuoteCookiePolicy() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-navy-900">Cookie Policy</h1>
      <p className="mt-2 text-sm text-navy-400">Last updated: 4 November 2026</p>

      <div className="prose-sm mt-8 space-y-6 text-navy-600">
        <p>
          This website uses cookies and similar browser storage to work
          properly and, only if you allow it, to understand how the site is
          used and how our Google Ads campaigns perform. Non-essential
          cookies are off until you choose. You can change your choice at
          any time:{' '}
          <CookieSettingsButton className="text-teal-600 underline" />.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Strictly necessary (always on)</h2>
        <p>
          Remembers your cookie choice (<code>es_consent_v1</code>) and the
          confirmation of an enquiry you have just sent (<code>es_last_lead</code>).
          These do not need consent. Sending an enquiry works whatever you choose.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Analytics (only with your permission)</h2>
        <p>
          Google Analytics 4 sets <code>_ga</code> and <code>_ga_&lt;ID&gt;</code>
          (up to 2 years) to count visits and see which pages are used. We
          also keep a random visitor ID (<code>es_visitor_id_v1</code>) and a
          session record (<code>es_session_v1</code>) so we can understand
          visits to our own site.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Advertising (only with your permission)</h2>
        <p>
          Google Ads measurement may set <code>_gcl_au</code>, <code>_gcl_aw</code>
          and similar cookies (typically up to 90 days) to tell us whether an
          advert led to an enquiry. We also store which advert or search term
          brought you here (<code>es_attribution_v1</code>, including Google
          Click ID and UTM parameters). Google may receive data such as your
          IP address and the pages you visit; see{' '}
          <a href="https://policies.google.com/technologies/partner-sites" className="text-teal-600 underline">
            how Google uses data from sites that use its services
          </a>.
        </p>
        <p>
          If you do not allow these, Google may still receive limited,
          non-identifying signals (for example that a page was visited) to
          support measurement, but no advertising or analytics cookies are set.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Managing Cookies</h2>
        <p>
          Use "Cookie settings" above or in the footer to accept, reject or
          change categories; withdrawing a category removes what it stored.
          You can also delete cookies in your browser settings.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Contact Us</h2>
        <p>
          Questions about this policy can be sent to {siteConfig.companyEmail}.
        </p>
      </div>
    </section>
  );
}
