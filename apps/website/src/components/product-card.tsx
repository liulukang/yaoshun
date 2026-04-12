import Image from 'next/image';
import Link from 'next/link';

import {ProductVisual} from '@/components/icon-visuals';
import {sharedUi} from '@/content/site';
import type {ProductJson} from '@/content/site/products.server';
import {t, type Locale} from '@/lib/i18n';
import {productPath} from '@/lib/routes';

type ProductCardProps = {
  locale: Locale;
  product: ProductJson;
};

function localizeProductText(locale: Locale, value: ProductJson['title'] | ProductJson['summary'], fallback: string): string {
  if (!value) return fallback;
  return value[locale] || value.en || value.zh || fallback;
}

export function ProductCard({locale, product}: ProductCardProps) {
  const productId = product.offerId ?? '';
  const productTitle = localizeProductText(locale, product.title, productId);
  const productSummary = localizeProductText(locale, product.summary, productId);
  const coverImage = product.images?.[0] ?? '';
  const topRightText = product.priceTiers?.[0]?.price ?? '';

  return (
    <Link
      className="group block"
      data-track-event="product_card_click"
      data-track-label={productId}
      data-track-location="products_grid"
      href={productPath(locale, productId)}
    >
      <div className="mb-4 transition-transform duration-500 group-hover:-translate-y-2 sm:mb-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-surface-container-low shadow-xl">
          {coverImage ? (
            <Image
              alt={productTitle}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              fill
              sizes="(min-width: 1536px) 24rem, (min-width: 1024px) 40vw, (min-width: 768px) 45vw, 95vw"
              src={coverImage}
            />
          ) : (
            <ProductVisual compact label={productId} slug={productId} />
          )}
        </div>
      </div>
      <div className="px-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-headline text-xl font-extrabold leading-tight text-primary sm:text-2xl">{productTitle}</h3>
          <span className="text-right font-label text-[10px] font-bold uppercase tracking-[0.16em] text-secondary sm:text-xs sm:tracking-[0.18em]">{topRightText}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{productSummary}</p>
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-surface-container-highest px-4 py-3 text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-white sm:mt-6 sm:px-5 sm:py-4">
          <span>{t(locale, sharedUi.productCard.action)}</span>
          <span>{'->'}</span>
        </div>
      </div>
    </Link>
  );
}
