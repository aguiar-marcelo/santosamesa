import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface User {
  userId: number;
  nome: string;
  email: string;
  status: string;
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
    } else {
      router.push("/login");
    }
  }, [router]);

  const signIn = async (email: string, password: string) => {
    setError(null);
    try {
      const response = await fetch(
        `${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3009") + "/api"}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Usuário e/ou senha inválidos");
        } else {
          throw new Error("Falha no login. Tente novamente.");
        }
      }

      const data = await response.json();

      // Salvar token nos cookies
      Cookies.set("token", data.token, { expires: 1 }); // Expiração de 1 dia
      Cookies.set("user", JSON.stringify(data.user), { expires: 1 });

      setUser(data.user);
      setToken(data.token);

      router.push("/");
    } catch (error: any) {
      setError(error.message || "An error occurred");
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/login");
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
    <AuthContext.Provider
      value={{ user, token, error, signIn, signOut }}
    >
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
