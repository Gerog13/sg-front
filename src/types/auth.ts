export interface User {
  id: string;
  role: "admin" | "user";
  username: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
