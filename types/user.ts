import { BaseRequestHandler } from "next/dist/server/base-server";

export interface User {
  id: number;
  name: string;
  role: string;
  password?: string;
}

export type CreateUserInput = Omit<BaseRequestHandler, "id" | "createdAt" | "updatedAt">;

export type UpdateUserInput = Partial<CreateUserInput>;