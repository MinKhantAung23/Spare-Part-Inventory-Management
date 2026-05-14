import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBrand,
  deleteBrand,
  fetchBrands,
  fetchBrandsById,
  updateBrand,
} from "@/services/brand.service";
import { CreateBrandInput, UpdateBrandInput } from "@/types/brand";
import { toast } from "sonner";

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    staleTime: 1000 * 60 * 5,
  });
};

export const useBrandById = (id: string) => {
  return useQuery({
    queryKey: ["brands", id],
    queryFn: () => fetchBrandsById(id),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBrandInput) => createBrand(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      toast.success("Brand created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create");
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBrandInput }) =>
      updateBrand({ id, data }),
    onSuccess: (data, variables) => {
      // Refresh the list and the specific detail view
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["brands", variables.id] });
      toast.success("Updated successfully");
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      toast.success("Deleted successfully");
    },
  });
};
