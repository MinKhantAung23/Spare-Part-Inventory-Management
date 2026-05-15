import { BaseRequestHandler } from "next/dist/server/base-server";

export interface StockIn {
  id: number;
  spare_part_id: number;
  quantity: number;
  received_date?: Date;
  purchase_price: number;
}

export type CreateStockInInput = Omit<StockIn, "id" | "createdAt" | "updatedAt">;

export type UpdateStockInInput = Partial<CreateStockInInput>;