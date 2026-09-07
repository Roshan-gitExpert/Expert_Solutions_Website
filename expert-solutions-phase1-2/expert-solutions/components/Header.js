'use client';

import { useState } from 'react';
import Link from 'next/link';
import siteConfig from '@/lib/config';
import ClickToCall from './ClickToCall';

const NAV_LINKS = [
  { href: '/business-electricity', label: 'Business Electricity' },
  { href: '/business-gas', label: 'Business Gas' },
  { href: '/business-energy-comparison', label: 'Compare Business Energy' },
  { href: '/business-energy-renewal', label: 'Renewals' },
  { href: '/contact-us', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-lg font-black text-teal-400">
            ES
          </span>
          <span className="text-lg font-extrabold tracking-tight text-navy-900">
            {siteConfig.companyName}
            <span className="block -mt-1 text-[10px] font-semibold uppercase tracking-wider text-teal-600">
              Business Energy
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-navy-600 transition hover:text-navy-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ClickToCall
            label="Call"
            location="header"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-navy-800 px-4 py-2 text-sm font-bold text-navy-800 transition hover:bg-navy-50"
          />
          <Link
            href="/#get-quote"
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-navy-950 shadow-card transition hover:bg-amber-400"
          >
            GET MY FREE ENERGY REVIEW
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-navy-100 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          {open ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-navy-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <ClickToCall location="header-mobile" />
            <Link
              href="/#get-quote"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-navy-800 px-4 py-3 text-center text-sm font-bold text-white"
            >
              GET MY FREE ENERGY REVIEW
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
