import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// ── Request: attach Bearer token ──────────────────────────────────────────────
api.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response: redirect to /login on 401 Unauthorized ─────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear the stale cookie
      Cookies.remove("auth_token");
      // Redirect only in browser context
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
