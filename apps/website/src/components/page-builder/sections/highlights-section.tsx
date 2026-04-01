import {BadgeCheck, ShieldCheck, WandSparkles} from 'lucide-react';

import type {HomeSectionRenderProps} from '@/components/page-builder/section-registry';
import {SectionHeading} from '@/components/ui/section-heading';

export function HighlightsMosaic({content}: HomeSectionRenderProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <article className="panel-card">
        <SectionHeading eyebrow={content.company.eyebrow} title={content.company.title} description={content.company.description} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {content.company.facts.map((fact, index) => (
            <div key={fact.label} className={`info-card ${index % 4 === 0 ? 'info-card-peach' : index % 4 === 1 ? 'info-card-sky' : index % 4 === 2 ? 'info-card-mint' : 'info-card-violet'}`}>
              <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">{fact.label}</p>
              <p className="mt-2 font-heading text-2xl text-[#1d2340]">{fact.value}</p>
            </div>
          ))}
        </div>
      </article>

      <div className="grid gap-5">
        <article className="panel-card">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#ffd7cd] bg-[#fff2ec] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">
            <WandSparkles className="h-4 w-4" />
            {content.strengths.eyebrow}
          </p>
          <h3 className="mt-4 font-heading text-2xl text-[#1d2340]">{content.strengths.title}</h3>
          <div className="mt-5 space-y-3">
            {content.strengths.items.map((item) => (
              <div key={item.title} className="glass-list-item">
                <ShieldCheck className="mt-1 h-4 w-4 flex-none text-[#1d7fb8]" />
                <div>
                  <p className="text-sm font-semibold text-[#1d2340]">{item.title}</p>
                  <p className="mt-1 text-sm leading-7 text-[#5f6788]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1d7fb8]">{content.compliance.eyebrow}</p>
          <h3 className="mt-4 font-heading text-2xl text-[#1d2340]">{content.compliance.title}</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {content.compliance.certifications.map((item) => (
              <div key={item.name} className="glass-list-item">
                <BadgeCheck className="mt-1 h-4 w-4 flex-none text-[#ff6b57]" />
                <div>
                  <p className="text-sm font-semibold text-[#1d2340]">{item.name}</p>
                  <p className="mt-1 text-sm leading-6 text-[#5f6788]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

export function HighlightsZigzag({content}: HomeSectionRenderProps) {
  return (
    <div className="space-y-5">
      <article className="panel-card">
        <SectionHeading eyebrow={content.company.eyebrow} title={content.company.title} description={content.company.description} />
      </article>

      <div className="grid gap-5 lg:grid-cols-2">
        {content.company.cards.map((card, index) => (
          <article key={card.title} className={`feature-band ${index % 2 === 0 ? 'translate-y-0' : 'lg:translate-y-7'}`}>
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl border border-[#ffd7cd] bg-[#fff2ec] text-[#ff6b57]">
              <WandSparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-heading text-lg text-[#1d2340]">{card.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#5f6788]">{card.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {content.strengths.items.map((item, index) => (
          <article key={item.title} className={`strength-card ${index % 4 === 0 ? 'strength-card-peach' : index % 4 === 1 ? 'strength-card-sky' : index % 4 === 2 ? 'strength-card-mint' : 'strength-card-violet'}`}>
            <h3 className="font-heading text-lg text-[#1d2340]">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#5f6788]">{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
