
export interface Specification {
  [key: string]: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  spare_category_id: number;
  model_id: number;
  specification: Specification;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;

export type UpdateProductInput = Partial<CreateProductInput>;