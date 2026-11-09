'use client';

import { openConsentSettings } from '@/lib/consent';

// Reopens the consent banner. Rendered in the footer on every page.
export default function CookieSettingsButton({ className = '' }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Cookie settings
    </button>
  );
}
