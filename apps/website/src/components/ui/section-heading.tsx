interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({eyebrow, title, description}: SectionHeadingProps) {
  return (
    <div className="space-y-2.5 sm:space-y-2">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff6b57] sm:tracking-[0.22em]">{eyebrow}</p> : null}
      <h2 className="font-heading text-2xl font-bold leading-tight text-[#1d2340] sm:text-4xl">{title}</h2>
      {description ? <p className="max-w-3xl text-sm leading-6 text-[#5c6384] sm:text-base sm:leading-7">{description}</p> : null}
    </div>
  );
}
