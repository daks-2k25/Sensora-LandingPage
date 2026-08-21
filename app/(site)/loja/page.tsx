// Novo: home da vitrine da Loja, agora parte do mesmo projeto da Landing.
// Reaproveita o sistema de reveal (RevealOnScroll) e o ProductGrid/
// ProductCard já existentes — nenhuma imagem nova, nenhuma dependência nova.
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  listarCategoriasPublicas,
  listarProdutosPublicos,
} from "@/lib/api-publica";
import { bannerParaCategoria } from "@/lib/loja-imagens";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ProductGrid from "@/components/loja/ProductGrid";

export const metadata: Metadata = {
  title: "Loja",
};

export default async function LojaPage() {
  const [categorias, produtos] = await Promise.all([
    listarCategoriasPublicas(),
    listarProdutosPublicos(),
  ]);

  const destaques = produtos.filter((produto) => produto.destaque);

  return (
    <div>
      <section className="relative flex h-[80vh] min-h-[520px] items-end overflow-hidden bg-brand-navy">
        <Image
          src="/images/hero/colecao-4-estacoes-banner.png"
          alt="Velas aromáticas Sensora sobre uma bancada"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/10 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10">
          <RevealOnScroll>
            <h1 className="max-w-xl font-serif text-5xl font-light italic leading-[1.05] text-white sm:text-6xl">
              A loja Sensora
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delayMs={80}>
            <p className="mt-5 max-w-md text-[15px] text-white/80">
              Velas, difusores e sprays de ambiente.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delayMs={160}>
            <Link
              href="/loja/produtos"
              className="mt-9 inline-block border-b border-brand-orange/70 pb-1 text-[13px] uppercase tracking-[0.16em] text-white transition-colors hover:border-brand-orange"
            >
              Ver catálogo completo
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {categorias.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <RevealOnScroll>
            <h2 className="font-serif text-2xl font-light italic text-brand-navy">
              Categorias
            </h2>
          </RevealOnScroll>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categorias.map((categoria, index) => {
              const banner = bannerParaCategoria(categoria.slug);
              return (
                <RevealOnScroll key={categoria.id} delayMs={index * 90}>
                  <Link
                    href={`/loja/produtos?categoria=${categoria.slug}`}
                    className="group relative block aspect-[4/3] overflow-hidden bg-[#f5f2ed]"
                  >
                    {banner && (
                      <Image
                        src={banner}
                        alt={categoria.nome}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}
                    <div
                      className={
                        banner
                          ? "absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent"
                          : "absolute inset-0"
                      }
                    />
                    <span
                      className={`absolute bottom-5 left-5 text-[13px] uppercase tracking-[0.14em] ${
                        banner ? "text-white" : "text-brand-navy"
                      }`}
                    >
                      {categoria.nome}
                    </span>
                  </Link>
                </RevealOnScroll>
              );
            })}
          </div>
        </section>
      )}

      {destaques.length > 0 && (
        <section className="bg-[#f5f2ed] px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <RevealOnScroll>
              <h2 className="font-serif text-2xl font-light italic text-brand-navy">
                Em destaque
              </h2>
            </RevealOnScroll>

            <div className="mt-10">
              <ProductGrid produtos={destaques} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
