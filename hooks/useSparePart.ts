import { useQuery } from "@tanstack/react-query";
import {
  fetchSpareParts,
  fetchSparePartsById,
} from "@/services/spare-part.service";

export const useSpareParts = () => {
  return useQuery({
    queryKey: ["spareParts"],
    queryFn: fetchSpareParts,
    staleTime: 1000 * 60 * 5,
  });
};

export const useSparePartsById = (id: string) => {
  return useQuery({
    queryKey: ["spareParts", id],
    queryFn: () => fetchSparePartsById(id),
    staleTime: 1000 * 60 * 5,
  });
};
