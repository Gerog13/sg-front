import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  username: string;
  role: string;
  exp?: number;
}

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const setToken = (access_token: string): void => {
  localStorage.setItem("token", access_token);
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
};

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwt.decode(token) as DecodedToken;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
