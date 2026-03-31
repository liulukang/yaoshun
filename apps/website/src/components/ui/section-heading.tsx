interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({eyebrow, title, description}: SectionHeadingProps) {
  return (
    <div className="space-y-2">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">{eyebrow}</p> : null}
      <h2 className="font-heading text-3xl font-bold text-brand-900">{title}</h2>
      {description ? <p className="max-w-3xl text-sm text-slate-600 sm:text-base">{description}</p> : null}
    </div>
  );
}
