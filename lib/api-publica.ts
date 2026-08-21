// Client da API pública do backend da Loja — mesma convenção de
// frontend/lib/api-publica.js (mesmos endpoints, mesmo formato de dados).
// Única fonte de dados comerciais: nunca criar catálogo paralelo aqui.

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type CategoriaResumo = {
  id: number;
  nome: string;
  slug: string;
};

export type ProdutoPublico = {
  id: number;
  nome: string;
  slug: string;
  descricao?: string;
  preco: number;
  imagemUrl?: string;
  aroma?: string;
  destaque: boolean;
  categoriaId?: number;
  categoria?: CategoriaResumo;
};

export type CategoriaPublica = {
  id: number;
  nome: string;
  slug: string;
  descricao?: string;
};

// A seção que consome isso (Produtos em Destaque) é editorial, não
// crítica: se a API estiver fora do ar ou NEXT_PUBLIC_API_URL não estiver
// configurada, a Home inteira não pode quebrar por causa disso — por isso
// falhas viram `null` aqui em vez de exceção, e quem chama trata como
// "sem dados" (a seção simplesmente não aparece).
async function getJSON<T>(path: string): Promise<T | null> {
  if (!API_URL) return null;

  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });

    if (!res.ok) return null;

    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function listarProdutosPublicos(): Promise<ProdutoPublico[]> {
  const produtos = await getJSON<ProdutoPublico[]>("/public/produtos");
  return produtos ?? [];
}

export async function buscarProdutoPublicoPorSlug(slug: string): Promise<ProdutoPublico | null> {
  return getJSON<ProdutoPublico>(`/public/produtos/${encodeURIComponent(slug)}`);
}

export async function listarCategoriasPublicas(): Promise<CategoriaPublica[]> {
  const categorias = await getJSON<CategoriaPublica[]>("/public/categorias");
  return categorias ?? [];
}
