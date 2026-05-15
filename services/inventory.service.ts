import api from "@/lib/api";

export const fetchInventory = async () => {
  const { data } = await api.get("/api/inventory"); 
  return data;
};
