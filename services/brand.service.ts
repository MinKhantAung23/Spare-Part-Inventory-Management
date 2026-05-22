import api from "@/lib/api";
import { CreateBrandInput, UpdateBrandInput } from "@/types/brand";

export interface BrandQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export async function fetchBrands(params: BrandQueryParams = {}) {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.search) query.set("name", params.search);
  const qs = query.toString();
  const { data } = await api.get(`/api/brand${qs ? `?${qs}` : ""}`);
  return data; // { success, pagination, data[] }
}

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