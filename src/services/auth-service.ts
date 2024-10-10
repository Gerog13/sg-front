import { api } from "./api";

export const login = async (
  email: string,
  password: string
): Promise<{ access_token: string }> => {
  return api("/auth/login", "POST", { email, password });
};

export const register = async (
  name: string,
  email: string,
  password: string,
  role: string
): Promise<{ success: boolean }> => {
  return api("/auth/register", "POST", { name, email, password, role });
};
