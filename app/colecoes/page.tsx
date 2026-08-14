import Link from "next/link";
import AmbientOrnament from "@/components/ui/AmbientOrnament";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { COLLECTIONS, getCollectionHref } from "@/lib/content";

export default function ColecoesPage() {
  return (
    <>
      <section className="relative mx-auto max-w-3xl overflow-hidden px-6 pt-28 pb-8 text-center sm:pt-36 lg:px-10">
        <AmbientOrnament
          variant="arc"
          tone="orange"
          className="-top-40 -left-40 h-[380px] w-[380px] sm:h-[460px] sm:w-[460px]"
        />
        <AmbientOrnament
          variant="rings"
          tone="navy"
          className="-bottom-24 -right-24 hidden h-64 w-64 sm:block sm:h-80 sm:w-80"
        />
        <RevealOnScroll>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange">Sensora</p>
          <h1 className="mt-4 font-serif text-4xl font-normal tracking-tight text-brand-navy sm:text-5xl">
            Coleções
          </h1>
          <p className="mt-6 text-base leading-relaxed text-slate-600">
            Conjuntos de produtos criados para contar uma história sensorial completa.
          </p>
        </RevealOnScroll>
      </section>

      <div className="relative isolate mx-auto max-w-6xl overflow-hidden px-6 pb-24 sm:pb-32 lg:px-10 lg:pb-40">
        <AmbientOrnament
          variant="wave"
          tone="orange"
          className="bottom-0 left-1/2 hidden h-[160px] w-[560px] -translate-x-1/2 sm:block sm:h-[200px] sm:w-[720px]"
        />
        {COLLECTIONS.map((collection) => (
          <RevealOnScroll key={collection.slug}>
            <Link href={getCollectionHref(collection)} className="group block">
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm shadow-2xl shadow-brand-navy/10">
                <PlaceholderImage
                  src={collection.heroImageSrc}
                  alt={collection.heroImageAlt}
                  label={collection.name}
                  className="transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <h2 className="mt-4 font-serif text-xl font-normal text-brand-navy">{collection.name}</h2>
              {collection.tagline && <p className="mt-1 text-sm text-slate-500">{collection.tagline}</p>}
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </>
  );
}
