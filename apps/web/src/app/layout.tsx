import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DigitalMarket Premium',
  description: 'Single-admin digital marketplace for gaming products and services.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
