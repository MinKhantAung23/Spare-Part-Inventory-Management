import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, fetchUserById, fetchUsers, updateUser } from "@/services/user.service";
import { toast } from "sonner";
import { CreateUserInput, UpdateUserInput } from "@/types/user";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, 
  });
};

export const useUserById = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUserById(id),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserInput) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create");
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserInput }) =>
      updateUser({ id, data }),
    onSuccess: (data, variables) => {
      // Refresh the list and the specific detail view
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", variables.id] });
      toast.success("Updated successfully");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Deleted successfully");
    },
  });
};
