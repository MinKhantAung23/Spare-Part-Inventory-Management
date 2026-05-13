import { useQuery } from "@tanstack/react-query";
import { fetchStockOut } from "@/services/stock-out.service";

export const useStockOut = () => {
  return useQuery({
    queryKey: ["stockOut"],
    queryFn: fetchStockOut,
    staleTime: 1000 * 60 * 5, 
  });
};