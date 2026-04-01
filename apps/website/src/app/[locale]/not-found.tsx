import Link from 'next/link';

export default function LocaleNotFound() {
  return (
    <section className="section-shell py-20">
      <div className="panel-card mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-4xl font-bold text-[#1d2340]">404</h1>
        <p className="mt-3 text-sm leading-7 text-[#5c6384]">Page not found.</p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-[linear-gradient(135deg,#1fd1c2,#0ea5e9)] px-5 py-2 text-sm font-semibold text-white">
          Back Home
        </Link>
      </div>
    </section>
  );
}
