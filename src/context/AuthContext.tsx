"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { postLogin } from "@/services/routes";

interface User {
  id: number;
  email: string;
  role: string;
  exibitionName: string;
  userName: string;
  profilePicture?: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const savedToken = Cookies.get("santosamesaToken");
    const savedUser = Cookies.get("santosamesaUser");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, [router]);

  const signIn = async (email: string, password: string) => {
    setError(null);
    try {
      const response = await postLogin(email, password);

      Cookies.set("santosamesaToken", response.access_token, { expires: 1 });
      setToken(response.access_token);
      if (response.userId) {
        Cookies.set(
          "santosamesaUser",
          JSON.stringify({
            id: response.userId,
            email: response.email,
            exibitionName: response.exibitionName,
            userName: response.userName,
            role: response.role,
            profilePicture: response.profilePicture || null,
          }),
          {
            expires: 1,
          }
        );
        setUser({
          id: response.userId,
          email: response.email,
          exibitionName: response.exibitionName,
          userName: response.userName,
          role: response.role,
          profilePicture: response.profilePicture || null,
        });
      }
      router.push("/");
    } catch (error: any) {
      setError("Email e/ou senha incorretos");
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    Cookies.remove("santosamesaToken");
    Cookies.remove("santosamesaUser");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, error, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
