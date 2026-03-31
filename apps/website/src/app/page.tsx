import Link from 'next/link';

export default function RootPage() {
  return (
    <main className="section-shell py-12">
      <section className="glass-card p-8">
        <h1 className="font-heading text-3xl font-bold text-brand-900">Website Entry</h1>
        <p className="mt-2 text-slate-700">Choose a locale page.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/en/" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
            English
          </Link>
          <Link href="/zh/" className="rounded-full border border-brand-300 px-4 py-2 text-sm font-semibold text-brand-700">
            中文
          </Link>
        </div>
      </section>
    </main>
  );
}
