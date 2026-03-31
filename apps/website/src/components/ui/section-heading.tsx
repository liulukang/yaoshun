interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({eyebrow, title, description}: SectionHeadingProps) {
  return (
    <div className="space-y-2">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff6b57]">{eyebrow}</p> : null}
      <h2 className="font-heading text-3xl font-bold text-[#1d2340] sm:text-4xl">{title}</h2>
      {description ? <p className="max-w-3xl text-sm leading-7 text-[#5c6384] sm:text-base">{description}</p> : null}
    </div>
  );
}
