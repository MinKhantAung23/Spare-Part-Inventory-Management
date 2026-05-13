import api from "@/lib/api";

export const fetchStockOut = async () => {
  const { data } = await api.get("/api/report/sales"); 
  return data;
};