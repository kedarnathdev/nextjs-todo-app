'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  return (
    <button onClick={handleLogout} disabled={loading}
      className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50">
      {loading ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
