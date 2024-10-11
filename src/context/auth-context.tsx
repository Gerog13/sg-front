"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { User } from "@/types/auth";
import { getToken, setToken, removeToken, decodeToken } from "@/utils/jwt";
import { useRouter } from "next/navigation";

import {
  login as apiLogin,
  register as apiRegister,
} from "@/services/auth-service";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const logout = useCallback(async () => {
    removeToken();
    setUser(null);
    router.push("/");
  }, [router]);

  useEffect(() => {
    const token = getToken();

    if (token) {
      const { exp } = decodeToken(token) || {};
      const isExpired = exp ? Date.now() >= exp * 1000 : true;

      if (isExpired) {
        logout();
      } else {
        const { id, username, role } = decodeToken(token) || {};
        setUser({
          id: id ?? "",
          username: username ?? "",
          role: (role as "admin" | "user") ?? "user",
        });
      }
    } else {
      router.push("/");
    }
  }, [router, logout]);

  const login = async (email: string, password: string) => {
    const { access_token } = await apiLogin(email, password);

    const { id, username, role } = decodeToken(access_token) || {};

    setToken(access_token ?? "");
    setUser({
      id: id ?? "",
      username: username ?? "",
      role: (role as "admin" | "user") ?? "user",
    });
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    try {
      const { success } = await apiRegister(name, email, password, role);

      if (!success) {
        throw new Error("Failed to register");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
