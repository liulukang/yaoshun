import {productCollections} from "@/content/pages/products";

type CatalogItem = {
  collection: string;
  bestseller?: boolean;
};

export function orderProductsForCatalog<T extends CatalogItem>(
  catalog: readonly T[],
  category?: string,
): T[] {
  const prioritized = [...catalog].sort(
    (a, b) => Number(Boolean(b.bestseller)) - Number(Boolean(a.bestseller)),
  );

  if (category) {
    return prioritized.filter((item) => item.collection === category);
  }

  const collections = new Map<string, T[]>(
    productCollections.map(({key}) => [key, []]),
  );

  for (const item of prioritized) {
    const items = collections.get(item.collection);
    if (items) {
      items.push(item);
    } else {
      collections.set(item.collection, [item]);
    }
  }

  // Take one product per collection before returning to the same collection.
  const ordered: T[] = [];
  for (let index = 0; ordered.length < prioritized.length; index += 1) {
    for (const items of collections.values()) {
      const item = items[index];
      if (item) {
        ordered.push(item);
      }
    }
  }

  return ordered;
}
