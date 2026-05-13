import { Product } from "@/types/product";
import api from "@/lib/api";

export const fetchSpareParts = async () => {
  const { data } = await api.get("/api/spare-part"); 
  return data;
};

export const fetchSparePartsById = async (id: string) => {
  const { data } = await api.get(`/api/spare-part/${id}`); 
  return data;
};