import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/services/dashboard.service";

export const useDashboard = () => {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: fetchDashboardData,
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
};