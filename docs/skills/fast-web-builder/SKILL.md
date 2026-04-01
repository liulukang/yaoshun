---
name: fast-web-builder
description: 从 0 到 1 新建企业官网多页面项目的通用 skill。默认技术栈为 Next.js App Router + TypeScript + Tailwind + next-intl，支持 SEO、GTM/GA/Google Ads、联系我们留资、Vercel 或 Docker + Nginx 部署，并通过 section 变体注册表实现页面结构多样化与可扩展架构。
---

# Fast Web Builder

## 语言要求（强制）

- 默认使用中文进行沟通、交付说明与验收汇报。
- 用户明确要求英文时，才切换英文输出。

## 定位（强制）

- 本 skill 用于“从 0 到 1 新建项目”。
- 默认不依赖、不参考现有项目目录。
- 若用户要求在旧项目改造，应先确认是否切换到“改造模式”。

## 目标

- 站点类型：企业官网 + 协议页（隐私政策）
- 技术栈：Next.js App Router + TS + Tailwind + next-intl
- 部署策略：标准 Next.js 构建与部署（不强制 `output: export`）
- 架构策略：配置驱动 + 模块化 + Section Variant Registry

## 何时触发

- 新建企业官网多页面
- 需要移动端适配、SEO、埋点、广告转化
- 需要 Vercel、Docker、Nginx 部署
- 需要“页面结构多样化且可持续扩展”

## 默认强约束

1. 强制包含页面：`首页 + 联系我们 + 隐私政策`
2. 首页必须包含可直接提交的留资表单（不是只放“联系我们”按钮）
3. 联系页必须支持留资表单提交（不是只展示联系方式）
4. 默认中英双语（`/zh`、`/en`），明确单语需求时可降级
5. 所有页面必须移动端可用
6. 默认启用 SEO + GTM + Google Ads 转化追踪
7. 路由可按需求推断，但必须满足必备页面

## 执行流程（仅项目初始化）

1. 根据需求确定项目初始化范围：技术栈、是否双语、是否静态导出。
2. 创建项目目录结构与基础路由骨架（只建框架，不填充完整业务页面）。
3. 安装并配置基础依赖（Next.js、TypeScript、Tailwind、next-intl 等）。
4. 完成基础配置文件初始化（`next.config`、`tsconfig`、Tailwind、环境变量模板）。
5. 初始化公共布局与全局样式入口，确保项目可启动、可构建。
6. 输出初始化结果与后续待办，不在本流程内继续页面实现与部署细节。

## 架构规范

- 页面装配层：页面读取配置并装配 section。
- 区块组件层：section 组件专注渲染与交互。
- 变体注册表：每类 section 支持多个布局变体，通过配置选择。
- 内容集中管理：文案和数据结构放入 content/schema，不散落在 page 组件。

参考：

- [references/01-architecture-and-routing.md](references/01-architecture-and-routing.md)
- [references/02-visual-and-mobile.md](references/02-visual-and-mobile.md)

## 视觉与交互规范

- 布局：优先错落 Grid / 流体留白，避免整站同一骨架。
- 色彩：允许高饱和、撞色、流体渐变，但保持品牌主色锚点。
- 质感：Tailwind 实现玻璃拟态、微渐变、柔和阴影、非对称几何。
- 动效：仅 CSS + Intersection Observer，避免重型动效库。

## SEO 与增长规范

- 技术 SEO：metadata、canonical、hreflang、robots、sitemap。
- 结构化数据：Organization、WebSite、FAQPage、Product。
- 追踪：GTM 统一注入；GA/Ads 在 GTM 中管理。
- 默认事件：`page_view`、`cta_click`、`form_submit`、`whatsapp_click`、`email_click`、`phone_click`。
- Cookie 合规：未同意前禁用分析与广告事件。

参考：

- [references/03-seo-and-tracking.md](references/03-seo-and-tracking.md)

## 留资规范

- 首页与联系页均需提供留资表单；建议复用同一表单组件。
- 表单必选字段：姓名、邮箱、信息。
- 默认提交到 `NEXT_PUBLIC_FORM_ENDPOINT`（第三方表单网关或 webhook）。
- 默认防垃圾：honeypot + 最小提交间隔限制 + 可选验证码插槽。

## 部署规范

- Vercel：使用标准 Next.js 部署流程，确保生产环境变量完整。
- Docker：多阶段构建 + Nginx 静态托管。
- Nginx：gzip、缓存分级、安全头、`/healthz`、404 处理。

参考：

- [references/04-deploy-vercel-docker-nginx.md](references/04-deploy-vercel-docker-nginx.md)

## 验收

最终核对清单见：

- [references/05-acceptance-checklist.md](references/05-acceptance-checklist.md)
