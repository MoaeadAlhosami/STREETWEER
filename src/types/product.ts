export type ProductStatus = "new" | "featured" | "sale" | "default";

export interface Product {
  id: string | number;
  name: string;
  title?: string; // For backward compatibility
  slug?: string;
  sku?: string | null;
  description: string;
  base_price: number;
  price?: number; // For backward compatibility
  prev_price?: number;
  quantity?: number;
  type?: number;
  status?: number | ProductStatus;
  brand_id?: number;
  is_feature?: boolean;
  category?: string | number;
  categories?: number[];
  tags?: string[];
  media?: Array<{
    medium_id: number;
    position?: number | null;
  }>;
  image?: string;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  rating?: {
    rate: number;
    count: number;
  };
}

