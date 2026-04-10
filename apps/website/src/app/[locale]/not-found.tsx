export default function NotFound() {
  return (
    <div className="px-4 py-20 sm:px-6 sm:py-24 xl:px-8 xl:py-32">
      <div className="rounded-[2rem] bg-surface-container-low p-6 text-center shadow-panel sm:p-8 lg:p-12">
        <p className="font-label text-xs font-bold uppercase tracking-[0.24em] text-secondary">404</p>
        <h1 className="mt-3 font-headline text-3xl font-extrabold tracking-tighter text-primary sm:mt-4 sm:text-4xl">Page not found</h1>
      </div>
    </div>
  );
}
