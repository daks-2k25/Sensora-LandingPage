// Portado de frontend/lib/jwt.js — mesma lógica (decodificação manual,
// sem verificação de assinatura — só leitura do payload no client), agora
// tipado contra JwtPayload.
import type { JwtPayload } from "./types/loja";

export function decodeToken(token: string | null): JwtPayload | null {
  if (!token || typeof window === "undefined") return null;

  try {
    const payload = token.split(".")[1];
    let base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    return JSON.parse(window.atob(base64)) as JwtPayload;
  } catch {
    return null;
  }
}
