import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaBanner from '@/components/CtaBanner';
import { LOCATIONS } from '@/lib/seoData';

export const metadata = {
  title: 'Business Energy by Location | UK Regional Energy Guides',
  description:
    'Business electricity and gas guidance by UK region, including your local electricity distribution network operator (DNO) - London, Manchester, Birmingham, Leeds, Glasgow and Bristol.',
  alternates: { canonical: '/locations' },
};

export default function LocationsHubPage() {
  return (
    <>
      <Breadcrumbs items={[]} current="Business Energy by Location" />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
          Business Energy by Location
        </h1>
        <p className="mt-4 max-w-3xl text-navy-500">
          Business electricity supply in the UK is delivered over regional
          networks run by different Distribution Network Operators (DNOs) -
          the companies that own and maintain the physical wires,
          regardless of which supplier you are billed by. Find your area
          below for local network details and general business energy
          guidance.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LOCATIONS.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="rounded-2xl border border-navy-100 p-6 transition hover:border-teal-300 hover:shadow-card"
            >
              <h2 className="text-lg font-bold text-navy-900">{loc.label}</h2>
              <p className="mt-2 text-sm text-navy-500">{loc.region}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-teal-600">
                DNO: {loc.dnoOperator}
              </p>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-xs text-navy-400">
          Outside these areas? We work with UK businesses nationwide -{' '}
          <Link href="/contact-us" className="underline hover:text-navy-600">
            get in touch
          </Link>{' '}
          for a review wherever your business is based.
        </p>
      </section>
      <CtaBanner
        title="Get a Free Business Energy Review Anywhere in the UK"
        subtitle="Speak to a specialist about your business electricity and gas options."
      />
    </>
  );
}
