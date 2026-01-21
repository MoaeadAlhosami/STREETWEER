import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/categories";
import { queryKeys } from "@/lib/query-keys";
import { Category } from "@/types/category";

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: categoryService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    retryOnMount: false,
  });
};

export const useCategory = (id: string | number) => {
  return useQuery({
    queryKey: [...queryKeys.categories, id],
    queryFn: () => categoryService.getById(id),
    enabled: Boolean(id),
  });
};
