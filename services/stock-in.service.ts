import api from "@/lib/api";

export const fetchStockIn = async () => {
  const { data } = await api.get("/api/stock-batch"); 
  return data;
};