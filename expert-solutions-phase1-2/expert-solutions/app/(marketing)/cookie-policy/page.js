import siteConfig from '@/lib/config';

export const metadata = {
  title: 'Cookie Policy',
  description: `Cookie policy for ${siteConfig.companyName}, explaining how we use cookies and similar technologies.`,
  alternates: { canonical: '/cookie-policy' },
};

export default function CookiePolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-navy-900">Cookie Policy</h1>
      <p className="mt-2 text-sm text-navy-400">Last updated: [Date placeholder]</p>

      <div className="prose-sm mt-8 space-y-6 text-navy-600">
        <p>
          This website uses cookies and similar browser storage technologies
          to help it function correctly and to understand how visitors
          arrive at the site - particularly important for measuring the
          performance of our Google Ads campaigns.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Types of Cookies We Use</h2>
        <p>
          <strong>Strictly necessary:</strong> used to remember information
          such as your progress through our enquiry form during your visit.
        </p>
        <p>
          <strong>Attribution / analytics:</strong> used to record which
          advertisement, search term, or campaign brought you to the site
          (for example, Google Click ID and UTM parameters), so we can
          understand which marketing activity generates genuine enquiries.
        </p>
        <p>
          <strong>Advertising:</strong> [Placeholder - add details of any
          remarketing/advertising cookies once specific tools, such as
          Google Ads remarketing tags, are configured.]
        </p>

        <h2 className="text-lg font-bold text-navy-900">Managing Cookies</h2>
        <p>
          You can control or delete cookies through your browser settings.
          Blocking some cookies may affect how parts of this website
          function, such as our multi-step enquiry form.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Contact Us</h2>
        <p>
          Questions about this policy can be sent to {siteConfig.companyEmail}.
        </p>

        <p className="text-sm text-navy-400">
          [This page is a placeholder policy template. It should be reviewed
          by a qualified legal adviser before the site goes live.]
        </p>
      </div>
    </section>
  );
}
