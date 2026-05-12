export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  stock: number;
  salePrice: number;
  costPrice: number;
  image?: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface ProductFormData {
  name: string;
  category: string;
  brand: string;
  salePrice: number;
  compatibleModels: string; // Array of model IDs/Names
  specifications: Record<string, string>; // This will be stored as JSON
}