import Image from 'next/image';
import Link from 'next/link';

import type {Product} from '@/data/site';
import {t, type Locale} from '@/lib/i18n';
import {productPath} from '@/lib/routes';

type ProductCardProps = {
  locale: Locale;
  product: Product;
};

export function ProductCard({locale, product}: ProductCardProps) {
  return (
    <Link className="group block" href={productPath(locale, product.slug)}>
      <div className="relative mb-4 aspect-square overflow-hidden rounded-[2rem] bg-surface-container-low transition-transform duration-500 group-hover:-translate-y-2 sm:mb-6">
        <Image alt={t(locale, product.title)} className="h-full w-full object-cover" fill sizes="(min-width: 1280px) 28vw, (min-width: 768px) 42vw, 100vw" src={product.image} />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-secondary shadow-sm sm:left-4 sm:top-4 sm:px-4 sm:py-1.5 sm:text-[10px]">
          {t(locale, product.badge)}
        </div>
      </div>
      <div className="px-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-headline text-xl font-extrabold leading-tight text-primary sm:text-2xl">{t(locale, product.title)}</h3>
          <span className="text-right font-label text-[10px] font-bold uppercase tracking-[0.16em] text-secondary sm:text-xs sm:tracking-[0.18em]">{t(locale, product.moq)}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, product.summary)}</p>
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-surface-container-highest px-4 py-3 text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-white sm:mt-6 sm:px-5 sm:py-4">
          <span>{locale === 'en' ? 'Open Product Detail' : '查看详情'}</span>
          <span>{'->'}</span>
        </div>
      </div>
    </Link>
  );
}
