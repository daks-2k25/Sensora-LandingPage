// Portado de frontend/services/api.js — mesma instância axios, mesmo
// interceptor de Authorization. Baseado em NEXT_PUBLIC_API_URL, igual à
// Loja original e ao lib/api-publica.ts já existente na Landing.
import axios from "axios";
import { getToken } from "@/lib/storage";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
