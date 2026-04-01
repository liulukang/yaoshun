import type {Metadata} from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Dongguan Yaoshun Technology Co., Ltd.',
  description: 'Desktop-first bilingual manufacturing website rebuilt from stitch prototypes.'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
