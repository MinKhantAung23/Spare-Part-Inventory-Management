import { BaseRequestHandler } from "next/dist/server/base-server";

export interface Brand {
  id: number;
  name: string;
}

export type CreateBrandInput = Omit<BaseRequestHandler, "id" | "createdAt" | "updatedAt">;

export type UpdateBrandInput = Partial<CreateBrandInput>;