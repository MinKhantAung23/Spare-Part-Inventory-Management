import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "@/services/brand.service";

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    staleTime: 1000 * 60 * 5, 
  });
};