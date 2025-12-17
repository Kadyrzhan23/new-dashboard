export interface AuthContextType {
    user: User | null;
    loading: boolean;
  }


export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
  }