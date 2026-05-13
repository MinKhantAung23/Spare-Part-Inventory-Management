import { useQuery } from "@tanstack/react-query";
import { fetchStockIn } from "@/services/stock-in.service";

export const useStockIn = () => {
  return useQuery({
    queryKey: ["stockIn"],
    queryFn: fetchStockIn,
    staleTime: 1000 * 60 * 5, 
  });
};