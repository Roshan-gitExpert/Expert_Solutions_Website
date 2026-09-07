import siteConfig from '@/lib/config';

export const metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${siteConfig.companyName}, explaining how we collect and use your business energy enquiry data.`,
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-navy-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-navy-400">Last updated: [Date placeholder]</p>

      <div className="prose-sm mt-8 space-y-6 text-navy-600">
        <p>
          This privacy policy explains how {siteConfig.companyLegalName}
          (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects,
          uses and protects information submitted by visitors to this
          website. This service is intended for UK business (non-domestic)
          energy customers only.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Information We Collect</h2>
        <p>
          When you use our contact form, request a callback, or use our
          webchat, we may collect: your name, business name, phone number,
          email address, postcode, business type, energy usage details,
          current supplier information, and messages you send us. We also
          collect technical information such as pages visited and
          advertising click identifiers (for example, Google Click ID and
          UTM campaign parameters) to understand which marketing channels
          are effective.
        </p>

        <h2 className="text-lg font-bold text-navy-900">How We Use Your Information</h2>
        <p>
          We use the information you provide to respond to your enquiry,
          prepare a business energy review, and contact you about your
          options. We may also use aggregated, non-identifying data to
          understand and improve our marketing campaigns.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Who We Share Information With</h2>
        <p>
          [Placeholder - to be completed with details of any suppliers,
          partners, or sub-processors this business shares lead information
          with, once confirmed.]
        </p>

        <h2 className="text-lg font-bold text-navy-900">Data Storage &amp; Security</h2>
        <p>
          Enquiry data is stored securely and access is restricted to
          authorised staff who need it to handle your enquiry. [Placeholder
          - add details of specific technical/organisational security
          measures once confirmed.]
        </p>

        <h2 className="text-lg font-bold text-navy-900">Your Rights</h2>
        <p>
          Under UK data protection law, you have rights including the right
          to access, correct, or request deletion of your personal data. To
          exercise these rights, contact us at {siteConfig.companyEmail}.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Cookies</h2>
        <p>
          This site uses cookies and similar technologies - see our{' '}
          <a href="/cookie-policy" className="text-teal-600 underline">Cookie Policy</a>{' '}
          for details.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Contact Us</h2>
        <p>
          If you have questions about this policy, contact us at{' '}
          {siteConfig.companyEmail} or write to us at{' '}
          {siteConfig.companyAddress}.
        </p>

        <p className="text-sm text-navy-400">
          [This page is a placeholder policy template. It should be reviewed
          by a qualified legal adviser before the site goes live, and
          updated with confirmed, business-specific details.]
        </p>
      </div>
    </section>
  );
}
