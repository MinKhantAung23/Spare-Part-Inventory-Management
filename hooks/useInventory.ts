import { useQuery } from "@tanstack/react-query";
import { fetchInventory } from "@/services/inventory.service";

export const useInventory = () => {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: fetchInventory,
    placeholderData: (previousData) => previousData, // Smooth transitions
  });
};
