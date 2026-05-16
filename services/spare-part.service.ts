import { CreateProductInput, UpdateProductInput } from "@/types/product";
import api from "@/lib/api";

export const fetchSpareParts = async () => {
  const { data } = await api.get("/api/spare-part");
  return data;
};

export const fetchSparePartsFiltered = async ({ modelId, categoryId }: { modelId: string | null; categoryId: string | null }) => {
  const { data } = await api.get(`/api/spare-part`, {
    params: {
      modelId,
      categoryId,
    },
  });
  return data;
};

export const fetchSparePartsById = async (id: string) => {
  const { data } = await api.get(`/api/spare-part/${id}`);
  return data;
};

export const createSparePart = async (data: CreateProductInput) => {
  const { data: response } = await api.post("/api/spare-part", data);
  return response;
};

export const updateSparePart = async ({ id, data }: { id: string; data: UpdateProductInput }) => {
  const { data: response } = await api.put(`/api/spare-part/${id}`, data);
  return response;
};

export const deleteSparePart = async (id: string) => {
  const { data: response } = await api.delete(`/api/spare-part/${id}`);
  return response;
};