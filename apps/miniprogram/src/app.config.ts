export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/products/products',
    'pages/product-detail/product-detail',
    'pages/play/play',
    'pages/brand/brand',
    'pages/faq/faq',
    'pages/contact/contact'
  ],
  window: {
    navigationBarTitleText: 'LONDY 玩具',
    navigationBarBackgroundColor: '#fff8f1',
    navigationBarTextStyle: 'black',
    backgroundColor: '#fff8f1',
    backgroundTextStyle: 'light'
  },
  tabBar: {
    color: '#8c6a4e',
    selectedColor: '#f97316',
    backgroundColor: '#fffdf9',
    borderStyle: 'white',
    list: [
      { pagePath: 'pages/index/index', text: '玩起来', iconPath: 'assets/icons/home.png', selectedIconPath: 'assets/icons/home-active.png' },
      { pagePath: 'pages/products/products', text: '选玩具', iconPath: 'assets/icons/products.png', selectedIconPath: 'assets/icons/products-active.png' },
      { pagePath: 'pages/play/play', text: '拼搭屋', iconPath: 'assets/icons/play.png', selectedIconPath: 'assets/icons/play-active.png' },
      { pagePath: 'pages/brand/brand', text: '乐艺迪', iconPath: 'assets/icons/brand.png', selectedIconPath: 'assets/icons/brand-active.png' },
      { pagePath: 'pages/faq/faq', text: '帮助', iconPath: 'assets/icons/profile.png', selectedIconPath: 'assets/icons/profile-active.png' }
    ]
  }
})
