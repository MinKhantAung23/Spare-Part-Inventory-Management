import api from "@/lib/api";
import { CreateStockOutInput } from "@/types/stock-out";

export interface StockOutQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  dateFrom?: string | null;
  dateTo?: string | null;
}

export async function fetchStockOut(params: StockOutQueryParams = {}) {
  const query = new URLSearchParams();

  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.search) query.set("search", params.search);
  if (params.dateFrom) query.set("from", params.dateFrom);
  if (params.dateTo) query.set("to", params.dateTo);

  const qs = query.toString();
  const { data } = await api.get(`/api/report/sales${qs ? `?${qs}` : ""}`);
  return data; // { success, pagination, summary, count, data[] }
}

export const fetchStockOutById = async (id: string) => {
  const { data } = await api.get(`/api/report/sales/${id}`);
  return data;
};

export const createStockOut = async (data: CreateStockOutInput) => {
  const { data: response } = await api.post("/api/stock-out/sale", data);
  return response;
};
