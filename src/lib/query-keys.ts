export const queryKeys = {
  products: ["products"] as const,
  product: (id: string | number) => ["product", id] as const,
  categories: ["categories"] as const,
  category: (id: string | number) => ["category", id] as const,
  brands: ["brands"] as const,
  brand: (id: string | number) => ["brand", id] as const,
};

