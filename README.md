# yaoshun monorepo

Yaoshun 的 pnpm workspace，用于管理企业官网以及后续后台、服务端应用。

## 项目结构

```text
apps/
  website/   Next.js 企业官网
  admin/     预留的运营后台工作区
  server/    预留的服务端工作区
```

当前主要代码集中在 `apps/website`。`admin` 与 `server` 目前仅保留占位目录，避免 README 描述超前于实际实现。

## 常用命令

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

## 官网自动部署

GitHub Actions 构建并验证官网镜像，推送 GHCR 后通过 SSH 部署到腾讯云 Lighthouse。
`main` 分支相关变更和 `v*.*.*` 标签触发发布，也支持手动运行；Pull request 只执行验证。
官网复用服务器上现有 Caddy 的 HTTPS 入口，图片暂时继续读取原 Vercel Blob。

首次配置、环境变量、阿里云 DNS 切换和回滚见 [官网部署手册](deploy/README.md)。

## 证书图片上传

根目录 `images/` 中的证书图片需要先转换成 WebP，再上传到 Vercel Blob：

```bash
# 只在本地转换、压缩并规范文件名
pnpm images:certificates:prepare

# 转换后上传，并自动更新网站中的证书图片 URL
pnpm images:certificates:upload
```

上传流程会把图片限制在 1600×1800 像素以内，使用 WebP 质量 86，并采用无随机后缀的英文短横线文件名。上传需要在 `apps/website/.env.local` 中配置 `BLOB_READ_WRITE_TOKEN`。

## 技术基线

- 包管理：`pnpm` workspace
- 官网：Next.js 16、React 19、TypeScript、Tailwind CSS
- 共享配置：根目录 `tsconfig.base.json`
- 运行时环境：各应用自己的 `.env*` 文件
