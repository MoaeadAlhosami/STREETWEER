export interface Category {
  id: string | number;
  name: string;
  description?: string;
  parent_id?: number | null;
  photo?: number | string;
}

