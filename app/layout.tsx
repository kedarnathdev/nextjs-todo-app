import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Flowlist — Focus on what matters',
  description: 'A calm, modern workspace for capturing and completing everyday tasks.',
};

const themeScript = `(() => { try { const stored = localStorage.getItem('flowlist-theme'); const dark = stored === 'dark' || (!stored && matchMedia('(prefers-color-scheme: dark)').matches); if (dark) document.documentElement.classList.add('dark'); document.documentElement.style.colorScheme = dark ? 'dark' : 'light'; } catch {} })()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
