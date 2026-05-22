import { BaseRequestHandler } from "next/dist/server/base-server";

export interface SaleItem {
  id?: number;
  spare_part_id: number;
  quantity: number;
  unit_price: number;
}

export interface Sale {
  id: number;
  items: SaleItem[];
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSaleInput {
  items: SaleItem[];
  notes?: string;
}

export type UpdateSaleInput = Partial<CreateSaleInput>;