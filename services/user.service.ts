import api from "@/lib/api";

export const fetchUsers = async () => {
  const { data } = await api.get("/api/user"); 
  return data;
};