import siteConfig from '@/lib/config';

export const metadata = {
  title: 'Complaints Procedure',
  description: `How to make a complaint to ${siteConfig.companyName} and what to expect from our complaints process.`,
  alternates: { canonical: '/complaints-procedure' },
};

export default function ComplaintsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-navy-900">Complaints Procedure</h1>

      <div className="prose-sm mt-8 space-y-6 text-navy-600">
        <p>
          We aim to provide a helpful and professional service to every
          business we work with. If you are unhappy with any part of our
          service, please let us know so we can put things right.
        </p>

        <h2 className="text-lg font-bold text-navy-900">How to Make a Complaint</h2>
        <p>
          {siteConfig.phoneConfigured ? (
            <>You can make a complaint by phone on {siteConfig.phoneDisplay}, or by email to {siteConfig.companyEmail}, or by writing to us at{' '}
            {siteConfig.companyAddress}.</>
          ) : (
            <>You can make a complaint by email to {siteConfig.companyEmail}, or by writing to us at{' '}
            {siteConfig.companyAddress}.</>
          )}
        </p>

        <h2 className="text-lg font-bold text-navy-900">What Happens Next</h2>
        <p>
          [Placeholder - add confirmed complaint-handling timescales and
          escalation steps, e.g. acknowledgement within X working days, a
          full response within Y working days, and details of any relevant
          ombudsman or alternative dispute resolution scheme, once
          confirmed.]
        </p>

        <h2 className="text-lg font-bold text-navy-900">Regulatory Information</h2>
        <p>
          [Placeholder - add details of any relevant regulatory body,
          code of practice, or trade association membership once
          confirmed. No such affiliations are claimed until verified.]
        </p>

        <p className="text-sm text-navy-400">
          [This page is a placeholder complaints procedure template. It
          should be reviewed and completed with confirmed details before
          the site goes live.]
        </p>
      </div>
    </section>
  );
}
