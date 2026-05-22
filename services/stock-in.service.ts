import api from "@/lib/api";
import { CreateStockInInput } from "@/types/stock-in";

export interface StockInQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  brandId?: string | null;
  modelId?: string | null;
  categoryId?: string | null;
  dateFrom?: string | null;
  dateTo?: string | null;
}

export async function fetchStockIn(params: StockInQueryParams = {}) {
  const query = new URLSearchParams();

  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.search) query.set("name", params.search);
  if (params.brandId) query.set("brandId", params.brandId);
  if (params.modelId) query.set("modelId", params.modelId);
  if (params.categoryId) query.set("categoryId", params.categoryId);
  if (params.dateFrom) query.set("dateFrom", params.dateFrom);
  if (params.dateTo) query.set("dateTo", params.dateTo);

  const qs = query.toString();
  const { data } = await api.get(`/api/stock-batch${qs ? `?${qs}` : ""}`);
  return data; // { success, pagination, data[] }
}

export const fetchStockInById = async (id: string) => {
  const { data } = await api.get(`/api/stock-batch/${id}`);
  return data;
};

export const createStockIn = async (data: CreateStockInInput) => {
  const { data: response } = await api.post("/api/stock-batch", data);
  return response;
};
