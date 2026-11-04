'use client';

import { useEffect, useState } from 'react';
import { openConsentSettings, isConsentHost } from '@/lib/consent';

// Only rendered on hosts where the consent banner runs (not on www).
export default function CookieSettingsButton({ className = '' }) {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(isConsentHost()), []);
  if (!show) return null;
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Cookie settings
    </button>
  );
}
