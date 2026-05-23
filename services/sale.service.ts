import api from "@/lib/api";
import { CreateSaleInput } from "@/types/sale";

export async function fetchSales(params: any = {}) {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.search) query.set("name", params.search);
  const qs = query.toString();
  const { data } = await api.get(`/api/sale${qs ? `?${qs}` : ""}`);
  return data;
}

export const createSale = async (data: CreateSaleInput) => {
  const { data: response } = await api.post("/api/sale", data);
  return response;
};
