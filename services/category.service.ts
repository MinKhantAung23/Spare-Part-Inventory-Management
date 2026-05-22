import api from "@/lib/api";
import { CreateCategoryInput, UpdateCategoryInput } from "@/types/category";

export interface CategoryQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export async function fetchCategories(params: CategoryQueryParams = {}) {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.search) query.set("name", params.search);
  const qs = query.toString();
  const { data } = await api.get(`/api/spare-category${qs ? `?${qs}` : ""}`);
  return data; // { success, pagination, data[] }
}

export const fetchCategoriesById = async (id: string) => {
  const { data } = await api.get(`/api/spare-category/${id}`);
  return data;
};

export const createCategory = async (data: CreateCategoryInput) => {
  const { data: response } = await api.post("/api/spare-category", data);
  return response;
};

export const updateCategory = async ({ id, data }: { id: string; data: UpdateCategoryInput }) => {
  const { data: response } = await api.put(`/api/spare-category/${id}`, data);
  return response;
};

export const deleteCategory = async (id: string) => {
  const { data: response } = await api.delete(`/api/spare-category/${id}`);
  return response;
};