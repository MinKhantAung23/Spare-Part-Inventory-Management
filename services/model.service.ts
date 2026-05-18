import { Product } from "@/types/product";
import api from "@/lib/api";
import { CreateModelInput, UpdateModelInput } from "@/types/model";

export const fetchModels = async () => {
  const { data } = await api.get("/api/model");
  return data;
};

export const fetchModelsById = async (id: string) => {
  const { data } = await api.get(`/api/model/${id}`);
  return data;
};

export const fetchModelsByBrandId = async (id: string | null) => {
  const { data } = await api.get(`/api/model/brand/${id}`);
  return data.data;
};

export const createModel = async (data: CreateModelInput) => {
  const { data: response } = await api.post("/api/model", data);
  return response;
};

export const updateModel = async ({ id, data }: { id: string; data: UpdateModelInput }) => {
  const { data: response } = await api.put(`/api/model/${id}`, data);
  return response;
};

export const deleteModel = async (id: string) => {
  const { data: response } = await api.delete(`/api/model/${id}`);
  return response;
};