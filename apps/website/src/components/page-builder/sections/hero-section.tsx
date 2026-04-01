import Link from 'next/link';
import {ArrowRight, BadgeCheck, Sparkles} from 'lucide-react';

import {localeBasePath} from '@/components/page-builder/helpers';
import type {HomeSectionRenderProps} from '@/components/page-builder/section-registry';

export function HeroSplit({content, locale}: HomeSectionRenderProps) {
  const basePath = localeBasePath(locale);

  return (
    <div className="hero-shell relative isolate overflow-hidden rounded-[2rem] border border-[#ffd8cc] bg-[linear-gradient(140deg,rgba(255,250,246,0.96),rgba(240,250,255,0.92))] p-6 shadow-[0_28px_60px_rgba(76,86,123,0.15)] sm:p-8 lg:p-10">
      <div className="hero-glow hero-glow-a" />
      <div className="hero-glow hero-glow-b" />
      <div className="relative grid gap-8 lg:grid-cols-[1.06fr_0.94fr]">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#ffd7cd] bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">
            <Sparkles className="h-4 w-4" />
            {content.hero.eyebrow}
          </p>
          <h1 className="font-heading text-3xl leading-tight text-[#1d2340] sm:text-5xl">{content.hero.title}</h1>
          <p className="max-w-2xl text-sm leading-7 text-[#556080] sm:text-base sm:leading-8">{content.hero.description}</p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`${basePath}/products`}
              data-track-event="cta_click"
              data-track-location="hero_primary"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff6b57,#ffaf68)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(255,107,87,0.3)]"
            >
              {content.hero.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`${basePath}/contact`}
              data-track-event="cta_click"
              data-track-location="hero_secondary"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d6deef] bg-white px-6 py-3 text-sm font-semibold text-[#1d2340]"
            >
              {content.hero.secondaryCta}
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {content.hero.metrics.map((metric, index) => (
              <article
                key={metric.label}
                className={`metric-card ${index % 4 === 0 ? 'metric-card-peach' : index % 4 === 1 ? 'metric-card-sky' : index % 4 === 2 ? 'metric-card-mint' : 'metric-card-violet'}`}
              >
                <p className="font-heading text-2xl text-[#1d2340]">{metric.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#76809f]">{metric.label}</p>
                <p className="mt-2 text-sm leading-6 text-[#5f6788]">{metric.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[#eadff7] bg-white/85 p-5 shadow-[0_22px_46px_rgba(80,92,132,0.12)] backdrop-blur-md sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">{content.hero.spotlightTitle}</p>
          <p className="mt-3 text-sm leading-7 text-[#455173] sm:text-base sm:leading-8">{content.hero.spotlightDescription}</p>
          <div className="mt-6 space-y-3">
            {content.hero.spotlightPoints.map((point) => (
              <div key={point} className="glass-list-item">
                <BadgeCheck className="mt-0.5 h-4 w-4 flex-none text-[#ff6b57]" />
                <p className="text-sm leading-7 text-[#596485]">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroCentered({content, locale}: HomeSectionRenderProps) {
  const basePath = localeBasePath(locale);

  return (
    <div className="hero-shell relative isolate overflow-hidden rounded-[2rem] border border-[#dce5ff] bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(236,250,255,0.94))] p-6 shadow-[0_28px_60px_rgba(76,86,123,0.14)] sm:p-10">
      <div className="hero-glow hero-glow-c" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#cfe9ff] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1d7fb8]">
          <Sparkles className="h-4 w-4" />
          {content.hero.eyebrow}
        </p>
        <h1 className="font-heading mt-4 text-3xl leading-tight text-[#1d2340] sm:text-5xl">{content.hero.title}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#546080] sm:text-base sm:leading-8">{content.hero.description}</p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={`${basePath}/products`}
            data-track-event="cta_click"
            data-track-location="hero_primary"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#0ea5e9,#1fd1c2)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_32px_rgba(14,165,233,0.25)]"
          >
            {content.hero.primaryCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={`${basePath}/contact`}
            data-track-event="cta_click"
            data-track-location="hero_secondary"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d6deef] bg-white px-6 py-3 text-sm font-semibold text-[#1d2340]"
          >
            {content.hero.secondaryCta}
          </Link>
        </div>
      </div>

      <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {content.hero.metrics.map((metric, index) => (
          <article key={metric.label} className={`metric-card ${index % 2 === 0 ? 'metric-card-sky' : 'metric-card-violet'}`}>
            <p className="font-heading text-2xl text-[#1d2340]">{metric.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#76809f]">{metric.label}</p>
            <p className="mt-2 text-sm leading-6 text-[#5f6788]">{metric.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
