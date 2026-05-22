import { Brand } from "./brand";
import { Category } from "./category";
import { Model } from "./model";

interface Specification {
  [key: string]: string;
}

export interface Batch {
  id: number;
  spare_part_id: number;
  initial_quantity: number;
  remaining_quantity: number;
  purchase_price: number;
  received_date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id?: number | null;
  name: string;
  price: number;
  cost_price?: number | null;
  image: string | null;
  spare_category_id?: number;
  model_id?: number | null;
  quantity: number | null;
  brand?: Brand | null;
  model: Model | null;
  category: Category | null;
  specification: Specification | null;
  stock_batches?: Batch[];
  createdAt?: string;
  updatedAt?: string;
}

export type CreateProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;

export type UpdateProductInput = Partial<CreateProductInput>;