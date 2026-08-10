// URL pública da loja Sensora. Ainda não existe uma loja pública publicada —
// até lá, mantém um placeholder que pode ser sobrescrito via variável de ambiente.
export const LOJA_URL = process.env.NEXT_PUBLIC_LOJA_URL?.trim() || "#loja-em-breve";
