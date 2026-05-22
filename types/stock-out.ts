import { BaseRequestHandler } from "next/dist/server/base-server";

export interface StockOut {
  id: number;
  spare_part_id: number;
  quantity: number;
  reason?: string;
  unit_price: number;
}

export type CreateStockOutInput = Omit<StockOut, "id" | "createdAt" | "updatedAt">;

export type UpdateStockOutInput = Partial<CreateStockOutInput>;