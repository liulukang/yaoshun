# 部署：Vercel + Docker + Nginx

## Vercel

- 使用标准 Next.js 构建与部署流程。
- 生产环境配置完整站点域名：`NEXT_PUBLIC_SITE_URL=https://<your-domain>`。
- 环境变量在项目级统一管理，仅保留实际使用项，例如站点域名、GA、Google Ads 与搜索引擎验证。

## Docker

- 使用多阶段构建。
- 运行层统一用 Nginx 托管构建产物。
- 公共环境变量通过 build args 注入。

## Nginx

- 开启 gzip。
- 静态资源长缓存 + HTML no-cache。
- 增加基础安全响应头。
- 提供 `/healthz` 健康检查。
- 使用 `try_files` 支持静态路由回退。
