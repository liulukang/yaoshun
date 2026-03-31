import type {Metadata} from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Yaoshun Toy Manufacturing',
  description: 'OEM/ODM toy manufacturing website.'
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
