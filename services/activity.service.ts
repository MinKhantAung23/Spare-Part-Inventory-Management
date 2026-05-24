import api from "@/lib/api";

export interface ActivityLogParams {
  page?: number;
  limit?: number;
  userId?: string;
  tableName?: string;
  action?: string;
  from?: string;
  to?: string;
}

export async function fetchActivityLogs(params: ActivityLogParams = {}) {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.userId) query.set("userId", params.userId);
  if (params.tableName) query.set("tableName", params.tableName);
  if (params.action) query.set("action", params.action);
  if (params.from) query.set("from", params.from);
  if (params.to) query.set("to", params.to);

  const qs = query.toString();
  const { data } = await api.get(`/api/activity-log${qs ? `?${qs}` : ""}`);
  return data; // { success, count, page, totalPages, data[] }
}