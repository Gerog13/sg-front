import { api } from "./api";
import { User } from "@/types/user";

export const getUsers = async (): Promise<User[]> => {
  return api(`/users`);
};
