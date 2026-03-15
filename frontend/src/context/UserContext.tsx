import { createContext } from "react";
import type { User } from "../types/user";

type UserContext = {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => Promise<void>
}

export const UserContext = createContext<UserContext | null>(null)