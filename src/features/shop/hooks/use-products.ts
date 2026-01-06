import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getProduct, getProducts } from "../services/products";
import { queryKeys } from "@/lib/query-keys";
import { Product } from "@/types/product";

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

export interface ProductFilters {
  category?: string;
  size?: string;
  query?: string;
  sort?: SortOption;
}

const filterProducts = (products: Product[], filters: ProductFilters) => {
  const normalizedQuery = filters.query?.toLowerCase().trim();

  let list = [...products];

  if (filters.category) {
    list = list.filter(
      (product) =>
        product.category.toLowerCase() === filters.category?.toLowerCase(),
    );
  }

  if (filters.size) {
    list = list.filter((product) => product.sizes?.includes(filters.size!));
  }

  if (normalizedQuery) {
    list = list.filter(
      (product) =>
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery),
    );
  }

  switch (filters.sort) {
    case "price-asc":
      list = list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list = list.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      list = list.sort((a, b) => Number(b.status === "new") - Number(a.status === "new"));
      break;
    default:
      list = list.sort((a, b) => Number(b.status === "featured") - Number(a.status === "featured"));
  }

  return list;
};

export const useProducts = (filters: ProductFilters = {}) => {
  const query = useQuery({
    queryKey: queryKeys.products,
    queryFn: getProducts,
  });

  const filtered = useMemo(() => {
    if (!query.data) return [];
    return filterProducts(query.data, filters);
  }, [query.data, filters]);

  return { ...query, products: filtered };
};

export const useProduct = (id: string) =>
  useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  });

export const useCategories = () =>
  useQuery({
    queryKey: queryKeys.categories,
    queryFn: getCategories,
  });

