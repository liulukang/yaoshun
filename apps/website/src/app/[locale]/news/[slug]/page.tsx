import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import {StructuredData} from '@/components/structured-data'
import {companyProfile, newsContent} from '@/content/site'
import {getLocaleFromParams, locales, t} from '@/lib/i18n'
import {buildMetadata} from '@/lib/metadata'
import {findNewsArticleBySlug, getNewsArticles, newsArticlePath, toIsoDateFromEnglishLabel} from '@/lib/news'
import {localizedPath} from '@/lib/routes'
import {toAbsoluteUrl} from '@/lib/site-config'

const detailPageCopy = {
  backToNews: {en: 'Back to News Center', zh: '返回新闻中心'},
  sourceLabel: {en: 'Source Note', zh: '来源说明'}
}

export function generateStaticParams() {
  return locales.flatMap((locale) => getNewsArticles().map((article) => ({locale, slug: article.slug})))
}

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}): Promise<Metadata> {
  const {slug} = await params
  const locale = await getLocaleFromParams(params as Promise<{locale: string}>)
  const article = findNewsArticleBySlug(slug)

  if (!article) {
    return buildMetadata(
      locale,
      t(locale, newsContent.seo.title),
      t(locale, newsContent.seo.description),
      'news',
      t(locale, newsContent.seo.keywords)
    )
  }

  const title = `${t(locale, article.title)} | ${t(locale, newsContent.hero.eyebrow)}`
  const description = `${t(locale, article.detail.lead)} ${t(locale, article.text)}`.trim()
  const keywords = Array.from(
    new Set([
      t(locale, article.category),
      t(locale, article.detail.formatLabel),
      ...t(locale, newsContent.seo.keywords)
    ])
  )

  return buildMetadata(
    locale,
    title,
    description,
    `news/${article.slug}`,
    keywords
  )
}

export default async function NewsArticleDetailPage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {slug} = await params
  const locale = await getLocaleFromParams(params as Promise<{locale: string}>)
  const article = findNewsArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const localizedTitle = t(locale, article.title)
  const localizedDate = t(locale, article.date)
  const localizedCategory = t(locale, article.category)
  const localizedFormat = t(locale, article.detail.formatLabel)
  const localizedSummary = t(locale, article.text)
  const localizedLead = t(locale, article.detail.lead)
  const localizedNarrative = article.detail.narrative.map((item) => t(locale, item))
  const localizedChecklistTitle = t(locale, article.detail.checklistTitle)
  const localizedChecklist = article.detail.checklist.map((item) => t(locale, item))
  const localizedSourceNote = t(locale, article.detail.sourceNote)
  const localizedSections = article.detail.sections.map((section) => ({
    title: t(locale, section.title),
    paragraphs: section.paragraphs.map((item) => t(locale, item)),
    image: section.image,
    imageAlt: t(locale, section.imageAlt),
    imageCaption: t(locale, section.imageCaption)
  }))

  const publishedDate = toIsoDateFromEnglishLabel(article.date.en || '')

  const articleBody = [
    localizedLead,
    localizedSummary,
    ...localizedNarrative,
    ...localizedSections.flatMap((section) => [section.title, ...section.paragraphs, section.imageCaption]),
    localizedChecklistTitle,
    ...localizedChecklist,
    localizedSourceNote
  ]
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: localizedTitle,
    description: `${localizedLead} ${localizedSummary}`.trim(),
    articleBody,
    articleSection: localizedCategory,
    image: [
      toAbsoluteUrl(article.coverImage),
      ...article.detail.sections.map((section) => toAbsoluteUrl(section.image))
    ],
    mainEntityOfPage: toAbsoluteUrl(newsArticlePath(locale, article.slug)),
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
    author: {
      '@type': 'Organization',
      name: t(locale, companyProfile.companyName)
    },
    publisher: {
      '@type': 'Organization',
      name: t(locale, companyProfile.companyName),
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl('/favicon.svg')
      }
    },
    ...(publishedDate
      ? {
          datePublished: publishedDate,
          dateModified: publishedDate
        }
      : {})
  }

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <StructuredData data={articleStructuredData} />

      <main className="mx-auto max-w-3xl pb-16 pt-8 sm:pb-20 sm:pt-10">
        <div className="mb-6">
          <Link
            className="inline-flex items-center gap-2 text-sm text-primary underline-offset-4 hover:underline"
            href={localizedPath(locale, 'news')}
          >
            <span>{'<-'}</span>
            <span>{t(locale, detailPageCopy.backToNews)}</span>
          </Link>
        </div>

        <article>
          <p className="text-sm leading-relaxed text-on-surface-variant">
            {localizedDate} · {localizedCategory} · {localizedFormat}
          </p>

          <h1 className="mt-4 text-3xl font-semibold leading-tight text-primary sm:text-4xl">
            {localizedTitle}
          </h1>

          <figure className="mt-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-md">
              <Image
                alt={t(locale, article.coverImageAlt)}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1280px) 70vw, (min-width: 1024px) 76vw, 100vw"
                src={article.coverImage}
              />
            </div>
            <figcaption className="mt-2 text-sm leading-relaxed text-on-surface-variant">{t(locale, article.coverImageAlt)}</figcaption>
          </figure>

          <p className="mt-8 text-base leading-8 text-on-surface">{localizedLead}</p>
          <p className="mt-5 text-base leading-8 text-on-surface">{localizedSummary}</p>

          {localizedNarrative.map((paragraph, index) => (
            <p key={`narrative-${index}`} className="mt-5 text-base leading-8 text-on-surface">
              {paragraph}
            </p>
          ))}

          {localizedSections.map((section, index) => (
            <section key={`${section.title}-${index}`} className="mt-10">
              <h2 className="text-2xl font-semibold leading-tight text-primary">{section.title}</h2>

              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${section.title}-paragraph-${paragraphIndex}`} className="mt-5 text-base leading-8 text-on-surface">
                  {paragraph}
                </p>
              ))}

              <figure className="mt-6">
                <div className="relative aspect-[16/10] overflow-hidden rounded-md">
                  <Image
                    alt={section.imageAlt}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1280px) 68vw, (min-width: 1024px) 76vw, 100vw"
                    src={section.image}
                  />
                </div>
                <figcaption className="mt-2 text-sm leading-relaxed text-on-surface-variant">{section.imageCaption}</figcaption>
              </figure>
            </section>
          ))}

          <section className="mt-10">
            <h2 className="text-2xl font-semibold leading-tight text-primary">{localizedChecklistTitle}</h2>
            <div className="mt-4 space-y-3">
              {localizedChecklist.map((item, index) => (
                <p key={`checklist-${index}`} className="text-base leading-8 text-on-surface">
                  {index + 1}. {item}
                </p>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-primary">{t(locale, detailPageCopy.sourceLabel)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{localizedSourceNote}</p>
          </section>
        </article>
      </main>
    </div>
  )
}
