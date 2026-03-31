import Link from 'next/link';

export default function LocaleNotFound() {
  return (
    <section className="glass-card mx-auto max-w-2xl p-8 text-center">
      <h1 className="font-heading text-3xl font-bold text-brand-900">404</h1>
      <p className="mt-2 text-slate-700">Page not found.</p>
      <Link href="/" className="mt-4 inline-flex rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
        Back Home
      </Link>
    </section>
  );
}
