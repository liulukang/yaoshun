# LONDY 微信小程序（Taro）

当前目录是小程序主实现，使用 React + Taro 4，同时支持 H5 和微信小程序构建。

## 常用命令

```bash
# 类型检查
pnpm --filter @yaoshun/miniprogram check

# H5 开发预览
pnpm --filter @yaoshun/miniprogram dev:h5

# 微信开发者工具构建产物
pnpm --filter @yaoshun/miniprogram build:weapp

# H5 生产构建
pnpm --filter @yaoshun/miniprogram build:h5
```

微信开发者工具导入 `apps/miniprogram/dist/weapp`，H5 开发服务器使用独立的 `apps/miniprogram/dist/h5` 输出目录，用于逐页检查响应式布局、图片裁切和页面底部留白。
主导航为“玩起来、选玩具、拼搭屋、乐艺迪、帮助”，公司联系方式保留为独立页面入口。
H5 预览地址为 `http://localhost:8020/`（局域网可使用 `http://192.168.0.108:8020/`）。

产品目录内容根据官网 `apps/website/data/1688-products/toys` 整理为面向家庭用户的 7 款主推套装。图片已上传至腾讯 COS 的 `miniprogram/` 目录。自定义域名 `media.yaoshuntoys.com` 暂未支持 HTTPS，当前运行时先使用 `yaoshun-1255596634.cos.ap-seoul.myqcloud.com` 的 HTTPS 地址；证书配置完成后再切换到自定义域名，并将当前使用的 COS 域名加入微信公众平台的业务域名 / downloadFile 合法域名。

首页和拼搭屋的生活方式图来自官网 `apps/website/public/site`，已为手机卡片裁切并压缩到适合小程序首屏的尺寸，产品结构与包装图保持官网原图，避免图文或商品信息失真。

小程序图片统一使用 WebP，并按使用场景控制分辨率：Hero 图片为 900×1125，商品详情图最大 900px，商品卡片图最大 800px，拼搭玩法图最大 900px，页面场景图最大 960px，首页手机裁切图为 800×800。图片保持原始宽高比，避免拉伸变形。运行时业务图片统一从腾讯 COS 加载，项目包内仅保留微信底部导航所需的 64×64 PNG 图标。

旧的原生微信小程序版本保存在 `apps/old`，仅作为迁移参考。
