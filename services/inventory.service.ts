import api from "@/lib/api";

export interface InventoryQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export async function fetchInventory(params: InventoryQueryParams = {}) {
  const query = new URLSearchParams();

  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.search) query.set("name", params.search);

  const qs = query.toString();
  const { data } = await api.get(`/api/inventory${qs ? `?${qs}` : ""}`);
  return data; // { success, pagination, data[] }
}
