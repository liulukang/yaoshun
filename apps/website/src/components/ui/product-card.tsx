import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {Link} from '@/i18n/navigation';
import {getLocalizedText} from '@/lib/locale';
import type {ProductSpec} from '@/types/content';

interface ProductCardProps {
  product: ProductSpec;
  locale: 'en' | 'zh';
}

export function ProductCard({product, locale}: ProductCardProps) {
  const t = useTranslations('Common');

  return (
    <article className="overflow-hidden rounded-xl2 border border-brand-100 bg-white shadow-soft">
      <Image src={product.image} alt={getLocalizedText(product.name, locale)} width={640} height={360} className="h-44 w-full object-cover" />
      <div className="space-y-3 p-4">
        <h3 className="font-heading text-lg font-bold text-brand-800">{getLocalizedText(product.name, locale)}</h3>
        <p className="text-sm text-slate-600">{getLocalizedText(product.tagline, locale)}</p>
        <div className="flex flex-wrap gap-2 text-xs text-brand-700">
          {product.keywords.slice(0, 2).map((keyword) => (
            <span key={keyword} className="rounded-full bg-brand-50 px-2 py-1">
              {keyword}
            </span>
          ))}
        </div>
        <Link href={`/products/${product.slug}`} className="inline-flex text-sm font-semibold text-brand-600 hover:text-brand-800">
          {t('viewDetails')} →
        </Link>
      </div>
    </article>
  );
}
