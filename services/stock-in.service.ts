import api from "@/lib/api";
import { CreateStockInInput } from "@/types/stock-in";

export const fetchStockIn = async () => {
  const { data } = await api.get("/api/stock-batch"); 
  return data;
};

export const fetchStockInById = async (id: string) => {
  const { data } = await api.get(`/api/stock-batch/${id}`); 
  return data;
}
export const createStockIn = async (data: CreateStockInInput) => {
  const { data: response } = await api.post("/api/stock-batch", data); 
  return response;
};

