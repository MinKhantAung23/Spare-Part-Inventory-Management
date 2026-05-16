import api from "@/lib/api";
import { DashboardResponse } from "@/types/dashboard";

export const fetchDashboardData = async (): Promise<DashboardResponse> => {
    const { data } = await api.get<DashboardResponse>("/api/dashboard/summary");
    return data;
};