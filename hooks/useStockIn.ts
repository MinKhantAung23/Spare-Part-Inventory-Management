import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStockIn,
  fetchStockIn,
  fetchStockInById,
} from "@/services/stock-in.service";
import type { StockInQueryParams } from "@/services/stock-in.service";
import { CreateStockInInput } from "@/types/stock-in";
import { toast } from "sonner";

// ── Server-side paginated + filtered list ────────────────────────────────────
// queryKey includes all params so React Query refetches whenever any param changes
export const useStockInQuery = (params: StockInQueryParams) => {
  return useQuery({
    queryKey: ["stockIn", "list", params],
    queryFn: () => fetchStockIn(params),
    staleTime: 1000 * 60 * 2, // 2 min
    placeholderData: (prev) => prev, // keep previous data visible while next page loads
  });
};

// ── Legacy no-param version (used by detail pages, etc.) ──
export const useStockIn = () => {
  return useQuery({
    queryKey: ["stockIn", "all"],
    queryFn: () => fetchStockIn({ limit: 1000 }),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};

export const useStockInById = (id: string) => {
  return useQuery({
    queryKey: ["stockIn", "detail", id],
    queryFn: () => fetchStockInById(id),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateStockIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStockInInput) => createStockIn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stockIn", "list"] });
      queryClient.invalidateQueries({ queryKey: ["stockIn", "all"] });
      queryClient.invalidateQueries({
        queryKey: ["stockIn"],
      });

      // ALL spare parts (IMPORTANT FIX)
      queryClient.invalidateQueries({
        queryKey: ["spareParts"],
      });
      toast.success("Stock in created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to create");
    },
  });
};
