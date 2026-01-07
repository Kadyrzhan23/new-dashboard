// hooks/useAuth.ts
import { useState, useEffect } from "react";
import axios from "../services/axios.ts";
interface User {
  id: string;
  name: string;
  role: string; // "admin", "user", "manager" и т.д.
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  async function getMe() {
    try {
      const res = await axios.get("/auth/me");

      if (res?.status === 200) {
        setUser(res.data);
      }
      return;
    } catch (error) {
      setUser(null);
      console.log(error);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  return { user };
};
