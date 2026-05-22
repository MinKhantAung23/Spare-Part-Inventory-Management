import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStockOut,
  fetchStockOut,
  fetchStockOutById,
} from "@/services/stock-out.service";
import type { StockOutQueryParams } from "@/services/stock-out.service";
import { CreateStockOutInput } from "@/types/stock-out";
import { toast } from "sonner";

// ── Server-side paginated + filtered list ────────────────────────────────────
export const useStockOutQuery = (params: StockOutQueryParams) => {
  return useQuery({
    queryKey: ["stockOut", "list", params],
    queryFn: () => fetchStockOut(params),
    staleTime: 1000 * 60 * 2,
    placeholderData: (prev) => prev, // keep previous data visible while next page loads
  });
};

// ── Legacy no-param version (keep for any existing consumers) ──
export const useStockOut = () => {
  return useQuery({
    queryKey: ["stockOut", "all"],
    queryFn: () => fetchStockOut({ limit: 1000 }),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};

export const useCreateStockOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStockOutInput) => createStockOut(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stockOut", "list"] });
      queryClient.invalidateQueries({ queryKey: ["stockOut", "all"] });
      toast.success("Stock out created successfully");
    },
    onError: (error: any) => {
      const serverError = error.response?.data?.error || error?.message || "Failed to create";
      toast.error(serverError);
    },
  });
};
