import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Boxes,
  Globe2,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

import { aboutContent } from "@/content/site";
import { getLocaleFromParams, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { localizedPath } from "@/lib/routes";

const ABOUT_MEDIA = {
  values:
    "https://jl6cgijvh5fcsw1s.public.blob.vercel-storage.com/1688-products/tubes/568719941830/images/image-001.jpg",
  hero: "https://7j7davvujdsmddan.public.blob.vercel-storage.com/about/header.png",
  visionRight:
    "https://7j7davvujdsmddan.public.blob.vercel-storage.com/about/vision.png",
  pulse: "https://7j7davvujdsmddan.public.blob.vercel-storage.com/about/yj.png",
  quality:
    "https://7j7davvujdsmddan.public.blob.vercel-storage.com/about/quality.png",
  historyTimeBg:
    "https://7j7davvujdsmddan.public.blob.vercel-storage.com/about/team-work.png",
  missionValuesBg:
    "https://7j7davvujdsmddan.public.blob.vercel-storage.com/38b0f6ad532d2caa786ef1c0f21e179b.jpg",
  team: [
    "https://jl6cgijvh5fcsw1s.public.blob.vercel-storage.com/1688-products/equipment/615665845646/images/image-003.jpg",
    "https://jl6cgijvh5fcsw1s.public.blob.vercel-storage.com/1688-products/equipment/616855540047/images/image-003.jpg",
    "https://jl6cgijvh5fcsw1s.public.blob.vercel-storage.com/1688-products/equipment/618549405409/images/image-003.jpg",
  ],
} as const;

const pageCopy = {
  heroTag: { en: "Est 2006", zh: "始创于 2006" },
  heroPrefix: { en: "Legacy forged in", zh: "以长期主义锻造" },
  heroHighlight: { en: "innovation", zh: "创新" },
  heroSuffix: { en: ".", zh: "。" },
  visionTitle: { en: "Our Vision", zh: "我们的愿景" },
  visionPoints: [
    {
      en: "Radical integrity in process and delivery commitments.",
      zh: "以透明流程与交付承诺建立长期信任。",
    },
    {
      en: "Architectural stability from sampling to shipment.",
      zh: "从打样到出货保持稳定、可复制的执行结构。",
    },
  ],
  qualityTitle: { en: "Quality Policy", zh: "质量方针" },
  qualityTopPoints: [
    {
      en: "Targeting full compliance with global customer requirements.",
      zh: "以满足全球客户要求为目标",
    },
    {
      en: "Aligning execution with customer business workflow.",
      zh: "以匹配客户业务流程为原则",
    },
    {
      en: "Focusing on key tasks, critical characteristics, and key owners.",
      zh: "聚焦关键事、关键特性、关键人",
    },
  ],
  qualityBottomPoints: [
    {
      en: "Full-team participation, prevention first, right-first-time, fast response.",
      zh: "全员参与、预防为主、一次做对、高效响应",
    },
    {
      en: "Building a dependable and high-quality industrial chain.",
      zh: "构建优质产业链",
    },
    {
      en: "Creating customer value through excellent quality.",
      zh: "以卓越质量成就客户价值",
    },
  ],
  metricsEyebrow: { en: "Metrics Of Progress", zh: "进展指标" },
  metricsTitle: { en: "Innovation Hub", zh: "创新中枢" },
  metricsDescription: {
    en: "Enterprise and platform snapshots that reflect execution quality and delivery stability.",
    zh: "结合企业档案与平台运营形成的阶段性指标快照。",
  },
  teamTitle: { en: "The Custodians", zh: "核心守护团队" },
  teamDescription: {
    en: "Cross-function teams keep engineering rhythm stable from concept to shipment.",
    zh: "跨团队协作确保项目从概念到出货始终保持工程节奏。",
  },
  unitLabel: { en: "Operations Unit", zh: "执行单元" },
  missionValuesMissionLabel: { en: "Mission", zh: "使命" },
  missionValuesValuesLabel: { en: "Values", zh: "价值观" },
  missionValuesMissionText: {
    en: "Create value for customers and increase benefits for the enterprise",
    zh: "为客户创造价值，为企业增加效益",
  },
  missionValuesValuesText: {
    en: "Innovation, Integrity, Collaboration & Ownership, Steady, Efficient",
    zh: "创新、诚信、协作担当、稳健、高效",
  },
  historyTimePrefix: {
    en: "Build the next ",
    zh: "与我们一起，打造下一段",
  },
  historyTimeHighlight: {
    en: "legacy",
    zh: "传承",
  },
  historyTimeSuffix: {
    en: " with us.",
    zh: "。",
  },
  historyTimeDescription: {
    en: "We are looking for visionaries who understand that the future is built on the foundations of the past.",
    zh: "我们在寻找理解“未来建立在过去基础之上”的长期主义合作伙伴。",
  },
  historyTimeCta: {
    en: "Explore Careers",
    zh: "了解合作机会",
  },
} as const;

function mediaByIndex(list: readonly string[], index: number): string {
  if (list.length === 0) return "";
  return list[index % list.length] || list[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(
    locale,
    t(locale, aboutContent.seo.title),
    t(locale, aboutContent.seo.description),
    "about",
    t(locale, aboutContent.seo.keywords),
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocaleFromParams(params);
  const metrics = aboutContent.platformMetricsSection.metrics;
  const teamCards = aboutContent.rndSteps.slice(0, 3);
  const qualityTopItems = [
    { icon: Workflow, text: pageCopy.qualityTopPoints[0] },
    { icon: Users, text: pageCopy.qualityTopPoints[1] },
    { icon: Boxes, text: pageCopy.qualityTopPoints[2] },
  ];
  const qualityBottomItems = [
    { icon: BadgeCheck, text: pageCopy.qualityBottomPoints[0] },
    { icon: Globe2, text: pageCopy.qualityBottomPoints[1] },
    { icon: ShieldCheck, text: pageCopy.qualityBottomPoints[2] },
  ];

  return (
    <div className="desktop-shell pb-16">
      <section className="full-bleed mb-16 relative h-[calc(100svh-4rem)] overflow-hidden bg-[#06184a] xl:h-[calc(100svh-5rem)]">
        <article className="relative h-full overflow-hidden">
          <Image
            alt={t(locale, {
              en: "Night city and engineering office backdrop",
              zh: "夜景与工程办公室背景",
            })}
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src={ABOUT_MEDIA.hero}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a3564]/52 via-[#07274a]/78 to-[#021425]/95" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:112px_112px] opacity-25" />

          <div className="relative z-10 flex h-full items-center">
            <div className="w-full px-5 pb-8 pt-12 sm:px-8 sm:pb-12 lg:max-w-[840px] lg:px-12 lg:pb-16">
              <span className="inline-flex items-center rounded-sm bg-[#f4c56d] px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.22em] text-[#1d3043] sm:text-[11px]">
                {t(locale, pageCopy.heroTag)}
              </span>
              <h1 className="mt-4 font-headline text-[2.2rem] font-black leading-[0.94] tracking-[-0.02em] text-white sm:text-[3rem] lg:text-[4.2rem]">
                {t(locale, pageCopy.heroPrefix)}{" "}
                <span className="text-[#f3bc5d]">
                  {t(locale, pageCopy.heroHighlight)}
                </span>
                {t(locale, pageCopy.heroSuffix)}
              </h1>
              <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-white/84 sm:text-base">
                {t(locale, aboutContent.hero.description)}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="vision mb-16">
        <div className="grid lg:grid-cols-2">
          <article className="px-6 py-8 sm:px-10 sm:py-10">
            <h2 className="font-headline text-3xl font-black text-[#101a2d] sm:text-4xl">
              {t(locale, pageCopy.visionTitle)}
            </h2>
            <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-[#4b5567] sm:text-base">
              {t(locale, aboutContent.positioning.vision)}
            </p>
            <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-[#4b5567] sm:text-base">
              {t(locale, aboutContent.positioning.mission)}
            </p>
            <ul className="mt-7 space-y-3">
              {pageCopy.visionPoints.map((point) => (
                <li
                  key={point.en}
                  className="flex items-start gap-3 text-sm text-[#2c3a52] sm:text-base"
                >
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#c59643]" />
                  <span>{t(locale, point)}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="relative min-h-[300px] overflow-hidden sm:min-h-[380px] lg:min-h-full">
            <Image
              alt={t(locale, {
                en: "Vision illustration",
                zh: "愿景配图",
              })}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src={ABOUT_MEDIA.visionRight}
            />
          </article>
        </div>
      </section>

      <section className="bg-[#f6fafe] py-12 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <span className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-[#9aa3b2] sm:text-xs">
            {t(locale, pageCopy.metricsEyebrow)}
          </span>
          <h2 className="mt-3 font-headline text-4xl font-black text-[#101a2d] sm:text-5xl">
            {t(locale, pageCopy.metricsTitle)}
          </h2>
          <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-[#4d596c] sm:text-base">
            {t(locale, pageCopy.metricsDescription)}
          </p>

          <div className="mt-7 grid gap-4 lg:grid-cols-[1.55fr_0.8fr]">
            <article className="rounded-[1.1rem] border border-[#d4dae3] bg-[#f7f8fb] p-5 sm:p-6">
              <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#7f8898] sm:text-xs">
                {t(locale, metrics[2]?.label || { en: "", zh: "" })}
              </p>
              <p className="mt-3 font-headline text-5xl font-black text-[#121b2c] sm:text-6xl">
                {t(locale, metrics[2]?.value || { en: "", zh: "" })}
              </p>
              <div className="mt-5 h-1.5 w-20 rounded-full bg-[#0c2f61]" />
            </article>

            <article className="rounded-[1.1rem] bg-[#052c59] p-5 text-white sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 sm:text-xs">
                {t(locale, metrics[5]?.label || { en: "", zh: "" })}
              </p>
              <p className="mt-3 font-headline text-4xl font-black sm:text-5xl">
                {t(locale, metrics[5]?.value || { en: "", zh: "" })}
              </p>
              <p className="mt-2 text-sm text-white/75">
                {t(
                  locale,
                  aboutContent.enterpriseSnapshotSection.cards[1].title,
                )}
              </p>
            </article>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[metrics[0], metrics[1], metrics[3]].map((item) => (
              <article
                key={item?.label.en || "metric"}
                className="rounded-[1.1rem] border border-[#d7dde7] bg-[#f4f6fa] p-5"
              >
                <p className="font-headline text-4xl font-black text-[#121c2d]">
                  {t(locale, item?.value || { en: "", zh: "" })}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#7f8797]">
                  {t(locale, item?.label || { en: "", zh: "" })}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="quality">
        <div className="border-t border-[#d5dbe4] bg-[#f6fafe] px-6 py-6 sm:px-10 sm:py-8">
          <h3 className="font-headline text-3xl font-black text-[#121a2c] sm:text-4xl">
            {t(locale, pageCopy.qualityTitle)}
          </h3>
        </div>

        <div className="grid bg-[#f6fafe] md:grid-cols-2">
          <article className="px-6 py-8 sm:px-10 sm:py-10">
            <ul className="space-y-7 sm:space-y-8">
              {qualityTopItems.map((item) => (
                <li key={item.text.en} className="flex items-center gap-6">
                  <item.icon
                    className="h-10 w-10 shrink-0 text-[#101010] sm:h-12 sm:w-12"
                    strokeWidth={1.45}
                  />
                  <p className="text-sm text-[#232323] sm:text-base">
                    {t(locale, item.text)}
                  </p>
                </li>
              ))}
            </ul>
          </article>

          <article className="relative min-h-[280px] overflow-hidden sm:min-h-[360px]">
            <Image
              alt={t(locale, {
                en: "Factory operator and automated manufacturing line",
                zh: "工厂操作人员与自动化生产线",
              })}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src={ABOUT_MEDIA.pulse}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#07162f]/20 via-transparent to-[#121212]/30" />
          </article>

          <article className="relative min-h-[280px] overflow-hidden sm:min-h-[360px]">
            <Image
              alt={t(locale, {
                en: "Precision equipment in quality control process",
                zh: "质量控制流程中的精密设备",
              })}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src={ABOUT_MEDIA.quality}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#cbe0ff]/22 via-transparent to-[#17283d]/18" />
          </article>

          <article className="px-6 py-8 sm:px-10 sm:py-10">
            <ul className="space-y-7 sm:space-y-8">
              {qualityBottomItems.map((item) => (
                <li key={item.text.en} className="flex items-center gap-6">
                  <item.icon
                    className="h-10 w-10 shrink-0 text-[#101010] sm:h-12 sm:w-12"
                    strokeWidth={1.45}
                  />
                  <p className="text-sm text-[#232323] sm:text-base">
                    {t(locale, item.text)}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="mt-16 mb-16">
        <div className="mx-auto">
          <h2 className="text-center font-headline text-4xl font-black text-[#131d30] sm:text-5xl">
            {t(locale, pageCopy.teamTitle)}
          </h2>
          <p className="mx-auto mt-3 max-w-[66ch] text-center text-sm leading-relaxed text-[#5a6476] sm:text-base">
            {t(locale, pageCopy.teamDescription)}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {teamCards.map((item, index) => (
              <article
                key={item.title.en}
                className="overflow-hidden border border-[#1e2f4a] bg-[#061b36] text-white shadow-[0_20px_60px_-32px_rgba(3,12,28,0.9)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    alt={t(locale, item.title)}
                    // className="object-cover grayscale"
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    src={mediaByIndex(ABOUT_MEDIA.team, index)}
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-[#07172d] via-[#0c2342]/55 to-transparent" /> */}
                </div>
                <div className="border-t border-[#244061] px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#f4bb5d]">
                    {t(locale, pageCopy.unitLabel)}
                  </p>
                  <h3 className="mt-1 font-headline text-2xl font-black">
                    {t(locale, item.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    {t(locale, item.text)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <h2 className="font-headline text-3xl font-extrabold text-primary sm:text-4xl">
          {t(locale, aboutContent.valuesSection.title)}
        </h2>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5">
          <div className="advantages grid gap-4 sm:gap-5 md:grid-cols-4">
            {aboutContent.values.map((item) => (
              <article
                key={item.title.en}
                className="rounded-[1.25rem] bg-white p-5 shadow-panel sm:p-6"
              >
                <h3 className="h-16 font-headline text-center text-2xl font-bold text-primary">
                  {t(locale, item.title)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                  {t(locale, item.text)}
                </p>
                <div className="my-16 flex justify-center">
                  <Image
                    alt={t(locale, item.title)}
                    className="h-16 w-16 object-contain sm:h-20 sm:w-20"
                    height={80}
                    src={item.icon}
                    width={80}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="history-time py-4">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[0.85rem]">
          <Image
            alt={t(locale, {
              en: "Teamwork and collaboration background",
              zh: "团队协作背景图",
            })}
            className="object-cover"
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            src={ABOUT_MEDIA.historyTimeBg}
          />
          <div className="absolute inset-0 bg-[#1b365d]/88" />

          <div className="relative z-10 grid gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.4fr_auto] lg:items-center lg:px-16">
            <div className="max-w-[52rem]">
              <h2 className="font-headline text-[2.05rem] font-black leading-[0.94] text-white sm:text-[3.1rem]">
                {t(locale, pageCopy.historyTimePrefix)}
                <span className="text-[#e9c578] italic">
                  {t(locale, pageCopy.historyTimeHighlight)}
                </span>
                {t(locale, pageCopy.historyTimeSuffix)}
              </h2>
              <p className="mt-5 max-w-[42ch] text-[1rem] leading-relaxed text-[#d3def2] sm:text-[1.12rem]">
                {t(locale, pageCopy.historyTimeDescription)}
              </p>
            </div>
            <Link
              className="inline-flex h-14 min-w-[220px] items-center justify-center bg-[#dfbb6f] px-8 font-label text-[0.95rem] font-bold uppercase tracking-[0.12em] text-[#4b3d17] transition-colors hover:bg-[#e8c983]"
              href={localizedPath(locale, "contact")}
            >
              {t(locale, pageCopy.historyTimeCta)}
            </Link>
          </div>
        </div>
      </section>
      <section className="mission_values full-bleed bg-[#dce2ec] mt-16">
        <div className="relative isolate overflow-hidden">
          <Image
            alt={t(locale, {
              en: "Abstract architecture and city background",
              zh: "建筑与城市背景图",
            })}
            className="object-cover"
            fill
            sizes="100vw"
            src={ABOUT_MEDIA.missionValuesBg}
          />

          <div className="relative grid min-h-[280px] md:min-h-[340px] md:grid-cols-2">
            <article className="flex items-center justify-center border-b border-white/60 px-6 py-10 md:border-b-0 md:border-r md:px-10 md:py-14">
              <div className="w-full text-center">
                <p className="text-[1rem] font-medium tracking-[0.02em] text-[#1459d8] md:text-[1.5rem]">
                  {t(locale, pageCopy.missionValuesMissionLabel)}
                </p>
                <h3 className="mt-6 font-headline text-[1.5rem] font-black leading-tight text-[#1459d8] md:text-[2.5rem]">
                  {t(locale, pageCopy.missionValuesMissionText)}
                </h3>
                <div className="mx-auto mt-6 h-1 w-14 bg-[#1257d9]" />
              </div>
            </article>

            <article className="flex items-center justify-center px-6 py-10 md:px-10 md:py-14">
              <div className="w-full text-center">
                <p className="text-[1rem] font-medium tracking-[0.02em] text-[#2f3440] md:text-[1.5rem]">
                  {t(locale, pageCopy.missionValuesValuesLabel)}
                </p>
                <div className="mt-6 font-headline text-[1.2rem] font-black leading-tight text-[#2d303b] md:text-[2.5rem]">
                  {t(locale, pageCopy.missionValuesValuesText)}
                </div>
                <div className="mx-auto mt-6 h-1 w-14 bg-[#2f3440]" />
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
