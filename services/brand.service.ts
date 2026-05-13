import api from "@/lib/api";

export const fetchBrands = async () => {
  const { data } = await api.get("/api/brand"); 
  return data;
};