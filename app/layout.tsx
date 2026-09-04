import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Flowlist — Focus on what matters',
  description: 'A calm, modern workspace for capturing and completing everyday tasks.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
