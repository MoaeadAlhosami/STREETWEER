import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "../services/products";
import { queryKeys } from "@/lib/query-keys";
import { Product } from "@/types/product";

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

export interface ProductFilters {
  category?: string | number;
  size?: string;
  query?: string;
  sort?: SortOption;
  brand?: string | number;
}

const filterProducts = (products: Product[], filters: ProductFilters) => {
  const normalizedQuery = filters.query?.toLowerCase().trim();

  let list = [...products];

  if (filters.category) {
    list = list.filter((product) => {
      const productCategory = product.category;
      if (typeof productCategory === "string") {
        return productCategory.toLowerCase() === String(filters.category).toLowerCase();
      }
      return String(productCategory) === String(filters.category);
    });
  }

  if (filters.brand) {
    list = list.filter((product) => {
      return String(product.brand_id) === String(filters.brand);
    });
  }

  if (filters.size) {
    list = list.filter((product) => product.sizes?.includes(filters.size!));
  }

  if (normalizedQuery) {
    list = list.filter(
      (product) => {
        const title = product.title || product.name || "";
        const description = product.description || "";
        return (
          title.toLowerCase().includes(normalizedQuery) ||
          description.toLowerCase().includes(normalizedQuery)
        );
      }
    );
  }

  switch (filters.sort) {
    case "price-asc":
      list = list.sort((a, b) => (a.price || a.base_price || 0) - (b.price || b.base_price || 0));
      break;
    case "price-desc":
      list = list.sort((a, b) => (b.price || b.base_price || 0) - (a.price || a.base_price || 0));
      break;
    case "newest":
      list = list.sort((a, b) => {
        const aNew = a.status === "new" || a.status === 1;
        const bNew = b.status === "new" || b.status === 1;
        return Number(bNew) - Number(aNew);
      });
      break;
    default:
      list = list.sort((a, b) => {
        const aFeatured = a.is_feature || a.status === "featured";
        const bFeatured = b.is_feature || b.status === "featured";
        return Number(bFeatured) - Number(aFeatured);
      });
  }

  return list;
};

export const useProducts = (filters: ProductFilters = {}) => {
  const query = useQuery({
    queryKey: queryKeys.products,
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const filtered = useMemo(() => {
    if (!query.data) return [];
    return filterProducts(query.data, filters);
  }, [query.data, filters]);

  return { ...query, products: filtered };
};

export const useProduct = (id: string | number) =>
  useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  });

