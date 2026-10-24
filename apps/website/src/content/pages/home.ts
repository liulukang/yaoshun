import type {LocalizedText, ShowcaseProductSeed} from "@/content/types";

const whyImage = "/site/home/why-choose-yaoshun.webp";
const aboutImage = "/site/home/about-factory.webp";

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
    image: "/site/home/toy-type-building.webp",
  },
  {
    key: "sports",
    label: {en: "Sports & Outdoor Play", zh: "运动户外"},
    image: "/site/home/toy-type-sports.webp",
  },
  {
    key: "robots",
    label: {en: "Robots & RC Toys", zh: "机器人遥控"},
    image: "/site/home/toy-type-robots.webp",
  },
  {
    key: "drones",
    label: {en: "Drones", zh: "无人机"},
    image: "/site/home/toy-type-drones.webp",
  },
];
