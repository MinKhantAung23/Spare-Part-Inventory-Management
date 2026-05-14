import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSparePart,
  deleteSparePart,
  fetchSpareParts,
  fetchSparePartsById,
  updateSparePart,
} from "@/services/spare-part.service";
import { toast } from "sonner";
import { CreateProductInput, UpdateProductInput } from "@/types/product";

export const useSpareParts = () => {
  return useQuery({
    queryKey: ["spareParts"],
    queryFn: fetchSpareParts,
    staleTime: 1000 * 60 * 5,
  });
};

export const useSparePartsById = (id: string) => {
  return useQuery({
    queryKey: ["spareParts", id],
    queryFn: () => fetchSparePartsById(id),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateSparePart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductInput) => createSparePart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spareParts"] });
      toast.success("Spare part created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create");
    },
  });
};

export const useUpdateSparePart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductInput }) =>
      updateSparePart({ id, data }),
    onSuccess: (data, variables) => {
      // Refresh the list and the specific detail view
      queryClient.invalidateQueries({ queryKey: ["spareParts"] });
      queryClient.invalidateQueries({ queryKey: ["spareParts", variables.id] });
      toast.success("Updated successfully");
    },
  });
};

export const useDeleteSparePart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSparePart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spareParts"] });
      toast.success("Deleted successfully");
    },
  });
};
