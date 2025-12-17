// hooks/useAuth.ts
import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  role: string; // "admin", "user", "manager" и т.д.
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // пример: получаем пользователя из localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return { user };
};
