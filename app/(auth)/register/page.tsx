'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const form = new FormData(e.currentTarget);
      const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.get('name'), email: form.get('email'), password: form.get('password') }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Unable to create account.'); return; }
      router.push('/todos'); router.refresh();
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen bg-gray-950 px-5 py-10 text-gray-950 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl lg:grid-cols-2">
          <section className="hidden bg-gray-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-12 grid h-10 w-10 place-items-center rounded-xl bg-white text-sm font-black text-gray-950">F</div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Flowlist</p>
              <h1 className="mt-3 max-w-md text-4xl font-bold tracking-tight">Turn intentions into momentum.</h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/55">Create your focused workspace and start clearing your list.</p>
            </div>
            <div className="text-xs text-white/35">Less clutter. More progress.</div>
          </section>

          <section className="p-7 sm:p-10">
            <div className="mb-8">
              <p className="eyebrow">Get started</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950">Create your Flowlist</h2>
              <p className="mt-2 text-sm text-gray-500">One simple place for everything you need to remember.</p>
            </div>

            {error && <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your name" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-indigo-100" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-indigo-100" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700" htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" placeholder="At least 8 characters" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-indigo-100" />
              </div>
              <button type="submit" disabled={loading} className="w-full rounded-xl bg-gray-950 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Creating account…' : 'Create account'}</button>
            </form>

            <p className="mt-7 text-center text-sm text-gray-500">Already have an account? <Link href="/login" className="font-semibold text-gray-900 hover:text-[var(--accent)]">Sign in</Link></p>
          </section>
        </div>
      </div>
    </main>
  );
}
