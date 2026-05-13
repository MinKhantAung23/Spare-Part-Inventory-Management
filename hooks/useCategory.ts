import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/category.service";

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, 
  });
};