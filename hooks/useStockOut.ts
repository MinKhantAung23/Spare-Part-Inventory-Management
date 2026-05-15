import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStockOut, fetchStockOut } from "@/services/stock-out.service";
import { CreateStockOutInput } from "@/types/stock-out";
import { toast } from "sonner";

export const useStockOut = () => {
  return useQuery({
    queryKey: ["stockOut"],
    queryFn: fetchStockOut,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateStockOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStockOutInput) => createStockOut(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stockOut"] });
      toast.success("Stock out created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to create");
    },
  });
};
