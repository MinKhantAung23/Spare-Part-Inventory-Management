import api from "@/lib/api";
import { CreateStockOutInput } from "@/types/stock-out";

export const fetchStockOut = async () => {
  const { data } = await api.get("/api/report/sales");
  return data;
};

export const fetchStockOutById = async (id: string) => {
  const { data } = await api.get(`/api/report/sales/${id}`);
  return data;
};

export const createStockOut = async (data: CreateStockOutInput) => {
  const { data: response } = await api.post("/api/stock-out/sale", data);
  return response;
};
