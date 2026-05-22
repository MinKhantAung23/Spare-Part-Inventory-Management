import api from "@/lib/api";
import { CreateSaleInput } from "@/types/sale";

export const fetchSales = async () => {
  const { data } = await api.get("/api/sale");
  return data;
};

export const createSale = async (data: CreateSaleInput) => {
  const { data: response } = await api.post("/api/sale", data);
  return response;
};