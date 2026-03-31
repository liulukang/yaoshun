import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Factory,
  Globe2,
  Languages,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
  WandSparkles
} from 'lucide-react';

import {homepageContent} from '@/content/home-content';
import {SectionHeading} from '@/components/ui/section-heading';
import type {Locale} from '@/types/content';

interface EnterpriseHomepageProps {
  locale: Locale;
}

export function EnterpriseHomepage({locale}: EnterpriseHomepageProps) {
  const content = homepageContent[locale];
  const strengthAccents = ['peach', 'sky', 'mint', 'violet'];
  const productAccents = ['peach', 'mint', 'sky'];
  const storyAccents = ['peach', 'sky', 'violet'];

  return (
    <div className="homepage-playful overflow-hidden text-[#1d2340]">
      <section className="hero-shell relative isolate overflow-hidden">
        <div className="hero-glow hero-glow-a" />
        <div className="hero-glow hero-glow-b" />
        <div className="hero-glow hero-glow-c" />
        <div className="section-shell relative grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#ffd5cb] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#ff6b57] shadow-[0_12px_24px_rgba(255,127,102,0.08)]">
                <Sparkles className="h-4 w-4" />
                {content.hero.eyebrow}
              </p>
              <h1 className="font-heading max-w-4xl text-4xl font-semibold leading-tight text-[#1d2340] sm:text-5xl lg:text-6xl">
                {content.hero.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[#5f6788] sm:text-lg">{content.hero.description}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="#products" className="hero-primary-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white">
                {content.hero.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#contact" className="inline-flex items-center gap-2 rounded-full border border-[#dadff0] bg-white px-6 py-3 text-sm font-semibold text-[#1d2340] shadow-[0_12px_24px_rgba(31,39,73,0.06)] transition hover:-translate-y-0.5">
                {content.hero.secondaryCta}
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              {content.hero.badges.map((badge) => (
                <span key={badge} className="rounded-full border border-[#e6e7f2] bg-[rgba(255,255,255,0.72)] px-4 py-2 text-sm text-[#5f6788]">
                  {badge}
                </span>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {content.hero.metrics.map((metric, index) => (
                <article key={metric.label} className={`metric-card metric-card-${strengthAccents[index] ?? 'peach'}`}>
                  <p className="font-heading text-3xl text-[#1d2340]">{metric.value}</p>
                  <p className="mt-2 text-sm font-semibold text-[#1d2340]">{metric.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[#5f6788]">{metric.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="hero-showcase">
              <div className="hero-showcase-top">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#ffd6cc] bg-[#fff1eb] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">
                  <Languages className="h-4 w-4" />
                  {locale === 'zh' ? '多语言首页' : 'Multilingual Homepage'}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#d8edf8] bg-[#ebfbff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#1d7fb8]">
                  <Globe2 className="h-4 w-4" />
                  {locale === 'zh' ? 'B2B 外贸导向' : 'B2B Export-Led'}
                </span>
              </div>

              <div className="glass-stage">
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff6b57]">{content.hero.spotlightTitle}</p>
                  <p className="text-lg leading-8 text-[#324064]">{content.hero.spotlightDescription}</p>
                </div>
                <div className="space-y-3">
                  {content.hero.spotlightPoints.map((point) => (
                    <div key={point} className="glass-list-item">
                      <BadgeCheck className="mt-1 h-4 w-4 flex-none text-[#ff6b57]" />
                      <p className="text-sm leading-7 text-[#5f6788]">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -left-5 top-10 floating-note hidden lg:block">
                <p className="text-xs uppercase tracking-[0.24em] text-[#8a90aa]">{locale === 'zh' ? '风格关键词' : 'Style Direction'}</p>
                <p className="mt-2 text-sm leading-6 text-[#465273]">
                  {locale === 'zh' ? '珊瑚橙、海盐蓝、奶油底、玩具品牌的轻快感。' : 'Coral energy, sea-salt blue, creamy backgrounds and playful brand pacing.'}
                </p>
              </div>

              <div className="absolute -bottom-5 right-8 floating-note hidden lg:block">
                <p className="text-xs uppercase tracking-[0.24em] text-[#8a90aa]">{locale === 'zh' ? '转化逻辑' : 'Conversion Logic'}</p>
                <p className="mt-2 text-sm leading-6 text-[#465273]">
                  {locale === 'zh' ? '信任背书先行，产品细节承接，联系入口收口。' : 'Trust first, product detail next, contact conversion at the close.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="company" className="section-shell py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="panel-card">
            <SectionHeading eyebrow={content.company.eyebrow} title={content.company.title} description={content.company.description} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {content.company.facts.map((fact, index) => (
                <div key={fact.label} className={`info-card info-card-${strengthAccents[index] ?? 'peach'}`}>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#7b819d]">{fact.label}</p>
                  <p className="mt-3 font-heading text-3xl text-[#1d2340]">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            {content.company.cards.map((card, index) => (
              <article key={card.title} className="feature-band">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ffd4c8] bg-[#fff1eb] text-[#ff6b57]">
                  {index === 0 ? <WandSparkles className="h-5 w-5" /> : index === 1 ? <Factory className="h-5 w-5" /> : <Globe2 className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-[#1d2340]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5c6384]">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="strengths" className="section-shell py-12">
        <div className="panel-card">
          <SectionHeading eyebrow={content.strengths.eyebrow} title={content.strengths.title} description={content.strengths.description} />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {content.strengths.items.map((item, index) => (
              <article key={item.title} className={`strength-card strength-card-${strengthAccents[index] ?? 'peach'}`}>
                <ShieldCheck className="h-5 w-5 text-[#1d2340]" />
                <h3 className="mt-5 font-heading text-xl text-[#1d2340]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5c6384]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="compliance" className="section-shell py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="panel-card">
            <SectionHeading eyebrow={content.compliance.eyebrow} title={content.compliance.title} description={content.compliance.description} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {content.compliance.certifications.map((item) => (
                <article key={item.name} className="info-card">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#ff6b57]">{item.name}</p>
                  <p className="mt-3 text-sm leading-7 text-[#5c6384]">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="panel-card">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#d8edf8] bg-[#ebfbff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1d7fb8]">
              <ShieldCheck className="h-4 w-4 text-[#1d7fb8]" />
              {locale === 'zh' ? '验厂与质量体系' : 'Audit & QA System'}
            </p>
            <div className="mt-6 space-y-4">
              {content.compliance.audits.map((item) => (
                <article key={item.name} className="compliance-line">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8edf8] bg-[#ebfbff] text-[#1d7fb8]">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-[#1d2340]">{item.name}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#5c6384]">{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="section-shell py-20">
        <SectionHeading eyebrow={content.products.eyebrow} title={content.products.title} description={content.products.description} />
        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          {content.products.items.map((item, index) => (
            <article key={item.name} className={`product-card-home product-card-home-${productAccents[index] ?? 'peach'}`}>
              <div className="product-image-shell">
                <Image src={item.image} alt={item.name} width={720} height={480} className="h-52 w-full object-contain p-8" />
              </div>
              <div className="space-y-5 p-7">
                <div>
                  <h3 className="font-heading text-2xl text-[#1d2340]">{item.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5c6384]">{item.tagline}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.specs.map((spec) => (
                    <span key={spec} className="rounded-full border border-[#dde1f1] bg-white px-3 py-2 text-xs text-[#5f6788]">
                      {spec}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-7 text-[#5c6384]">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="capability" className="section-shell py-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="panel-card">
            <SectionHeading eyebrow={content.capability.eyebrow} title={content.capability.title} description={content.capability.description} />
            <div className="mt-8 space-y-4">
              {content.capability.highlights.map((item) => (
                <div key={item} className="glass-list-item">
                  <Sparkles className="mt-1 h-4 w-4 flex-none text-[#ff6b57]" />
                  <p className="text-sm leading-7 text-[#5f6788]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {content.capability.workflow.map((item) => (
              <article key={item.step} className="workflow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#cfeff1] bg-[#e9fffd] font-heading text-sm text-[#00a79d]">
                  {item.step.slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-heading text-xl text-[#1d2340]">{item.step}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5c6384]">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="showroom-strip">
          <SectionHeading eyebrow={content.showroom.eyebrow} title={content.showroom.title} description={content.showroom.description} />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {content.showroom.spaces.map((space) => (
              <article key={space.title} className="showroom-card">
                <div className="showroom-visual">
                  <div className="showroom-gradient" />
                  <Factory className="relative z-10 h-7 w-7 text-[#ff6b57]" />
                </div>
                <h3 className="mt-5 font-heading text-2xl text-[#1d2340]">{space.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5c6384]">{space.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="section-shell py-20">
        <SectionHeading eyebrow={content.stories.eyebrow} title={content.stories.title} description={content.stories.description} />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {content.stories.items.map((item, index) => (
            <article key={item.title} className={`story-card story-card-${storyAccents[index] ?? 'peach'}`}>
              <Boxes className="h-5 w-5 text-[#1d2340]" />
              <p className="mt-5 font-heading text-2xl text-[#1d2340]">{item.title}</p>
              <p className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-lg text-[#ff6b57] shadow-[0_10px_20px_rgba(255,255,255,0.32)]">{item.result}</p>
              <p className="mt-4 text-sm leading-7 text-[#4f5878]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="section-shell py-20">
        <div className="panel-card">
          <SectionHeading eyebrow={content.faq.eyebrow} title={content.faq.title} description={content.faq.description} />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {content.faq.items.map((item) => (
              <article key={item.question} className="faq-card">
                <h3 className="font-heading text-xl text-[#1d2340]">{item.question}</h3>
                <p className="mt-4 text-sm leading-7 text-[#5c6384]">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell py-20">
        <div className="contact-panel">
          <div className="space-y-6">
            <SectionHeading eyebrow={content.contact.eyebrow} title={content.contact.title} description={content.contact.description} />
            <div className="grid gap-4 md:grid-cols-3">
              {content.contact.channels.map((channel) => (
                <Link key={channel.label} href={channel.href} className="channel-card">
                  <MessageCircleMore className="h-5 w-5 text-[#ff6b57]" />
                  <p className="mt-4 text-xs uppercase tracking-[0.22em] text-[#7b819d]">{channel.label}</p>
                  <p className="mt-2 text-base text-[#1d2340]">{channel.value}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="panel-card checklist-card">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#d8edf8] bg-[#ebfbff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1d7fb8]">
              <Globe2 className="h-4 w-4 text-[#1d7fb8]" />
              {content.contact.checklistTitle}
            </p>
            <div className="mt-6 space-y-4">
              {content.contact.checklist.map((item) => (
                <div key={item} className="glass-list-item">
                  <BadgeCheck className="mt-1 h-4 w-4 flex-none text-[#ff6b57]" />
                  <p className="text-sm leading-7 text-[#5f6788]">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 rounded-3xl border border-[#ffd7cd] bg-[#fff1eb] px-5 py-4 text-sm leading-7 text-[#a95645]">
              {content.contact.notice}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
