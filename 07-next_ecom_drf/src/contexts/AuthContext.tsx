"use client";
import { fetchUserInfo } from "@/actions/users";
import { AuthUserProps } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: AuthUserProps | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUserProps | null>>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUserProps | null>(null);

  const fetchUser = async () => {
    const user = await fetchUserInfo();
    setUser(user);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    console.log("User Changed:", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
