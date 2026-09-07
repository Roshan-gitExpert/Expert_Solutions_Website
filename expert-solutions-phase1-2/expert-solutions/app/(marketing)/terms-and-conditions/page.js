import siteConfig from '@/lib/config';

export const metadata = {
  title: 'Terms & Conditions',
  description: `Terms and conditions for using the ${siteConfig.companyName} website.`,
  alternates: { canonical: '/terms-and-conditions' },
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-navy-900">Terms &amp; Conditions</h1>
      <p className="mt-2 text-sm text-navy-400">Last updated: [Date placeholder]</p>

      <div className="prose-sm mt-8 space-y-6 text-navy-600">
        <p>
          These terms and conditions govern your use of this website,
          operated by {siteConfig.companyLegalName} (company number{' '}
          {siteConfig.companyNumber}), registered office{' '}
          {siteConfig.companyAddress}. This website is intended for UK
          business (non-domestic) energy customers only.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Our Role</h2>
        <p>
          {siteConfig.companyName} acts as a business energy intermediary /
          broker. We help businesses review and compare commercial
          electricity and gas options. We do not supply energy directly.
        </p>

        <h2 className="text-lg font-bold text-navy-900">No Guarantee of Savings</h2>
        <p>
          Any comparison or review provided is for informational purposes.
          We do not guarantee that your business will save money, and no
          specific savings figures are promised through this website.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Use of This Website</h2>
        <p>
          This website and its enquiry forms are provided for UK commercial
          / business energy customers. It is not intended for residential
          or domestic energy customers.
        </p>

        <h2 className="text-lg font-bold text-navy-900">Liability</h2>
        <p>
          [Placeholder - standard liability limitation clauses to be added
          and reviewed by a qualified legal adviser before the site goes
          live.]
        </p>

        <h2 className="text-lg font-bold text-navy-900">Governing Law</h2>
        <p>These terms are governed by the laws of England and Wales.</p>

        <h2 className="text-lg font-bold text-navy-900">Contact Us</h2>
        <p>Questions about these terms can be sent to {siteConfig.companyEmail}.</p>

        <p className="text-sm text-navy-400">
          [This page is a placeholder terms template. It should be reviewed
          by a qualified legal adviser before the site goes live.]
        </p>
      </div>
    </section>
  );
}
