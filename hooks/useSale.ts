import { createSale, fetchSales } from "@/services/sale.service";
import { CreateSaleInput } from "@/types/sale";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// hooks/useSale.ts
export const useSales = (params: { page: number; limit: number; date?: string; search?: string }) => {
  return useQuery({
    queryKey: ["sales", "list", params], 
    queryFn: () => fetchSales(params),
    staleTime: 1000 * 30, // 30 seconds
  });
};


export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSaleInput) => createSale(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({
        queryKey: ["stockOut"],
      });

      // ALL spare parts (IMPORTANT FIX)
      queryClient.invalidateQueries({
        queryKey: ["spareParts"],
      });
      toast.success("Sale created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create");
    },
  });
};
