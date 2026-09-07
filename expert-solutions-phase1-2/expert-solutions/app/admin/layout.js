'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import siteConfig from '@/lib/config';

// Guards every /admin/* page except /admin/login. Real security is
// enforced by Supabase Row Level Security (see supabase/schema.sql) -
// this check is just so logged-out staff see a login screen instead
// of an empty dashboard.
export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  const [checking, setChecking] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (isLoginPage || !isSupabaseConfigured) {
      setChecking(false);
      return undefined;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
      if (!data.session) router.replace('/admin/login');
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession) router.replace('/admin/login');
    });

    return () => listener.subscription.unsubscribe();
  }, [isLoginPage, router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace('/admin/login');
  }

  if (isLoginPage) return children;

  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-xl font-bold text-navy-900">Admin dashboard not set up yet</h1>
        <p className="mt-3 text-navy-500">
          Supabase hasn&apos;t been connected to this site yet. See{' '}
          <code className="rounded bg-navy-100 px-1.5 py-0.5 text-sm">SUPABASE_SETUP.md</code>{' '}
          in the project files for step-by-step instructions.
        </p>
      </div>
    );
  }

  if (checking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-navy-400">
        Checking your session...
      </div>
    );
  }

  if (!session) return null; // redirecting to /admin/login

  return (
    <div className="min-h-screen bg-navy-50">
      <div className="border-b border-navy-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-900 text-sm font-black text-teal-400">
                ES
              </span>
              <span className="text-sm font-extrabold text-navy-900">
                {siteConfig.companyName} <span className="font-medium text-navy-400">Admin</span>
              </span>
            </Link>
            <nav className="hidden gap-4 sm:flex">
              <Link href="/admin" className="text-sm font-semibold text-navy-600 hover:text-navy-900">
                Dashboard
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-navy-400 sm:inline">{session.user.email}</span>
            <button
              onClick={handleSignOut}
              className="rounded-lg border border-navy-200 px-3 py-1.5 text-sm font-semibold text-navy-600 hover:bg-navy-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
