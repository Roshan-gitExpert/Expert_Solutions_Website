'use client';

import siteConfig from '@/lib/config';
import { sendEvent, EVENTS } from '@/lib/tracking';

// A persistent, high-visibility mobile conversion bar - standard
// practice for PPC/SEO landing pages since most traffic on business
// energy terms arrives on mobile.
export default function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-navy-800 bg-navy-950 lg:hidden">
      {siteConfig.phoneConfigured ? (
        <a
          href={`tel:${siteConfig.phoneTel}`}
          onClick={() => sendEvent(EVENTS.PHONE_CLICKED, { location: 'sticky-bar' })}
          className="flex flex-1 items-center justify-center gap-2 border-r border-navy-800 py-3 text-sm font-bold text-white"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1.1L6.6 10.8z" />
          </svg>
          Call Now
        </a>
      ) : (
        <a
          href="#lead-form"
          className="flex flex-1 items-center justify-center gap-2 border-r border-navy-800 py-3 text-sm font-bold text-white"
        >
          Request a Callback
        </a>
      )}
      <a
        href="#lead-form"
        className="flex flex-1 items-center justify-center bg-amber-500 py-3 text-sm font-bold text-navy-950"
      >
        GET FREE REVIEW
      </a>
    </div>
  );
}
