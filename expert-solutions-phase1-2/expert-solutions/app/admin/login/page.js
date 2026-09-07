'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import siteConfig from '@/lib/config';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!isSupabaseConfigured) {
      setError(
        'The admin dashboard is not connected to Supabase yet. See SUPABASE_SETUP.md to finish setup.'
      );
      return;
    }

    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (signInError) {
      setError(signInError.message || 'Could not sign in - please check your details.');
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-navy-50 px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-card">
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-lg font-black text-teal-400">
            ES
          </span>
          <span className="text-lg font-extrabold text-navy-900">
            {siteConfig.companyName} <span className="font-medium text-navy-400">Admin</span>
          </span>
        </div>

        <h1 className="mb-1 text-xl font-bold text-navy-900">Internal Sign In</h1>
        <p className="mb-6 text-sm text-navy-500">
          For Expert Solutions staff only. If you don&apos;t have a login yet,
          ask whoever set up your Supabase project to invite you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-navy-700">Email</span>
            <input
              required
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-navy-700">Password</span>
            <input
              required
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-navy-800 px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-700 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
