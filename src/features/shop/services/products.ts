import { apiClient } from "@/lib/api-client";
import { endpoints } from "@/lib/endpoints";
import { Product } from "@/types/product";
import { mockCategories, mockProducts } from "../data/mock-data";

// Default to mock data to avoid flaky upstream API in dev; set NEXT_PUBLIC_USE_MOCK=false to hit real API.
const useMock = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export const getProducts = async (): Promise<Product[]> => {
  if (useMock) return mockProducts;
  try {
    return await apiClient.get<Product[]>(endpoints.products);
  } catch {
    return mockProducts;
  }
};

export const getProduct = async (id: string): Promise<Product> => {
  if (useMock) {
    const found = mockProducts.find((product) => product.id === id);
    if (found) return found;
  }

  try {
    return await apiClient.get<Product>(endpoints.product(id));
  } catch {
    const fallback = mockProducts.find((product) => product.id === id);
    if (!fallback) {
      throw new Error("Product not found");
    }
    return fallback;
  }
};

export const getCategories = async (): Promise<string[]> => {
  if (useMock) return mockCategories;
  try {
    return await apiClient.get<string[]>(endpoints.categories);
  } catch {
    return mockCategories;
  }
};

