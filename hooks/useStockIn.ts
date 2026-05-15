import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStockIn, fetchStockIn } from "@/services/stock-in.service";
import { CreateStockInInput } from "@/types/stock-in";
import { toast } from "sonner";

export const useStockIn = () => {
  return useQuery({
    queryKey: ["stockIn"],
    queryFn: fetchStockIn,
    staleTime: 1000 * 60 * 5, 
  });
};

  export const useCreateStockIn = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: CreateStockInInput) => createStockIn(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["stockOut"] });
        toast.success("Stock out created successfully");
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.error || "Failed to create");
      },
    });
  };