import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createModel, deleteModel, fetchModels, fetchModelsById, updateModel } from "@/services/model.service";
import { CreateModelInput, UpdateModelInput } from "@/types/model";
import { toast } from "sonner";

export const useModels = () => {
  return useQuery({
    queryKey: ["models"],
    queryFn: fetchModels,
    staleTime: 1000 * 60 * 5, 
  });
};

export const useModelById = (id: string) => {
  return useQuery({
    queryKey: ["models", id],
    queryFn: () => fetchModelsById(id),
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
      // Refresh the list and the specific detail view
      queryClient.invalidateQueries({ queryKey: ["models"] });
      queryClient.invalidateQueries({ queryKey: ["models", variables.id] });
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
