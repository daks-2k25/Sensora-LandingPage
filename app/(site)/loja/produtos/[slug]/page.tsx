import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarProdutoPublicoPorSlug } from "@/lib/api-publica";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ImageReveal from "@/components/ui/ImageReveal";

const formatPrice = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

type ProdutoPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProdutoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const produto = await buscarProdutoPublicoPorSlug(slug);

  if (!produto) {
    return { title: "Produto não encontrado" };
  }

  return { title: produto.nome };
}

export default async function ProdutoPage({ params }: ProdutoPageProps) {
  const { slug } = await params;
  const produto = await buscarProdutoPublicoPorSlug(slug);

  if (!produto) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
      <Link
        href={
          produto.categoria?.slug
            ? `/loja/produtos?categoria=${produto.categoria.slug}`
            : "/loja/produtos"
        }
        className="text-[13px] uppercase tracking-[0.14em] text-slate-500 transition-colors hover:text-brand-navy"
      >
        ← Catálogo
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-brand-navy lg:aspect-[3/4]">
          <ImageReveal>
            <PlaceholderImage
              src={produto.imagemUrl}
              alt={produto.nome}
              label={produto.nome}
              priority
              unoptimized={Boolean(produto.imagemUrl)}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </ImageReveal>
        </div>

        <RevealOnScroll delayMs={80} className="flex flex-col justify-center">
          {produto.categoria?.nome && (
            <p className="text-[13px] uppercase tracking-[0.14em] text-slate-500">
              {produto.categoria.nome}
            </p>
          )}

          <h1 className="mt-3 font-serif text-4xl font-light leading-tight text-brand-navy sm:text-5xl">
            {produto.nome}
          </h1>

          {produto.aroma && (
            <p className="mt-3 text-[15px] italic text-brand-navy/70">{produto.aroma}</p>
          )}

          <p className="mt-8 text-2xl font-medium text-brand-navy">
            {formatPrice.format(produto.preco)}
          </p>

          {produto.descricao && (
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-brand-navy/70">
              {produto.descricao}
            </p>
          )}

          <Link
            href={
              produto.categoria?.slug
                ? `/loja/produtos?categoria=${produto.categoria.slug}`
                : "/loja/produtos"
            }
            className="mt-10 inline-block w-fit border-b border-brand-orange/70 pb-1 text-[13px] uppercase tracking-[0.16em] text-brand-navy transition-colors hover:border-brand-orange hover:text-brand-orange"
          >
            {produto.categoria?.nome
              ? `Ver mais em ${produto.categoria.nome}`
              : "Ver catálogo completo"}
          </Link>
        </RevealOnScroll>
      </div>
    </div>
  );
}
