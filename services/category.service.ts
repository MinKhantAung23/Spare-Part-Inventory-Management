import api from "@/lib/api";
import { CreateCategoryInput, UpdateCategoryInput } from "@/types/category";

export const fetchCategories = async () => {
  const { data } = await api.get("/api/spare-category"); 
  return data;
};

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