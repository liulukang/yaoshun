const factoryImage1 =
  "https://www.yaoshuntoys.com/media/site/about/image-copy-7-optimized.webp";
const factoryImage2 =
  "https://www.yaoshuntoys.com/media/site/about/image-copy-8-optimized.webp";
const factoryImage3 =
  "https://www.yaoshuntoys.com/media/site/solutions/extrusion-workshop-overview.webp";
const factoryImage4 = "https://www.yaoshuntoys.com/media/site/home/about-factory-cf2e79b208dc.webp";
const factoryImage5 =
  "https://www.yaoshuntoys.com/media/site/about/warehouse.jpg";
const factoryImage6 =
  "https://www.yaoshuntoys.com/media/site/solutions/equipment/injection-molding-workshop-overview.webp";

export const sourceFactorySectionCopy = {
  eyebrow: {en: "Manufacturing", zh: "生产制造"},
  title: {en: "Our Source Factory", zh: "我们的源头工厂"},
  description: {
    en: "Our Dongguan source-factory system covers extrusion lines, injection molding capacity, clean processing areas, assembly stations, and inspection checkpoints for building toys, custom toys, and plastic support products.",
    zh: "工厂涵盖挤出、注塑、组装、包装和检测，可生产搭建玩具、定制玩具及相关塑胶产品。",
  },
} as const;

export const factoryItems = [
  {title: {en: "Factory Exterior", zh: "工厂外景"}, image: factoryImage4},
  {title: {en: "Extrusion Production Line", zh: "挤出生产线"}, image: factoryImage2},
  {title: {en: "Automatic Cutting Line", zh: "自动切管生产线"}, image: factoryImage1},
  {title: {en: "Injection Molding Machine", zh: "注塑设备"}, image: factoryImage6},
  {title: {en: "Production Workshop", zh: "生产车间"}, image: factoryImage3},
  {title: {en: "Packing Warehouse", zh: "包装仓储区"}, image: factoryImage5},
] as const;

export const cooperationPartnersSectionCopy = {
  eyebrow: {en: "Partners", zh: "合作伙伴"},
  title: {en: "Cooperation Partners", zh: "合作伙伴"},
  expandLabel: {en: "Show more", zh: "显示更多"},
  collapseLabel: {en: "Show less", zh: "收起"},
  description: {
    en: "Selected partner and customer brands reflect Yaoshun's ongoing collaboration across toy OEM/ODM, plastic components, and supporting manufacturing programs.",
    zh: "我们为品牌提供玩具 OEM/ODM、塑胶部件及相关生产服务，以下为部分合作伙伴。",
  },
} as const;

export const partnerItems = [
  {label: {en: "VEVOR", zh: "VEVOR"}, image: "https://www.yaoshuntoys.com/media/site/partners/vevor-logo-73f12b5434b3.webp"},
  {label: {en: "Dreame", zh: "追觅"}, image: "https://www.yaoshuntoys.com/media/site/partners/dreame-logo-99f1de181ea0.webp"},
  {label: {en: "Narwal", zh: "云鲸"}, image: "https://www.yaoshuntoys.com/media/site/partners/narwal-logo-767be146451d.webp"},
  {
    label: {en: "Guowin Optoelectronics", zh: "国盈光电"},
    image: "https://www.yaoshuntoys.com/media/site/partners/guowin-logo-12124d2a63c8.webp",
  },
  {
    label: {en: "Langxin Medical", zh: "朗信医疗"},
    image: "https://www.yaoshuntoys.com/media/site/partners/langxin-medical-logo-3a664ec4d4f0.webp",
  },
  {label: {en: "Baoxin Cable", zh: "宝新电缆"}, image: "https://www.yaoshuntoys.com/media/site/partners/baoxin-cable-logo-dc5716180ca1.webp"},
  {label: {en: "OML", zh: "欧曼"}, image: "https://www.yaoshuntoys.com/media/site/partners/oml-logo-4698d41bd9cc.webp"},
] as const;
