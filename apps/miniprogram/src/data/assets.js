// Runtime image URLs served from Tencent COS.
// The custom media domain is currently HTTP-only; use COS's HTTPS endpoint until its certificate is ready.
const CDN_BASE = 'https://yaoshun-1255596634.cos.ap-seoul.myqcloud.com/miniprogram/images'
const image = (path) => `${CDN_BASE}/${path}`

const images = {
  // Official website originals and mobile crops used by the ToC pages.
  tentScene: image('official/tent-scene.webp'),
  homeHero: image('official/home-hero-ai.webp'),
  brandHero: image('official/brand-hero-ai.webp'),
  contactHero: image('official/contact-hero-ai.webp'),
  play: {
    castle: image('play/play-castle.webp'),
    tent: image('play/play-tent.webp'),
    space: image('play/play-space.webp'),
    tunnel: image('play/play-tunnel.webp'),
    rocket: image('play/play-rocket.webp'),
    reading: image('play/play-reading.webp'),
    dome: image('play/play-dome.webp'),
    pirate: image('play/play-pirate.webp')
  },
  brandScene: image('official/building-scene.webp'),
  inspection: image('inspection.webp'),

  catalog: {
    '1600884595638': [image('catalog/1600884595638-1.webp'), image('catalog/1600884595638-2.webp')],
    '1600898789412': [image('catalog/1600898789412-1.webp'), image('catalog/1600898789412-2.webp')],
    '1600900125789': [image('catalog/1600900125789-1.webp'), image('catalog/1600900125789-2.webp')],
    '1601110728943': [image('catalog/1601110728943-1.webp'), image('catalog/1601110728943-2.webp')],
    '1601213973459': [image('catalog/1601213973459-1.webp'), image('catalog/1601213973459-2.webp')],
    '1601214840405': [image('catalog/1601214840405-1.webp'), image('catalog/1601214840405-2.webp')],
    '1601313719232': [image('catalog/1601313719232-1.webp'), image('catalog/1601313719232-2.webp')],
    '1601316497567': [image('catalog/1601316497567-1.webp'), image('catalog/1601316497567-2.webp')],
    '1601316583146': [image('catalog/1601316583146-1.webp'), image('catalog/1601316583146-2.webp')],
    '1601362237263': [image('catalog/1601362237263-1.webp'), image('catalog/1601362237263-2.webp')],
    '1601724919450': [image('catalog/1601724919450-1.webp'), image('catalog/1601724919450-2.webp')],
    '1601728749802': [image('catalog/1601728749802-1.webp'), image('catalog/1601728749802-2.webp')],
    '1601729143208': [image('catalog/1601729143208-1.webp'), image('catalog/1601729143208-2.webp')],
    '1601729187617': [image('catalog/1601729187617-1.webp'), image('catalog/1601729187617-2.webp')],
    '1601730326005': [image('catalog/1601730326005-1.webp'), image('catalog/1601730326005-2.webp')],
    '1601730435470': [image('catalog/1601730435470-1.webp'), image('catalog/1601730435470-2.webp')],
    '2026050701': [image('bestsellers/2026050701.webp'), image('catalog/2026050701-2.webp')],
    '2026050702': [image('bestsellers/2026050702.webp'), image('catalog/2026050702-2.webp')],
    '2026050703': [image('bestsellers/2026050703.webp'), image('catalog/2026050703-2.webp')],
    '2026050704': [image('bestsellers/2026050704.webp'), image('catalog/2026050704-2.webp')],
    '2026050705': [image('bestsellers/2026050705.webp'), image('catalog/2026050705-2.webp')],
    '2026050706': [image('bestsellers/2026050706.webp'), image('catalog/2026050706-2.webp')],
    '2026050707': [image('bestsellers/2026050707.webp'), image('catalog/2026050707-2.webp')],
    '2026050708': [image('catalog/2026050708-1.webp'), image('catalog/2026050708-2.webp')],
  },
  bestsellers: {
    '2026050701': image('bestsellers/2026050701.webp'),
    '2026050702': image('bestsellers/2026050702.webp'),
    '2026050703': image('bestsellers/2026050703.webp'),
    '2026050704': image('bestsellers/2026050704.webp'),
    '2026050705': image('bestsellers/2026050705.webp'),
    '2026050706': image('bestsellers/2026050706.webp'),
    '2026050707': image('bestsellers/2026050707.webp')
  }
}

module.exports = { images }
