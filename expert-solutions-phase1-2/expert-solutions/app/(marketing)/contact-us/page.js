import ClickToCallGroup from '@/components/ClickToCallGroup';
import LeadForm from '@/components/LeadForm';
import siteConfig from '@/lib/config';

export const metadata = {
  title: 'Contact Us | Speak to a UK Business Energy Specialist',
  description:
    'Contact Expert Solutions to speak to a UK business energy specialist about your commercial electricity and gas options.',
  alternates: { canonical: '/contact-us' },
};

export default function ContactUsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Speak to a Business Energy Specialist
          </h1>
          <p className="mt-4 text-navy-500">
            Whether you have a quick question or want a full review of your
            business electricity and gas contracts, our specialists are
            happy to help. We work exclusively with UK business (non-domestic)
            energy customers.
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-navy-400">Phone</h2>
              {siteConfig.phoneConfigured ? (
                <p className="text-lg font-bold text-navy-900">{siteConfig.phoneDisplay}</p>
              ) : (
                <p className="text-lg font-bold text-navy-900">
                  <a href="#lead-form" className="text-teal-600 hover:underline">Request a callback</a>
                </p>
              )}
              <p className="text-sm text-navy-500">{siteConfig.openingHours}</p>
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-navy-400">Email</h2>
              <p className="text-lg font-bold text-navy-900">{siteConfig.companyEmail}</p>
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-navy-400">Registered Office</h2>
              <p className="text-navy-700">{siteConfig.companyAddress}</p>
            </div>
          </div>

          <div className="mt-8">
            <ClickToCallGroup location="contact-page" />
          </div>
        </div>

        <div id="lead-form">
          <LeadForm variant="contact-us" />
        </div>
      </div>
    </section>
  );
}
