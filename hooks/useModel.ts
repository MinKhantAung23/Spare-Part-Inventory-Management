import { useQuery } from "@tanstack/react-query";
import { fetchModels } from "@/services/model.service";

export const useModels = () => {
  return useQuery({
    queryKey: ["models"],
    queryFn: fetchModels,
    staleTime: 1000 * 60 * 5, 
  });
};