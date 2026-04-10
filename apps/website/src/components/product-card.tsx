import Link from 'next/link';

import {ProductVisual} from '@/components/icon-visuals';
import {sharedUi, type Product} from '@/content/site';
import {t, type Locale} from '@/lib/i18n';
import {productPath} from '@/lib/routes';

type ProductCardProps = {
  locale: Locale;
  product: Product;
};

export function ProductCard({locale, product}: ProductCardProps) {
  return (
    <Link
      className="group block"
      data-track-event="product_card_click"
      data-track-label={product.slug}
      data-track-location="products_grid"
      href={productPath(locale, product.slug)}
    >
      <div className="mb-4 transition-transform duration-500 group-hover:-translate-y-2 sm:mb-6">
        <ProductVisual compact label={t(locale, product.badge)} slug={product.slug} />
      </div>
      <div className="px-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-headline text-xl font-extrabold leading-tight text-primary sm:text-2xl">{t(locale, product.title)}</h3>
          <span className="text-right font-label text-[10px] font-bold uppercase tracking-[0.16em] text-secondary sm:text-xs sm:tracking-[0.18em]">{t(locale, product.moq)}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, product.summary)}</p>
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-surface-container-highest px-4 py-3 text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-white sm:mt-6 sm:px-5 sm:py-4">
          <span>{t(locale, sharedUi.productCard.action)}</span>
          <span>{'->'}</span>
        </div>
      </div>
    </Link>
  );
}
