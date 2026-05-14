import { BaseRequestHandler } from "next/dist/server/base-server";

export interface Model {
  id: number;
  name: string;
  brand_id: string;
}

export type CreateModelInput = Omit<BaseRequestHandler, "id" | "createdAt" | "updatedAt">;

export type UpdateModelInput = Partial<CreateModelInput>;