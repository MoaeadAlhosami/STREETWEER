import { apiClient } from "@/lib/api-client";
import { endpoints } from "@/lib/endpoints";
import { handleApiError } from "@/lib/error-handler";
import { LoginRequest, RegisterRequest, AuthResponse } from "@/types/auth";

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>(
        endpoints.auth.login,
        credentials
      );
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>(
        endpoints.auth.register,
        data
      );
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post(endpoints.auth.logout, undefined, {
        requiresAuth: true,
      });
    } catch (error) {
      // Logout even if API call fails
      console.error("Logout error:", error);
    }
  },
};
