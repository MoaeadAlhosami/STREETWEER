import { apiClient } from "@/lib/api-client";
import { endpoints } from "@/lib/endpoints";
import { handleApiError } from "@/lib/error-handler";
import { Product } from "@/types/product";
import { mockCategories, mockProducts } from "../data/mock-data";

// Default to mock data to avoid flaky upstream API in dev; set NEXT_PUBLIC_USE_MOCK=false to hit real API.
const useMock = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

// Transform API product to app product format
const transformProduct = (product: Product): Product => {
  return {
    ...product,
    title: product.title || product.name,
    price: product.price || product.base_price,
    image: product.image || (product.media && product.media[0] ? `/media/${product.media[0].medium_id}` : ""),
    images: product.images || (product.media ? product.media.map(m => `/media/${m.medium_id}`) : []),
  };
};

export const getProducts = async (): Promise<Product[]> => {
  if (useMock) return mockProducts;
  try {
    const response = await apiClient.get<any>(endpoints.products);
    
    // Handle different response formats
    let products: Product[] = [];
    if (Array.isArray(response)) {
      products = response;
    } else if (response?.data && Array.isArray(response.data)) {
      products = response.data;
    } else if (response?.items && Array.isArray(response.items)) {
      products = response.items;
    } else {
      console.warn("Unexpected products response format:", response);
      return mockProducts;
    }
    
    return products.map(transformProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    // Fallback to mock data on error
    return mockProducts;
  }
};

export const getProduct = async (id: string | number): Promise<Product> => {
  if (useMock) {
    const found = mockProducts.find((product) => String(product.id) === String(id));
    if (found) return found;
  }

  try {
    const response = await apiClient.get<Product>(endpoints.product(id), {
      requiresAuth: true,
    });
    return transformProduct(response);
  } catch (error) {
    console.error("Error fetching product:", error);
    const fallback = mockProducts.find((product) => String(product.id) === String(id));
    if (!fallback) {
      throw new Error(handleApiError(error));
    }
    return fallback;
  }
};

export const getCategories = async (): Promise<string[]> => {
  if (useMock) return mockCategories;
  try {
    // Try new API first
    const response = await apiClient.get<any[]>(endpoints.categories, {
      requiresAuth: true,
    });
    // Transform to string array if needed
    if (Array.isArray(response) && response.length > 0) {
      if (typeof response[0] === "string") {
        return response;
      }
      return response.map((cat) => cat.name || String(cat));
    }
    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return mockCategories;
  }
};

