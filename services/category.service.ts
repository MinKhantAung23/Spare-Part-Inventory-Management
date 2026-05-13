import api from "@/lib/api";

export const fetchCategories = async () => {
  const { data } = await api.get("/api/spare-category"); 
  return data;
};