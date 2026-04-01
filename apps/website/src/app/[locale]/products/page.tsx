import type {Metadata} from 'next';
import Link from 'next/link';

import {PageLinks} from '@/components/page-links';
import {ProductCard} from '@/components/product-card';
import {companyProfile, pageLabels, products} from '@/data/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(locale, `${t(locale, pageLabels.products)} | ${t(locale, companyProfile.companyName)}`, locale === 'en' ? 'Desktop-first catalog rebuilt from stitch with Yaoshun product and service lines.' : '按 stitch 桌面目录页重建，并替换为尧顺的产品与服务线。', 'products');
}

export default async function ProductsPage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <main className="pb-16 pt-8 sm:pb-20 sm:pt-10 md:pt-12">
        <div className="mb-8 sm:mb-10 md:mb-12">
          <nav className="mb-4 flex items-center gap-2 font-label text-xs uppercase tracking-widest text-outline">
            <Link className="hover:text-primary" href={`/${locale}`}>
              {t(locale, pageLabels.home)}
            </Link>
            <span>{'/'}</span>
            <span className="font-bold text-primary">{t(locale, pageLabels.products)}</span>
          </nav>
          <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-headline text-4xl font-black tracking-tighter text-primary sm:text-5xl">{locale === 'en' ? 'Our Collection' : '产品目录'}</h1>
              <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-on-surface-variant sm:mt-3 sm:text-base">
                {locale === 'en'
                  ? 'Desktop catalog layout restored from stitch and updated with Yaoshun toy, profile, and engineering support programs.'
                  : '按照 stitch 的桌面产品目录布局重建，并替换为尧顺的玩具、型材和工程支持项目。'}
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-surface-container-low p-2 sm:gap-4">
              <span className="px-3 font-label text-[10px] font-bold uppercase tracking-widest text-outline sm:px-4">{locale === 'en' ? 'Sort By' : '排序'}</span>
              <select className="bg-transparent pr-6 font-headline text-xs font-bold text-primary outline-none sm:pr-8 sm:text-sm">
                <option>{locale === 'en' ? 'Newest Arrivals' : '最新项目'}</option>
                <option>{locale === 'en' ? 'Most Relevant' : '最相关'}</option>
                <option>{locale === 'en' ? 'MOQ Focus' : '按起订量'}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[280px_1fr] lg:gap-12">
          <aside className="glass-panel h-fit rounded-[2rem] border border-white/40 p-5 shadow-float sm:p-6 lg:sticky lg:top-28 lg:p-8">
            <div className="mb-6 flex items-center gap-2 sm:mb-8">
              <div className="material-dot" />
              <h2 className="font-headline text-lg font-extrabold tracking-tight text-primary">{locale === 'en' ? 'Refine Catalog' : '筛选目录'}</h2>
            </div>
            <div className="space-y-7 sm:space-y-8 lg:space-y-10">
              <section>
                <h3 className="mb-4 font-label text-[10px] font-black uppercase tracking-widest text-primary">{locale === 'en' ? 'Material' : '材质'}</h3>
                <div className="space-y-3 text-sm text-on-surface-variant">
                  <label className="flex items-center gap-3"><input type="checkbox" /> ABS / PP</label>
                  <label className="flex items-center gap-3"><input type="checkbox" /> PU / PVC / TPU</label>
                  <label className="flex items-center gap-3"><input type="checkbox" /> {locale === 'en' ? 'Engineering Plastics' : '工程塑胶'}</label>
                </div>
              </section>
              <section>
                <h3 className="mb-4 font-label text-[10px] font-black uppercase tracking-widest text-primary">{locale === 'en' ? 'Cooperation' : '合作方式'}</h3>
                <div className="grid gap-2">
                  <button className="flex items-center justify-between rounded-xl bg-secondary-container px-4 py-2 text-sm font-bold text-white">
                    <span>OEM / ODM</span>
                    <span>24</span>
                  </button>
                  <button className="flex items-center justify-between rounded-xl bg-surface-container px-4 py-2 text-sm font-bold text-primary">
                    <span>{locale === 'en' ? 'Sample-Based' : '来样加工'}</span>
                    <span>18</span>
                  </button>
                  <button className="flex items-center justify-between rounded-xl bg-surface-container px-4 py-2 text-sm font-bold text-primary">
                    <span>{locale === 'en' ? 'Material-Inclusive' : '包工包料'}</span>
                    <span>12</span>
                  </button>
                </div>
              </section>
              <section>
                <h3 className="mb-4 font-label text-[10px] font-black uppercase tracking-widest text-primary">{locale === 'en' ? 'Compliance' : '合规'}</h3>
                <div className="flex flex-wrap gap-2">
                  {['ASTM', 'EN71', 'ISO 9000', 'CE'].map((item) => (
                    <span key={item} className="rounded-lg border border-outline-variant bg-white/60 px-3 py-1 font-label text-[9px] font-bold uppercase text-primary">
                      {item}
                    </span>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="mb-4 font-label text-[10px] font-black uppercase tracking-widest text-primary">{locale === 'en' ? 'Min. Order' : '最小起订量'}</h3>
                <input className="h-1.5 w-full accent-secondary" max="5000" min="100" step="100" type="range" />
                <div className="mt-2 flex justify-between font-label text-[10px] font-bold uppercase text-outline">
                  <span>100</span>
                  <span className="text-secondary">5000+</span>
                </div>
              </section>
              <button className="w-full rounded-2xl bg-primary py-4 text-sm font-bold text-white shadow-lg">{locale === 'en' ? 'Apply Filters' : '应用筛选'}</button>
            </div>
          </aside>

          <section className="grid gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:gap-y-12 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} locale={locale} product={product} />
            ))}
          </section>
        </div>
      </main>

      <PageLinks
        description={{en: 'Go deeper into the factory system, compliance documents, or a direct quotation request.', zh: '继续进入工厂系统、资质文档或直接报价。'}}
        locale={locale}
        route="products"
        title={{en: 'Continue Through The Product Journey', zh: '继续完成产品浏览路径'}}
      />
    </div>
  );
}
