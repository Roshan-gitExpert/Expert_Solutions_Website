import Link from 'next/link';
import ClickToCallGroup from '@/components/ClickToCallGroup';

export const metadata = {
  title: 'Thank You',
  description: 'Thank you for requesting your free UK business energy review.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/thank-you' },
};

export default function ThankYouPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-8 w-8">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h1 className="text-3xl font-extrabold text-navy-900">Thank You</h1>
      <p className="mt-4 text-lg text-navy-500">
        We&apos;ve received your details. A UK-based energy specialist will
        review your business energy information and contact you shortly to
        discuss your options.
      </p>
      <p className="mt-4 text-navy-500">
        If your enquiry is urgent, you don&apos;t need to wait - you&apos;re
        welcome to call us directly.
      </p>
      <div className="mt-8 flex justify-center">
        <ClickToCallGroup location="thank-you-page" />
      </div>
      <Link href="/" className="mt-10 inline-block text-sm font-semibold text-navy-500 underline hover:text-navy-800">
        Back to homepage
      </Link>
    </section>
  );
}
