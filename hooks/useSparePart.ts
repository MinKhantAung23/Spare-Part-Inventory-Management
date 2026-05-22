import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSparePart,
  deleteSparePart,
  fetchSpareParts,
  fetchSparePartsById,
  fetchSparePartsFiltered,
  updateSparePart,
} from "@/services/spare-part.service";
import type { SparePartQueryParams } from "@/services/spare-part.service";
import { toast } from "sonner";
import { Product, UpdateProductInput } from "@/types/product";

// ── Server-side paginated + filtered list ────────────────────────────────────
// queryKey includes all params so React Query refetches whenever any param changes
export const useSparePartsQuery = (params: SparePartQueryParams) => {
  return useQuery({
    queryKey: ["spareParts", "list", params],
    queryFn: () => fetchSpareParts(params),
    staleTime: 1000 * 60 * 2, // 2 min — shorter since results change with params
    placeholderData: (prev) => prev, // keep previous data visible while next page loads
  });
};

// ── Legacy no-param version (used by StockIn/StockOut/ProductDialog dropdowns) ──
export const useSpareParts = () => {
  return useQuery({
    queryKey: ["spareParts", "all"],
    queryFn: () => fetchSpareParts({ limit: 1000 }), // fetch all for dropdown use
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};

// ── Single part by ID ────────────────────────────────────────────────────────
export const useSparePartsById = (id: string | null) => {
  return useQuery({
    queryKey: ["spareParts", "detail", id],
    queryFn: () => fetchSparePartsById(id),
    enabled: id != null && id !== "",
    staleTime: 1000 * 60 * 5,
  });
};

// ── Filtered (for quick-search tree: modelId + categoryId) ──────────────────
export const useSparePartsFiltered = (
  modelId: string | null,
  categoryId: string | null,
) => {
  return useQuery({
    queryKey: ["spareParts", "filtered", { modelId, categoryId }],
    queryFn: () => fetchSparePartsFiltered({ modelId, categoryId }),
    enabled: !!modelId && !!categoryId,
    staleTime: 1000 * 60 * 5,
  });
};

// ── Mutations ────────────────────────────────────────────────────────────────
export const useCreateSparePart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Product) => createSparePart(data),
    onSuccess: () => {
      // Invalidate the paginated list so new item appears
      queryClient.invalidateQueries({ queryKey: ["spareParts", "list"] });
      toast.success("Spare part created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create");
    },
  });
};

export const useUpdateSparePart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProductInput }) =>
      updateSparePart({ id, data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["spareParts", "list"] });
      queryClient.invalidateQueries({ queryKey: ["spareParts", "detail", String(variables.id)] });
      toast.success("Updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update");
    },
  });
};

export const useDeleteSparePart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSparePart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spareParts", "list"] });
      toast.success("Deleted successfully");
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete");
    },
  });
};