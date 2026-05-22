import { createSale, fetchSales } from "@/services/sale.service";
import { CreateSaleInput } from "@/types/sale";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: fetchSales,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSaleInput) => createSale(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      toast.success("Sale created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create");
    },
  });
};
