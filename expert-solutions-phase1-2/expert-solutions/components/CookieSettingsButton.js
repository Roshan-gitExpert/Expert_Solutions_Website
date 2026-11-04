'use client';

import { openConsentSettings } from '@/lib/consent';

export default function CookieSettingsButton({ className = '' }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Cookie settings
    </button>
  );
}
