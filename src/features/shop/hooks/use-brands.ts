import { useQuery } from "@tanstack/react-query";
import { brandService } from "@/services/brands";
import { queryKeys } from "@/lib/query-keys";
import { Brand } from "@/types/brand";

export const useBrands = () => {
  return useQuery({
    queryKey: queryKeys.brands,
    queryFn: brandService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    retryOnMount: false,
  });
};

export const useBrand = (id: string | number) => {
  return useQuery({
    queryKey: [...queryKeys.brands, id],
    queryFn: () => brandService.getById(id),
    enabled: Boolean(id),
  });
};
