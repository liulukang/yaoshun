import type { Locale } from "@/lib/i18n";
import type { RouteKey } from "@/lib/routes";

export type LocalizedText = Partial<Record<Locale, string>>;
export type LocalizedKeywords = Partial<Record<Locale, string[]>>;

export type Product = {
  slug: string;
  title: LocalizedText;
  badge: LocalizedText;
  summary: LocalizedText;
  detail: LocalizedText;
  moq: LocalizedText;
  materials: LocalizedText;
  useCases: LocalizedText[];
  highlights: LocalizedText[];
  specs: Array<{ label: LocalizedText; value: LocalizedText }>;
  seoKeywords: LocalizedKeywords;
  image: string;
};

export const pageLabels: Record<RouteKey, LocalizedText> = {
  home: { en: "Home", zh: "首页" },
  products: { en: "Products", zh: "产品目录" },
  solutions: { en: "Solutions", zh: "解决方案" },
  about: { en: "About Us", zh: "关于我们" },
  news: { en: "News", zh: "新闻中心" },
  faq: { en: "FAQ", zh: "FAQ" },
  factory: { en: "Factory", zh: "工厂展示" },
  compliance: { en: "Compliance", zh: "资质合规" },
  contact: { en: "Get a Quote", zh: "获取报价" },
  privacy: { en: "Privacy", zh: "隐私政策" },
  terms: { en: "Terms", zh: "服务条款" },
};

export const desktopNav: RouteKey[] = [
  "home",
  "products",
  "solutions",
  "about",
  "news",
  "faq",
];

export const siteSeo = {
  defaultKeywords: {
    en: [
      "Dongguan Yaoshun Technology Co., Ltd.",
      "Dongguan Yaoshun Technology",
      "Yaoshun",
      "Yaoshun toy manufacturer",
      "plastic extrusion equipment manufacturer",
      "precision injection molding factory",
      "ai smart toy manufacturer",
      "diy children toy manufacturer",
      "toy manufacturer china",
      "b2b toy manufacturer",
      "oem toy manufacturer",
      "odm toy manufacturer",
      "educational toy supplier",
      "plastic profile extrusion supplier",
      "custom plastic manufacturing",
    ],
    zh: [
      "东莞市尧顺科技有限公司",
      "东莞市尧顺科技",
      "尧顺科技",
      "尧顺玩具工厂",
      "塑胶挤出设备厂家",
      "精密注塑工厂",
      "AI智能玩具厂家",
      "DIY儿童玩具厂家",
      "玩具制造厂家",
      "玩具OEM厂家",
      "玩具ODM厂家",
      "B2B玩具供应商",
      "塑胶型材厂家",
      "塑胶制品定制厂家",
      "全球接单源头工厂",
    ],
  },
};

export const sharedUi = {
  pageLinks: {
    eyebrow: { en: "Continue Exploring", zh: "继续浏览" },
    action: { en: "Open Page", zh: "打开页面" },
  },
  productCard: {
    action: { en: "Open Product Detail", zh: "查看详情" },
  },
  quoteForm: {
    title: { en: "Request a Quote", zh: "获取报价" },
    description: {
      en: "Share product direction, quantity, and timeline to start a structured quotation review.",
      zh: "填写产品方向、数量与时间要求，快速启动结构化报价评估。"
    },
    step: { en: "STEP 1 OF 1", zh: "第 1 步 / 共 1 步" },
    fields: {
      name: {
        label: { en: "Name", zh: "姓名" },
        placeholder: { en: "Your name", zh: "请输入姓名" },
      },
      company: {
        label: { en: "Company", zh: "公司名称" },
        placeholder: { en: "Your company name", zh: "请输入公司名称" },
      },
      email: {
        label: { en: "Email", zh: "邮箱" },
        placeholder: { en: "you@company.com", zh: "请输入邮箱" },
      },
      country: {
        label: { en: "Target Market / Country", zh: "目标市场 / 国家" },
        placeholder: { en: "e.g. US, Germany, UAE", zh: "例如：美国、德国、阿联酋" },
      },
      quantity: {
        label: { en: "Estimated Quantity", zh: "预估数量" },
        placeholder: { en: "e.g. 3000 units / SKU", zh: "例如：3000 件 / SKU" },
      },
      message: {
        label: { en: "Project Brief", zh: "项目需求说明" },
        placeholder: {
          en: "Include product type, material preference, packaging request, and target launch date.",
          zh: "请说明产品类型、材质偏好、包装要求与目标上市时间。",
        },
      },
    },
    submit: { en: "Submit For Evaluation", zh: "提交评估" },
    support: {
      en: "After submission, our team will follow up by email or WhatsApp. You can also reach us at {email} / {whatsapp}.",
      zh: "提交后我们会通过邮箱或 WhatsApp 跟进，也可直接联系 {email} / {whatsapp}。",
    },
  },
  siteShell: {
    mobileMenuAriaLabel: {
      en: "Toggle navigation menu",
      zh: "切换导航菜单",
    },
    mobileMenuLabel: { en: "Menu", zh: "菜单" },
    localeMenuLabel: { en: "Language / Region", zh: "语言 / 地区" },
    footerQuickLinks: { en: "Quick Links", zh: "快速链接" },
    footerContact: { en: "Contact", zh: "联系信息" },
    footerStayConnected: { en: "Business Identity", zh: "企业信息" },
    footerRegisteredNameLabel: { en: "Registered Name", zh: "企业名称" },
    footerSalesChannelLabel: { en: "Sales Channel", zh: "业务渠道" },
    footerWhatsappLabel: { en: "WhatsApp", zh: "WhatsApp" },
    footerLinkedinLabel: { en: "LinkedIn", zh: "LinkedIn" },
    footerWebsiteLabel: { en: "Web", zh: "官网" },
    footerMailLabel: { en: "Mail", zh: "邮箱" },
  },
};

export const companyProfile = {
  brand: {
    en: "Dongguan Yaoshun Technology",
    zh: "东莞市尧顺科技",
  },
  brandShort: {
    en: "Yaoshun",
    zh: "尧顺",
  },
  companyName: {
    en: "Dongguan Yaoshun Technology Co., Ltd.",
    zh: "东莞市尧顺科技有限公司",
  },
  tagline: {
    en: "20+ years focused on toy development and manufacturing, with plastic and extrusion support capabilities.",
    zh: "20 余年聚焦玩具研发与制造，并提供塑胶与挤出配套能力。",
  },
  seoDescription: {
    en: "Dongguan Yaoshun Technology Co., Ltd. (东莞市尧顺科技有限公司), founded in 2006, provides toy OEM/ODM development and production, with injection molding and extrusion capabilities as supporting services.",
    zh: "东莞市尧顺科技有限公司（Dongguan Yaoshun Technology Co., Ltd.）始创于 2006 年，主营玩具 OEM/ODM 开发与量产，并以注塑与挤出能力提供配套支持。",
  },
  businessType: {
    en: "Toy-focused OEM/ODM manufacturer with plastic process support",
    zh: "以玩具为主的 OEM/ODM 制造商，配套塑胶工艺能力",
  },
  expertise: [
    {
      en: "AI smart toys",
      zh: "AI 智能玩具",
    },
    {
      en: "DIY children toys",
      zh: "DIY 儿童玩具",
    },
    {
      en: "OEM and ODM manufacturing",
      zh: "OEM 与 ODM 制造",
    },
    {
      en: "assembly, packaging, and global delivery",
      zh: "组装、包装与全球交付",
    },
    {
      en: "precision injection molding products",
      zh: "精密注塑产品",
    },
    {
      en: "plastic extrusion equipment",
      zh: "塑胶挤出设备",
    },
    {
      en: "plastic extrusion products",
      zh: "塑胶挤出产品",
    },
    {
      en: "mold development and production",
      zh: "模具开发与生产",
    },
  ],
  serviceRegions: [
    { en: "North America", zh: "北美" },
    { en: "Europe", zh: "欧洲" },
    { en: "Middle East", zh: "中东" },
    { en: "Southeast Asia", zh: "东南亚" },
  ],
  contactLanguages: [
    { en: "English", zh: "英语" },
    { en: "Chinese", zh: "中文" },
  ],
  foundedYear: "2006",
  email: "sales@lai-toys.com",
  phone: "+86 186 6552 7489",
  whatsapp: "+86 186 6552 7489",
  linkedin: "https://www.linkedin.com/company/lai-toys-manufacturing",
  website: "https://www.19931015.xyz/",
  address: {
    en: "Room 201, Building 1, No.177 Yuanshan Road, Chashan Town, Dongguan, Guangdong, China",
    zh: "中国广东省东莞市茶山镇圆山路177号1号楼201室",
  },
};

export const placeholderImages = {
  companyHero: "/placeholders/company-hero.svg",
  factoryHero: "/placeholders/factory-hero.svg",
  factoryFloor: "/placeholders/factory-floor.svg",
  toyLearning: "/placeholders/toy-learning.svg",
  profileSeries: "/placeholders/profile-extrusion.svg",
  engineeringSupport: "/placeholders/engineering-support.svg",
  rdLab: "/placeholders/rd-lab.svg",
  craftsmanship: "/placeholders/craftsmanship.svg",
  complianceLab: "/placeholders/compliance-lab.svg",
  oemWorkflow: "/placeholders/oem-workflow.svg",
  projectEngineering: "/placeholders/project-engineering.svg",
} as const;

export const siteStats = [
  {
    value: { en: "20+ Years", zh: "20+ 年" },
    label: { en: "Plastic manufacturing experience", zh: "塑胶制造经验" },
  },
  {
    value: { en: "5 Lines", zh: "5 大业务" },
    label: { en: "Core business segments", zh: "核心业务板块" },
  },
  {
    value: { en: "7 Teams", zh: "7 大部门" },
    label: { en: "Full-process departments", zh: "全流程协同部门" },
  },
  {
    value: { en: "Global Orders", zh: "全球接单" },
    label: { en: "Cross-border delivery support", zh: "跨境交付支持" },
  },
];

export const routeJourneys: Record<RouteKey, RouteKey[]> = {
  home: ["products", "solutions", "contact"],
  products: ["solutions", "about", "contact"],
  solutions: ["products", "about", "contact"],
  about: ["news", "faq", "contact"],
  news: ["products", "solutions", "contact"],
  faq: ["products", "contact", "privacy"],
  contact: ["products", "privacy", "terms"],
  factory: ["about", "compliance", "contact"],
  compliance: ["faq", "contact", "terms"],
  privacy: ["terms", "contact", "products"],
  terms: ["privacy", "contact", "about"],
};
