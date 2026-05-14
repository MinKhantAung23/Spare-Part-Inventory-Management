import api from "@/lib/api";
import { CreateUserInput, UpdateUserInput } from "@/types/user";

export const fetchUsers = async () => {
  const { data } = await api.get("/api/user"); 
  return data;
};

export const fetchUserById = async (id: string) => {
  const { data } = await api.get(`/api/user/${id}`);
  return data;
};

export const createUser = async (data: CreateUserInput) => {
  const { data: response } = await api.post("/api/user", data);
  return response;
};

export const updateUser = async ({ id, data }: { id: string; data: UpdateUserInput }) => {
  const { data: response } = await api.put(`/api/user/${id}`, data);
  return response;
};

export const deleteUser = async (id: string) => {
  const { data: response } = await api.delete(`/api/user/${id}`);
  return response;
};