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
    const savedToken = Cookies.get("token");
    const savedUser = Cookies.get("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    // else {
    //   router.push("/login");
    // }
  }, [router]);

  const signIn = async (email: string, password: string) => {
    setError(null);
    try {
      const response = await postLogin(email, password);

      Cookies.set("token", response.access_token, { expires: 1 }); // Expiração de 1 dia
      setToken(response.access_token);
      if (response.userId) {
        Cookies.set(
          "user",
          JSON.stringify({
            id: response.userId,
            email: response.email,
            role: response.role,
            profilePicture: response.profilePicture || null,
          }),
          {
            expires: 1,
          }
        );
        setUser({
          id: response.id,
          email: response.email,
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
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/");
  };

  // const FetchGrupos = async () => {
  //   try {
  //     const results = await getGrupos();
  //     setGrupos(results);
  //   } catch (err) {
  //     showAlert("Falha buscar os grupos", "error");
  //     setGrupos([]);
  //   }
  // };

  // useEffect(() => {
  //   if (token) {
  //     FetchCargos();
  //     FetchGrupos();
  //   }
  // }, [token]);

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
