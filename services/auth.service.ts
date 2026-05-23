import api from "@/lib/api";

export interface LoginInput {
  name: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: number;
    name: string;
    role: string;
  };
}

export async function loginUser(data: LoginInput): Promise<LoginResponse> {
  const { data: response } = await api.post("/api/auth/login", data);
  return response;
}
