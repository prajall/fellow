"use client";
import { User } from "@/src/lib/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../lib/api";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequest.get<User>("/users/info/");
      setUser(response.data);
    } catch (error: any) {
      console.log("Failed to fetch user info:", error);
      setUser(null);
      if (
        error.response &&
        (error.response.status == 403 || error.response.status == 401)
      ) {
        router.push("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    console.log("User Changed:", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
