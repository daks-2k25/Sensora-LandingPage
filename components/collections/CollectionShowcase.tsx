import Button from "@/components/ui/Button";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { LOJA_URL } from "@/lib/config";
import type { Collection } from "@/lib/content";

type CollectionShowcaseProps = {
  collection: Collection;
};

// Vitrine editorial de uma coleção: apresenta, não vende — nenhum item da
// grade é clicável, o único caminho de conversão é o CTA final para a loja.
export default function CollectionShowcase({ collection }: CollectionShowcaseProps) {
  const headingId = `${collection.slug}-heading`;

  return (
    <section aria-labelledby={headingId} className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-10 lg:pb-40">
      <RevealOnScroll className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange">Coleção</p>
        <h2 id={headingId} className="mt-4 font-serif text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
          {collection.name}
        </h2>
        {collection.tagline && (
          <p className="mt-3 text-sm font-light text-slate-500 sm:text-base">{collection.tagline}</p>
        )}
        {/* A imagem principal já traz a descrição completa desenhada nela
            (mesma arte do Hero da home) — repeti-la aqui duplicaria o texto. */}
        {!collection.heroImageSrc && (
          <p className="mt-6 text-base leading-relaxed text-slate-600">{collection.description}</p>
        )}
      </RevealOnScroll>

      {collection.heroImageSrc && (
        <RevealOnScroll className="relative mx-auto mt-12 aspect-[21/9] w-full max-w-6xl overflow-hidden rounded-sm shadow-2xl shadow-brand-navy/10 sm:mt-16">
          <PlaceholderImage src={collection.heroImageSrc} alt={collection.heroImageAlt} label={collection.name} />
        </RevealOnScroll>
      )}

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {collection.items.map((item, index) => (
          <RevealOnScroll key={item.slug} delayMs={index * 90} className="text-center">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
              <PlaceholderImage src={item.imageSrc} alt={item.imageAlt} label={item.name} />
            </div>
            {item.seasonLabel && (
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
                {item.seasonLabel}
              </p>
            )}
            <h3 className="mt-2 font-serif text-xl font-normal text-brand-navy">{item.name}</h3>
            {item.mood && <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.mood}</p>}
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll className="mt-16 flex justify-center sm:mt-20">
        <Button href={LOJA_URL} variant="primary">
          Conhecer coleção →
        </Button>
      </RevealOnScroll>
    </section>
  );
}
