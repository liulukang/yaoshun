import type {LocalizedText, ShowcaseProductSeed} from "@/content/types";

const whyImage = "https://www.yaoshuntoys.com/media/site/home/why-choose-yaoshun-90b96715270c.webp";
const aboutImage = "https://www.yaoshuntoys.com/media/site/home/about-factory-cf2e79b208dc.webp";

export const homePageImages = {
  why: whyImage,
  about: aboutImage,
} as const;

// 首页只展示当前主推的四类，完整分类仍由产品目录维护。
export const homeProductCollections: Array<{
  key: ShowcaseProductSeed["collection"];
  label: LocalizedText;
  image: string;
}> = [
  {
    key: "building",
    label: {en: "Fort Building Kits", zh: "堡垒拼搭"},
    image: "https://www.yaoshuntoys.com/media/site/home/toy-type-building-f0b39adab27c.webp",
  },
  {
    key: "sports",
    label: {en: "Sports & Outdoor Play", zh: "运动户外"},
    image: "https://www.yaoshuntoys.com/media/site/home/toy-type-sports-1addb2e76a68.webp",
  },
  {
    key: "robots",
    label: {en: "Robots & RC Toys", zh: "机器人遥控"},
    image: "https://www.yaoshuntoys.com/media/site/home/toy-type-robots-1806ac628dcf.webp",
  },
  {
    key: "drones",
    label: {en: "Drones", zh: "无人机"},
    image: "https://www.yaoshuntoys.com/media/site/home/toy-type-drones-edec7092a160.webp",
  },
];
