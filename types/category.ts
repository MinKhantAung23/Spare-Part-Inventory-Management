
export interface Category {
  id: number;
  name: string;
}

export type CreateCategoryInput = Omit<Category, "id" | "createdAt" | "updatedAt">;

export type UpdateCategoryInput = Partial<CreateCategoryInput>;