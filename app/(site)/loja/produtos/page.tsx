import type { Metadata } from "next";
import {
  listarCategoriasPublicas,
  listarProdutosPublicos,
} from "@/lib/api-publica";
import CategoryFilter from "@/components/loja/CategoryFilter";
import ProductGrid from "@/components/loja/ProductGrid";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Catálogo",
};

type CatalogoPageProps = {
  searchParams: Promise<{ categoria?: string }>;
};

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const { categoria: categoriaAtiva } = await searchParams;

  const [categorias, produtos] = await Promise.all([
    listarCategoriasPublicas(),
    listarProdutosPublicos(),
  ]);

  const produtosFiltrados = categoriaAtiva
    ? produtos.filter((produto) => produto.categoria?.slug === categoriaAtiva)
    : produtos;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <RevealOnScroll>
        <h1 className="font-serif text-4xl font-light italic text-brand-navy">
          Catálogo
        </h1>
      </RevealOnScroll>
      <RevealOnScroll delayMs={80}>
        <p className="mt-4 max-w-md text-[15px] text-brand-navy/70">
          Velas, difusores e sprays de ambiente.
        </p>
      </RevealOnScroll>

      <div className="mt-10 border-b border-slate-200 pb-8">
        <CategoryFilter categorias={categorias} categoriaAtiva={categoriaAtiva} />
      </div>

      <div className="mt-12">
        <ProductGrid produtos={produtosFiltrados} />
      </div>
    </div>
  );
}
