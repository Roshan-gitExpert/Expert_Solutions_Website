import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import FeatureGrid from '@/components/FeatureGrid';
import MarketPriceTrend from '@/components/MarketPriceTrend';
import HowItWorks from '@/components/HowItWorks';
import WhatWeNeed from '@/components/WhatWeNeed';
import Benefits from '@/components/Benefits';
import Faq from '@/components/Faq';
import CtaBanner from '@/components/CtaBanner';

export const metadata = {
      title: 'Compare Business Energy Costs | Free UK Commercial Energy Review',
      description:
              'Compare your business electricity and gas costs. Get a free, no-obligation commercial energy review from a UK business energy specialist.',
      alternates: { canonical: '/' },
};

export default function HomePage() {
      return (
              <>
                <Hero
            title="Compare Your Business Energy Costs"
            subtitle="See whether you could be paying less for your electricity and gas. A UK-based energy specialist will take a look at your account and talk you through your options - no obligation, no pressure."
            formVariant="homepage"
          />
                      <TrustBar />
                      <FeatureGrid />
                      <section className="bg-navy-950 pb-16 sm:pb-20">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                          <MarketPriceTrend />
                </div>
                </section>
          <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
                          Why Review Your Business Energy?
                </h2>
            <p className="mx-auto mt-4 max-w-3xl text-navy-500">
                          Most UK business energy contracts are agreed once and then left
              untouched until they roll over onto an out-of-contract rate -
                            often at a higher price. A short review, based on your actual
              usage, contract type and renewal date, can help you understand
              where your business stands and what options are available before
              your current deal ends.
                  </p>
                  </section>
          <HowItWorks />
                        <WhatWeNeed />
                        <Benefits />
                        <Faq />
                        <section className="mx-auto max-w-5xl px-4 pb-4 text-center sm:px-6 lg:px-8">
                          <p className="text-navy-500">
                            We help businesses across a range of sectors, including restaurants and cafes,
                            hotels, retail, offices, care homes, and manufacturing and warehousing, as well as
                            businesses in London, Manchester, Birmingham, Leeds, Glasgow and Bristol. Moving
              premises, taking on a new tenancy, starting up, relocating or opening a new branch?
                            We can help with that too.
                  </p>
            <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-teal-600">
                            <a href="/sectors" className="hover:underline">View all sectors</a>
              <a href="/locations" className="hover:underline">View all locations</a>
                  </div>
                  </section>
          <CtaBanner />
                  </>
      );
}
