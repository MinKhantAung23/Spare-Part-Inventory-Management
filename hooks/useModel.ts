import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createModel,
  deleteModel,
  fetchModels,
  fetchModelsByBrandId,
  fetchModelsById,
  updateModel,
} from "@/services/model.service";
import type { ModelQueryParams } from "@/services/model.service";
import { CreateModelInput, UpdateModelInput } from "@/types/model";
import { toast } from "sonner";

// ── Server-side paginated + searched ─────────────────────────────────────────
export const useModelsQuery = (params: ModelQueryParams) => {
  return useQuery({
    queryKey: ["models", "list", params],
    queryFn: () => fetchModels(params),
    staleTime: 1000 * 60 * 2,
    placeholderData: (prev) => prev,
  });
};

export const useModelById = (id: string) => {
  return useQuery({
    queryKey: ["models", "detail", id],
    queryFn: () => fetchModelsById(id),
    staleTime: 1000 * 60 * 5,
  });
};

export const useModelsByBrand = (brandId: string | null) => {
  return useQuery({
    queryKey: ["models-by-brand", { brandId }],
    queryFn: () => fetchModelsByBrandId(brandId),
    enabled: !!brandId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateModel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateModelInput) => createModel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
      toast.success("Model created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create");
    },
  });
};

export const useUpdateModel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateModelInput }) =>
      updateModel({ id, data }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
      toast.success("Updated successfully");
    },
  });
};

export const useDeleteModel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
      toast.success("Deleted successfully");
    },
  });
};
