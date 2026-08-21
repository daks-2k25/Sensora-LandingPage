import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { COLLECTIONS, getCollectionHref } from "@/lib/content";

export default function ColecoesPage() {
  return (
    <>
      <section className="relative mx-auto max-w-3xl overflow-hidden px-6 pt-28 pb-8 text-center sm:pt-36 lg:px-10">
        <RevealOnScroll>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange">Sensora</p>
          <h1 className="mt-4 font-serif text-4xl font-normal tracking-tight text-brand-navy sm:text-5xl">
            Kits
          </h1>
          <p className="mt-6 text-base leading-relaxed text-slate-600">
            Conjuntos de produtos criados para contar uma história sensorial completa.
          </p>
        </RevealOnScroll>
      </section>

      <div className="relative isolate mx-auto max-w-6xl overflow-hidden px-6 pb-24 sm:pb-32 lg:px-10 lg:pb-40">
        {COLLECTIONS.map((collection) => (
          <RevealOnScroll key={collection.slug}>
            <Link href={getCollectionHref(collection)} className="group block">
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm shadow-2xl shadow-brand-navy/10">
                <PlaceholderImage
                  src={collection.heroImageSrc}
                  alt={collection.heroImageAlt ?? collection.name}
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
