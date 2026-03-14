import { useState, useEffect } from "react";
import type { User } from "../types/user";
import apiFetch from "../utils/apiFetch";


export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function checkStatus() {
      const { ok, data } = await apiFetch('/api/auth/status', { credentials: 'include' });
      if (ok) {
        setUser(data.user)
        setLoadingUser(false);
        console.log(data.message);
      } else {
        console.error(data.message);
      }        
    }
  checkStatus();
  }, []);

  return { user, loadingUser, setUser, setLoadingUser }
}