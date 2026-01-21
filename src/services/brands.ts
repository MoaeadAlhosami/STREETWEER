import { apiClient } from "@/lib/api-client";
import { endpoints } from "@/lib/endpoints";
import { handleApiError } from "@/lib/error-handler";
import { Brand } from "@/types/brand";

export const brandService = {
  getAll: async (): Promise<Brand[]> => {
    try {
      const response = await apiClient.get<any>(endpoints.brands, {
        requiresAuth: true,
      });
      
      // Handle different response formats
      if (Array.isArray(response)) {
        return response;
      } else if (response?.data && Array.isArray(response.data)) {
        return response.data;
      } else if (response?.items && Array.isArray(response.items)) {
        return response.items;
      } else {
        console.warn("Unexpected brands response format:", response);
        return [];
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      // Return empty array instead of throwing to prevent breaking the UI
      return [];
    }
  },

  getById: async (id: string | number): Promise<Brand> => {
    try {
      const response = await apiClient.get<Brand>(endpoints.brand(id), {
        requiresAuth: true,
      });
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
