export type ProductStatus = "new" | "featured" | "sale" | "default";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  rating?: {
    rate: number;
    count: number;
  };
  status?: ProductStatus;
}

