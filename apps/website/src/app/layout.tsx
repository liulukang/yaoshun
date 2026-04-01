import type {Metadata} from 'next';

import {siteName} from '@/content/home-content';

import './globals.css';

export const metadata: Metadata = {
  title: siteName,
  description: 'Premium multilingual toy manufacturer website.',
  icons: {
    icon: [{url: '/favicon.svg', type: 'image/svg+xml'}],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  },
  manifest: '/site.webmanifest'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
