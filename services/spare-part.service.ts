import { CreateProductInput, Product, UpdateProductInput } from "@/types/product";
import api from "@/lib/api";


export interface SparePartQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  brandId?: string | null;
  modelId?: string | null;
  categoryId?: string | null;
  stockStatus?: string | null;
}

export async function fetchSpareParts(params: SparePartQueryParams = {}) {
  const query = new URLSearchParams();

  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.search) query.set("name", params.search);
  if (params.brandId) query.set("brandId", params.brandId);
  if (params.modelId) query.set("modelId", params.modelId);
  if (params.categoryId) query.set("categoryId", params.categoryId);
  if (params.stockStatus && params.stockStatus !== "all") {
    query.set("stockStatus", params.stockStatus);
  }

  const qs = query.toString();
  const { data } = await api.get(`/api/spare-part${qs ? `?${qs}` : ""}`);
  return data; // { success, pagination, data[] }
}

export async function fetchSparePartsFiltered({
  modelId,
  categoryId,
}: {
  modelId: string | null;
  categoryId: string | null;
}) {
  const query = new URLSearchParams();
  if (modelId) query.set("modelId", modelId);
  if (categoryId) query.set("categoryId", categoryId);
  const { data } = await api.get(`/api/spare-part?${query.toString()}`);
  return data;
}

// export const fetchSpareParts = async () => {
//   const { data } = await api.get("/api/spare-part");
//   return data;
// };

// export const fetchSparePartsFiltered = async ({ modelId, categoryId }: { modelId: string | null; categoryId: string | null }) => {
//   const { data } = await api.get(`/api/spare-part`, {
//     params: {
//       modelId,
//       categoryId,
//     },
//   });
//   return data;
// };


export const fetchSparePartsById = async (id: string | null) => {
  const { data } = await api.get(`/api/spare-part/${id}`);
  return data;
};

export const createSparePart = async (data: Product) => {
  const { data: response } = await api.post("/api/spare-part", data);
  return response;
};

export const updateSparePart = async ({ id, data }: { id: number; data: UpdateProductInput }) => {
  const { data: response } = await api.put(`/api/spare-part/${id}`, data);
  return response;
};

export const deleteSparePart = async (id: string) => {
  const { data: response } = await api.delete(`/api/spare-part/${id}`);
  return response;
};