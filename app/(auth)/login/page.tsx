'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const form = new FormData(e.currentTarget);
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.get('email'), password: form.get('password') }) });
      const data = await response.json();
      if (!response.ok) { setError(data.error ?? 'Unable to sign in.'); return; }
      router.push('/todos'); router.refresh();
    } catch { setError('Something went wrong.'); } finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-[#30363d] bg-[#0d1117]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/login" className="flex items-center gap-3 text-sm font-semibold"><span className="grid h-8 w-8 place-items-center rounded-full border border-white">F</span>Flowlist</Link>
          <span className="font-mono text-xs text-[#8b949e]">sign in</span>
        </div>
      </header>
      <div className="mx-auto grid min-h-[calc(100vh-57px)] max-w-[1012px] items-center gap-10 px-4 py-10 lg:grid-cols-[1fr_400px]">
        <section className="hidden lg:block">
          <p className="font-mono text-sm text-[#8b949e]">flowlist / authentication</p>
          <h1 className="mt-4 max-w-xl text-[40px] font-normal leading-[1.2]">A focused workspace for work worth finishing.</h1>
          <p className="mt-5 max-w-lg text-base text-[#8b949e]">Simple tasks, clear status, and no unnecessary noise.</p>
        </section>
        <section className="gh-panel gh-card-shadow p-6 sm:p-8">
          <h2 className="text-[22px] font-normal">Sign in to Flowlist</h2>
          <p className="mt-2 text-sm text-[#8b949e]">Use your account credentials to continue.</p>
          {error && <div role="alert" className="mt-5 rounded-md border border-[#ff7b72] bg-[#160c0b] px-3 py-3 text-sm text-[#ff7b72]">{error}</div>}
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div><label htmlFor="email" className="mb-2 block text-sm font-semibold">Email</label><input id="email" name="email" type="email" required autoComplete="email" className="gh-input w-full" /></div>
            <div><label htmlFor="password" className="mb-2 block text-sm font-semibold">Password</label><input id="password" name="password" type="password" required autoComplete="current-password" className="gh-input w-full" /></div>
            <button type="submit" disabled={loading} className="gh-primary-button w-full">{loading ? 'Signing in…' : 'Sign in'}</button>
          </form>
          <p className="mt-6 border-t border-[#30363d] pt-5 text-center text-sm text-[#8b949e]">New to Flowlist? <Link href="/register" className="text-[#8dd6ff] hover:underline">Create an account</Link></p>
        </section>
      </div>
    </main>
  );
}
