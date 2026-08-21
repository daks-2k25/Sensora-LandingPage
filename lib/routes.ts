// Portado de frontend/lib/routes.js. Rotas movidas para /admin/* nesta
// etapa de fusão (ver auditoria de fusão) — o admin agora vive dentro do
// projeto único da Landing em vez de um segundo frontend separado.
export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  DASHBOARD: "/admin",
  PRODUTOS: "/admin/produtos",
  CATEGORIAS: "/admin/categorias",
  CLIENTES: "/admin/clientes",
  PEDIDOS: "/admin/pedidos",
  USUARIOS: "/admin/usuarios",
} as const;
