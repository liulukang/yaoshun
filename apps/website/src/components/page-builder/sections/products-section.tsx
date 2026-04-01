import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';

import type {HomeSectionRenderProps} from '@/components/page-builder/section-registry';
import {localeBasePath} from '@/components/page-builder/helpers';
import {SectionHeading} from '@/components/ui/section-heading';

export function ProductsCards({content, locale}: HomeSectionRenderProps) {
  const basePath = localeBasePath(locale);

  return (
    <div>
      <SectionHeading eyebrow={content.products.eyebrow} title={content.products.title} description={content.products.description} />
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {content.products.items.map((item, index) => (
          <article key={item.name} className={`product-card-home ${index % 3 === 0 ? 'product-card-home-peach' : index % 3 === 1 ? 'product-card-home-sky' : 'product-card-home-mint'}`}>
            <div className="product-image-shell">
              <Image src={item.image} alt={item.name} width={760} height={500} className="h-48 w-full object-contain p-6" />
            </div>
            <div className="space-y-4 p-6">
              <h3 className="font-heading text-xl text-[#1d2340]">{item.name}</h3>
              <p className="text-sm leading-7 text-[#5f6788]">{item.tagline}</p>
              <div className="flex flex-wrap gap-2">
                {item.specs.map((spec) => (
                  <span key={spec} className="rounded-full border border-[#d9deef] bg-white px-3 py-1 text-xs text-[#5f6788]">
                    {spec}
                  </span>
                ))}
              </div>
              <Link
                href={`${basePath}/products`}
                data-track-event="cta_click"
                data-track-location="home_products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1d7fb8]"
              >
                {locale === 'zh' ? '查看全部产品' : 'View all products'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ProductsShowcase({content, locale}: HomeSectionRenderProps) {
  const basePath = localeBasePath(locale);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <article className="panel-card">
        <SectionHeading eyebrow={content.products.eyebrow} title={content.products.title} description={content.products.description} />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {content.products.items.slice(0, 2).map((item) => (
            <div key={item.name} className="rounded-3xl border border-[#e8e9f4] bg-white p-4 shadow-[0_14px_30px_rgba(83,91,130,0.08)]">
              <Image src={item.image} alt={item.name} width={620} height={420} className="h-36 w-full object-contain" />
              <p className="mt-3 font-heading text-lg text-[#1d2340]">{item.name}</p>
              <p className="mt-2 text-sm leading-6 text-[#5f6788]">{item.detail}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="panel-card checklist-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">{locale === 'zh' ? 'Featured Product' : 'Featured Product'}</p>
        <h3 className="mt-3 font-heading text-2xl text-[#1d2340]">{content.products.items[2]?.name ?? content.products.items[0]?.name}</h3>
        <p className="mt-3 text-sm leading-7 text-[#5f6788]">{content.products.items[2]?.detail ?? content.products.items[0]?.detail}</p>
        <div className="mt-5 space-y-3">
          {(content.products.items[2]?.specs ?? content.products.items[0]?.specs ?? []).map((spec) => (
            <div key={spec} className="glass-list-item">
              <p className="text-sm text-[#5f6788]">{spec}</p>
            </div>
          ))}
        </div>
        <Link
          href={`${basePath}/products`}
          data-track-event="cta_click"
          data-track-location="home_products"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#1fd1c2,#0ea5e9)] px-5 py-2.5 text-sm font-semibold text-white"
        >
          {locale === 'zh' ? '进入产品中心' : 'Explore Product Center'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </article>
    </div>
  );
}
