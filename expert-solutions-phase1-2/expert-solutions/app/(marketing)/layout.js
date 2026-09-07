import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileBar from '@/components/StickyMobileBar';
import TrackingInit from '@/components/TrackingInit';

// This layout wraps every public marketing/PPC page (home + the
// seven keyword landing pages + contact/legal pages) with the site
// header, footer, sticky mobile call bar, and visitor tracking.
// The /admin dashboard deliberately does NOT use this layout - see
// app/admin/layout.js - so internal staff get a clean, chrome-free
// dashboard instead of the public marketing site around it.
export default function MarketingLayout({ children }) {
  return (
    <>
      <TrackingInit />
      <Header />
      <main className="pb-16 lg:pb-0">{children}</main>
      <Footer />
      <StickyMobileBar />
    </>
  );
}
