import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaBanner from '@/components/CtaBanner';
import { SECTORS } from '@/lib/seoData';

export const metadata = {
  title: 'Business Energy by Sector | UK Commercial Energy Guides',
  description:
    'Business energy guidance by sector - restaurants, hotels, retail, offices, care homes and manufacturing. See how usage patterns differ by industry.',
  alternates: { canonical: '/sectors' },
};

export default function SectorsHubPage() {
  return (
    <>
      <Breadcrumbs items={[]} current="Business Energy by Sector" />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
          Business Energy by Sector
        </h1>
        <p className="mt-4 max-w-3xl text-navy-500">
          Every type of business uses energy differently - a restaurant
          kitchen, a hotel running 24/7, and a daytime office have very
          different usage patterns. Choose your sector below for guidance
          relevant to how your business actually uses electricity and gas.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((sector) => (
            <Link
              key={sector.slug}
              href={`/sectors/${sector.slug}`}
              className="rounded-2xl border border-navy-100 p-6 transition hover:border-teal-300 hover:shadow-card"
            >
              <h2 className="text-lg font-bold text-navy-900">{sector.label}</h2>
              <p className="mt-2 text-sm text-navy-500">{sector.summary}</p>
              <span className="mt-4 inline-block text-sm font-bold text-teal-600">
                View {sector.label} energy guide &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBanner
        title="Not Sure Which Sector Fits Your Business?"
        subtitle="Speak to a specialist and we'll talk through your business energy needs directly."
      />
    </>
  );
}
