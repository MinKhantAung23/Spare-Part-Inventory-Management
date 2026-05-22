import { useQuery } from "@tanstack/react-query";
import { fetchInventory } from "@/services/inventory.service";
import type { InventoryQueryParams } from "@/services/inventory.service";

// ── Server-side paginated + searched list ────────────────────────────────────
export const useInventoryQuery = (params: InventoryQueryParams) => {
  return useQuery({
    queryKey: ["inventory", "list", params],
    queryFn: () => fetchInventory(params),
    staleTime: 1000 * 60 * 2,
    placeholderData: (prev) => prev, // keep previous data visible while page loads
  });
};
