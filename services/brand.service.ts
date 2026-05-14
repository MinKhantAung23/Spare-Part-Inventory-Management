import api from "@/lib/api";
import { CreateBrandInput, UpdateBrandInput } from "@/types/brand";

export const fetchBrands = async () => {
  const { data } = await api.get("/api/brand"); 
  return data;
};

export const fetchBrandsById = async (id: string) => {
  const { data } = await api.get(`/api/brand/${id}`);
  return data;
};

export const createBrand = async (data: CreateBrandInput) => {
  const { data: response } = await api.post("/api/brand", data);
  return response;
};

export const updateBrand = async ({ id, data }: { id: string; data: UpdateBrandInput }) => {
  const { data: response } = await api.put(`/api/brand/${id}`, data);
  return response;
};

export const deleteBrand = async (id: string) => {
  const { data: response } = await api.delete(`/api/brand/${id}`);
  return response;
};