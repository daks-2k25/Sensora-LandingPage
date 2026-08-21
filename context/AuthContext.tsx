"use client";

// Portado de frontend/context/AuthContext.js — mesmo comportamento exato
// (sincroniza estado a partir do token salvo, decodifica no client, expõe
// login/logout). Só tipado. NÃO plugado em nenhum layout ainda — isso é
// trabalho da próxima etapa (UI/rotas), não desta.
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "@/lib/storage";
import { decodeToken } from "@/lib/jwt";
import { ROUTES } from "@/lib/routes";
import type { PerfilUsuario } from "@/lib/types/loja";

type AuthContextValue = {
  isAuthenticated: boolean;
  loading: boolean;
  perfil: PerfilUsuario | null;
  userId: number | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  function sincronizarComToken() {
    const token = getToken();
    const payload = decodeToken(token);

    setIsAuthenticated(Boolean(token));
    setPerfil(payload?.perfil ?? null);
    setUserId(payload?.sub ?? null);
  }

  useEffect(() => {
    sincronizarComToken();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function login() {
    sincronizarComToken();
  }

  function logout() {
    removeToken();
    setIsAuthenticated(false);
    setPerfil(null);
    setUserId(null);
    router.push(ROUTES.LOGIN);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, perfil, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
