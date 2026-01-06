export const queryKeys = {
  products: ["products"] as const,
  product: (id: string | number) => ["product", id] as const,
  categories: ["categories"] as const,
};

