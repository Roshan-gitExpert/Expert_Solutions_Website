import Link from 'next/link';
import ClickToCallGroup from '@/components/ClickToCallGroup';

export const metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-navy-900">Page Not Found</h1>
      <p className="mt-4 text-navy-500">
        Sorry, we couldn&apos;t find that page. You can head back to the
        homepage, or speak to a business energy specialist directly.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4">
        <Link
          href="/"
          className="rounded-lg bg-navy-800 px-6 py-3 text-sm font-bold text-white hover:bg-navy-700"
        >
          Back to Homepage
        </Link>
        <ClickToCallGroup location="404-page" />
      </div>
    </section>
  );
}
