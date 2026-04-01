import Image from 'next/image';
import Link from 'next/link';
import type {Metadata} from 'next';

import {getSiteName, products, seoKeywords} from '@/content/site-content';
import {getLocalizedText} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';
import type {Locale} from '@/types/content';

interface ProductsPageProps {
  params: Promise<{locale: Locale}>;
}

function localeRoot(locale: Locale): string {
  return locale === 'zh' ? '/zh' : '/en';
}

export async function generateMetadata({params}: ProductsPageProps): Promise<Metadata> {
  const {locale} = await params;
  const brandName = getSiteName(locale);
  const title = locale === 'zh' ? `${brandName} | 产品方案` : `${brandName} | Product Solutions`;
  const description =
    locale === 'zh'
      ? '查看 AI Toys for Kids、Fort Building Kit、Wall Washer 系列产品参数与 OEM / ODM 定制能力。'
      : 'Explore AI Toys for Kids, Fort Building Kit and Wall Washer product specs with OEM / ODM customization support.';

  return createPageMetadata({
    locale,
    path: '/products',
    title,
    description,
    keywords: seoKeywords
  });
}

export default async function ProductsPage({params}: ProductsPageProps) {
  const {locale} = await params;
  const isZh = locale === 'zh';
  const basePath = localeRoot(locale);

  return (
    <section className="section-shell py-14 sm:py-20">
      <div className="panel-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">{isZh ? 'Product Solutions' : 'Product Solutions'}</p>
        <h1 className="mt-3 font-heading text-3xl text-[#1d2340] sm:text-4xl">{isZh ? '产品与参数总览' : 'Product & Specification Overview'}</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[#5c6384]">
          {isZh
            ? '页面聚焦外贸买家最关心的数据字段：材质、适龄、装箱率、CBM、MOQ 与交期。点击单个产品可查看完整详情。'
            : 'The page focuses on sourcing-critical fields: material, age range, carton rate, CBM, MOQ and lead time. Open each product for full details.'}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {products.map((product, index) => (
          <article key={product.slug} className={`product-card-home product-card-home-${index % 3 === 0 ? 'peach' : index % 3 === 1 ? 'mint' : 'sky'}`}>
            <div className="product-image-shell">
              <Image
                src={product.image}
                alt={getLocalizedText(product.name, locale)}
                width={720}
                height={480}
                className="h-48 w-full object-contain p-6"
              />
            </div>

            <div className="space-y-4 p-6">
              <div>
                <h2 className="font-heading text-xl text-[#1d2340]">{getLocalizedText(product.name, locale)}</h2>
                <p className="mt-2 text-sm leading-7 text-[#5c6384]">{getLocalizedText(product.tagline, locale)}</p>
              </div>

              <div className="grid gap-2 text-xs text-[#5f6788]">
                <p>{isZh ? `材质：${product.material}` : `Material: ${product.material}`}</p>
                <p>{isZh ? `装箱：${product.cartonSpec}` : `Carton: ${product.cartonSpec}`}</p>
                <p>{isZh ? `MOQ：${product.moq}` : `MOQ: ${product.moq}`}</p>
                <p>{isZh ? `交期：${product.leadTime}` : `Lead Time: ${product.leadTime}`}</p>
              </div>

              <Link
                href={`${basePath}/products/${product.slug}`}
                className="inline-flex items-center rounded-full border border-[#d9deef] bg-white px-4 py-2 text-sm font-semibold text-[#1d2340] transition hover:border-[#ffcec1]"
              >
                {isZh ? '查看详情' : 'View Details'}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
