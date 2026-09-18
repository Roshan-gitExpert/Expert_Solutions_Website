'use client';

import siteConfig from '@/lib/config';
import { sendEvent, EVENTS } from '@/lib/tracking';

// The single visible "CALL US NOW" style button used everywhere on
// the site. Phone number is never hard-coded here - it always comes
// from lib/config.js, which reads NEXT_PUBLIC_PHONE_* env vars.
//
// Until a real phone number is configured (siteConfig.phoneConfigured),
// this deliberately does NOT show or dial a placeholder number -
// showing a realistic-looking fake UK number to real visitors would
// be misleading. Instead it falls back to the enquiry form, so the
// button stays useful rather than just disappearing.
export default function ClickToCall({
  label = 'Call Us Now',
  className = '',
  location = 'unknown',
}) {
  const baseClassName =
    className ||
    'inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-base font-bold text-navy-950 shadow-card transition hover:bg-amber-400';

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1.1L6.6 10.8z" />
    </svg>
  );

  if (!siteConfig.phoneConfigured) {
    return (
      <a
        href="#lead-form"
        onClick={() => sendEvent(EVENTS.CTA_CLICKED, { location, note: 'phone_not_configured' })}
        className={baseClassName}
      >
        {icon}
        <span>Request a Free Energy Review</span>
      </a>
    );
  }

  return (
    <a
      href={`tel:${siteConfig.phoneTel}`}
      onClick={() => sendEvent(EVENTS.PHONE_CLICKED, { location })}
      className={baseClassName}
    >
      {icon}
      <span>
        {label}: <span className="whitespace-nowrap">{siteConfig.phoneDisplay}</span>
      </span>
    </a>
  );
}
