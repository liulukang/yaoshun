# 部署：Pages + Docker + Nginx

## GitHub Pages

- 使用项目站点模式：`/<repo>/`。
- 构建时设置：
  - `NEXT_PUBLIC_BASE_PATH=/<repo>`
  - `NEXT_PUBLIC_SITE_URL=https://<owner>.github.io/<repo>`
- 流水线标准步骤：install -> build -> upload artifact -> deploy。

## Docker

- 使用多阶段构建。
- 运行层统一用 Nginx 托管静态文件。
- 公共环境变量通过 build args 注入。

## Nginx

- 开启 gzip。
- 静态资源长缓存 + HTML no-cache。
- 增加基础安全响应头。
- 提供 `/healthz` 健康检查。
- 使用 `try_files` 支持静态路由回退。
