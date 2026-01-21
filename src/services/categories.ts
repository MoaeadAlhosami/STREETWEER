import { apiClient } from "@/lib/api-client";
import { endpoints } from "@/lib/endpoints";
import { handleApiError } from "@/lib/error-handler";
import { Category } from "@/types/category";

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    try {
      const response = await apiClient.get<any>(endpoints.categories, {
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
        console.warn("Unexpected categories response format:", response);
        return [];
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Return empty array instead of throwing to prevent breaking the UI
      return [];
    }
  },

  getById: async (id: string | number): Promise<Category> => {
    try {
      const response = await apiClient.get<Category>(endpoints.category(id), {
        requiresAuth: true,
      });
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
