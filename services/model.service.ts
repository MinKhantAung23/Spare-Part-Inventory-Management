import { Product } from "@/types/product";
import api from "@/lib/api";

export const fetchModels = async () => {
  const { data } = await api.get("/api/model"); 
  return data;
};