"use client";

// Portado de frontend/components/layout/ProtectedLayout.js — mesmo
// comportamento (redireciona para /login se não autenticado, depois de
// carregar o estado do AuthContext).
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/lib/routes";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(ROUTES.LOGIN);
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <p className="flex min-h-screen flex-1 items-center justify-center text-sm text-slate-500">
        Carregando...
      </p>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-background p-6">{children}</main>
      </div>
    </div>
  );
}
