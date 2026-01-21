export const endpoints = {
  // Auth
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
  },
  
  // Products
  products: "/products",
  product: (id: string | number) => `/products/${id}`,
  
  // Categories
  categories: "/categories",
  category: (id: string | number) => `/categories/${id}`,
  
  // Brands
  brands: "/brands",
  brand: (id: string | number) => `/brands/${id}`,
  
  // Media
  media: (id: string | number) => `/media/${id}`,
};

