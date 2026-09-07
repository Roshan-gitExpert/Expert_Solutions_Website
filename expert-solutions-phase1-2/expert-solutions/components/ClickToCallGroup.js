'use client';

import { useState } from 'react';
import ClickToCall from './ClickToCall';
import CallbackModal from './CallbackModal';

// Pairs the primary CALL US NOW button with the secondary REQUEST A
// CALLBACK option, per spec section 7. Used on the hero and CTA
// banners throughout the site.
export default function ClickToCallGroup({ location = 'unknown', className = '' }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-center ${className}`}>
      <ClickToCall location={location} />
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm font-bold text-teal-300 underline underline-offset-4 hover:text-teal-200"
      >
        or REQUEST A CALLBACK
      </button>
      <CallbackModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
