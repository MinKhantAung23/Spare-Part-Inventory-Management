import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  fetchCategoriesById,
  updateCategory,
} from "@/services/category.service";
import type { CategoryQueryParams } from "@/services/category.service";
import { CreateCategoryInput, UpdateCategoryInput } from "@/types/category";
import { toast } from "sonner";

// ── Server-side paginated + searched ─────────────────────────────────────────
export const useCategoriesQuery = (params: CategoryQueryParams) => {
  return useQuery({
    queryKey: ["categories", "list", params],
    queryFn: () => fetchCategories(params),
    staleTime: 1000 * 60 * 2,
    placeholderData: (prev) => prev,
  });
};

// ── Legacy (FilterDialog dropdowns, etc.) ─────────────────────────────────────
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories", "all"],
    queryFn: () => fetchCategories({ limit: 1000 }),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCategoryById = (id: string) => {
  return useQuery({
    queryKey: ["categories", "detail", id],
    queryFn: () => fetchCategoriesById(id),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCategoryInput) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Spare category created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryInput }) =>
      updateCategory({ id, data }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Updated successfully");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Deleted successfully");
    },
  });
};
