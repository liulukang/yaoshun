# 官网生产部署

官网从 Vercel 迁移到腾讯云 Lighthouse `119.28.153.42`，SSH 用户为 `ubuntu`。
域名仍由阿里云解析，图片暂时继续使用现有 Vercel Blob。此次部署不迁移 COS。

流程与 Lucon 一致：GitHub Actions 检查代码、构建 Docker 镜像、冒烟验证后推送 GHCR，
再通过 SSH 在服务器上拉取固定 digest，并用 Docker Compose 更新官网。
服务器已运行 Lucon；本项目接入 `lucon_default` 网络并复用 `lucon-edge-1` 的 Caddy。
容器名称使用 `yaoshun-website`，避免与 Lucon 的 `website` 网络别名冲突。

## 发布触发

- `main` 分支推送官网、部署配置或工作区构建文件的变更后自动发布。
- 推送 `v*.*.*` 标签也会发布；标签必须指向 `main` 历史中的提交。
- 在 Actions → **Website CI and deploy** 中手动运行，可选择 `main` 或合法版本标签。
- Pull request 只执行检查、镜像构建和冒烟测试，不发布生产，也不访问部署密钥。
- 发布串行运行；线上使用镜像 digest，不依赖可变的 `latest` 标签。

## 1. GitHub 首次配置

仓库：<https://github.com/yaoshuntoys/yaoshun>。
在 Settings → Secrets and variables → Actions 配置以下仓库 Secrets：

| Secret | 值 |
| --- | --- |
| `DEPLOY_HOST` | `119.28.153.42` |
| `DEPLOY_USER` | `ubuntu` |
| `DEPLOY_SSH_PRIVATE_KEY` | 本机 `~/.ssh/lucon.pem` 的内容 |
| `DEPLOY_KNOWN_HOSTS` | 已核对的服务器主机公钥记录 |

`DEPLOY_KNOWN_HOSTS` 从已验证的本机记录取得：

```bash
ssh-keygen -F 119.28.153.42
```

构建镜像使用仓库自带的 `GITHUB_TOKEN`，无需新增云厂商密钥。
部署默认同样用本次 workflow 的短期 token 拉取镜像；GHCR 包须关联此仓库并允许 Actions 读取。
如果组织策略不允许，额外配置 `GHCR_USERNAME` 和有 `read:packages` 权限的 `GHCR_PULL_TOKEN`。
部署在服务器上使用临时 Docker 登录目录，不覆盖 Lucon 的现有 GHCR 登录。

网站公开配置在构建时写入浏览器代码，需要放入仓库 **Actions Variables**：

```text
NEXT_PUBLIC_SITE_URL=https://www.yaoshuntoys.com
NEXT_PUBLIC_ENABLE_THIRD_PARTY_TRACKING=true
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
NEXT_PUBLIC_GOOGLE_ADS_ID
NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_SEND_TO
NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION_SEND_TO
NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_CURRENCY=USD
NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_VALUE=1
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
```

Google 的配置沿用当前 `apps/website/.env.local` 中的公开值。
`GOOGLE_SITE_VERIFICATION` 的旧服务端配置应复制到 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`。
修改 `NEXT_PUBLIC_*` 后必须重新运行发布；仅修改服务器环境文件不会改变浏览器代码。
`ASSET_BASE_URL` 暂时留空，继续读取原 Blob；以后迁移图片时再设置完整 HTTPS 图片根路径并重建。

已经登录 GitHub CLI 且具有仓库写入权限时，可在仓库根目录一次性配置以上 Secrets 和公开 Variables：

```bash
node deploy/setup-github.mjs "$HOME/.ssh/lucon.pem"
```

此命令只向 GitHub 写入明确列出的部署密钥与公开变量，不上传 `.env.local`。
私钥以标准输入传入 `gh secret set`，不会输出到日志或出现在命令行参数中。

## 2. 服务器首次初始化

Docker Engine、Compose、Lucon 和 Caddy 已存在，无需重新安装或绑定 80/443。
先在服务器准备官网运行环境：

```bash
sudo install -d -o ubuntu -g ubuntu -m 700 /opt/yaoshun
install -d -m 700 /opt/yaoshun/apps/website /opt/yaoshun/releases
install -m 600 /dev/null /opt/yaoshun/apps/website/.env.production
```

填写 `deploy/website.env.example` 列出的运行时邮件配置，沿用原网站的 Resend 参数：

```dotenv
CONTACT_FORM_TO_EMAIL=info@yaoshuntoys.com
RESEND_API_KEY=<原网站 Resend API Key>
RESEND_FROM_EMAIL=<原网站已验证的发件邮箱>
RESEND_TO_EMAIL=info@yaoshuntoys.com
```

网站只读取公开 Blob 图片，无需 `BLOB_READ_WRITE_TOKEN`；图片上传脚本仍可在本地使用。
运行时文件由服务器维护，工作流只上传 `infra/` 和 `deploy/`，不会覆盖该文件。

确保部署用户可写 `/opt/lucon/infra/caddy/Caddyfile` 并能执行 Docker 命令。
发布脚本在现有 Caddyfile 中维护 `BEGIN/END YAOSHUN WEBSITE` 标记的独立配置段，
先校验再 reload；失败时恢复原文件。其他站点配置保持原样。
若以后通过 Lucon 的发布覆盖了 Caddyfile，需要重新运行本项目发布以恢复此段；
也可以将该段同步到 Lucon 的部署源，作为两个项目共享入口的长期配置。

## 3. 域名切换

阿里云 DNS 为 `yaoshuntoys.com` 设置：

| 主机记录 | 类型 | 值 |
| --- | --- | --- |
| `@` | A | `119.28.153.42` |
| `www` | A | `119.28.153.42` |

替换这两个主机名当前指向 Vercel 的冲突 A/CNAME 记录；
若存在指向旧站的 AAAA，也需同步处理。邮件 MX、SPF、DKIM、DMARC 等记录不属于此次切换。
服务器的 80/443 已对现有 Lucon 开放，Caddy 会在解析生效后自动签发和续期 HTTPS 证书。
根域名和 HTTP 请求都直接跳转到 `https://www.yaoshuntoys.com`，并保留原路径与参数。

首次发布前完成解析切换，否则工作流最后的公网验收会访问旧 Vercel。
先验证新站及图片可正常访问，再停用旧 Vercel 计算服务；保留 Blob 存储。

## 4. 验收与运维

```bash
# 本地：验证完整官网路由、询盘参数校验及图片代理；不会发送真实询盘。
node deploy/smoke.mjs https://www.yaoshuntoys.com --media

# 服务器：查看当前固定镜像和容器状态。
cat /opt/yaoshun/current/.image
WEBSITE_IMAGE="$(cat /opt/yaoshun/current/.image)" docker compose \
  -f /opt/yaoshun/current/infra/compose.prod.yaml ps
WEBSITE_IMAGE="$(cat /opt/yaoshun/current/.image)" docker compose \
  -f /opt/yaoshun/current/infra/compose.prod.yaml logs --tail=100 yaoshun-website
```

`/api/health` 用于容器存活检查，发布还会检查页面、SEO 文件、Markdown、错误询盘和图片优化。
Compose 只在网站容器健康后继续更新 Caddy，发布错误会恢复上一版镜像和部署清单。
首次发布没有上一版时，失败会直接退出并保留错误日志。
公网 HTTPS 失败会让工作流失败；此时检查 DNS 和 Caddy 日志。

手动回滚到上一个成功版本：

```bash
bash /opt/yaoshun/previous/deploy/release.sh "$(cat /opt/yaoshun/previous/.image)"
```

`current` 和 `previous` 指向成功发布的清单目录，旧镜像和目录留存以便回滚。
网站的 Next.js 图片缓存位于 `yaoshun_next_cache`，与 Lucon 的数据卷独立。
正常发布不需要 `docker compose down`，也不要删除已有数据卷。
