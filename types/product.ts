import { Category } from "./category";
import { Model } from "./model";

export interface Specification {
  [key: string]: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string | null,
  spare_category_id: number;
  model_id: number;
  quantity: number,
  model: Model,
  category: Category,
  specification: Specification;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;

export type UpdateProductInput = Partial<CreateProductInput>;