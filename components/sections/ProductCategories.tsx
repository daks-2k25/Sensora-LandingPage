import Link from "next/link";
import AmbientOrnament from "@/components/ui/AmbientOrnament";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { PRODUCT_CATEGORIES } from "@/lib/content";

// Hierarquia editorial do grid: o primeiro item (com foto real) ganha
// destaque em 2x2; os demais se distribuem em torno dele, sem sobrar
// espaço vazio na malha de 4 colunas x 2 linhas do desktop.
const CATEGORY_LAYOUT: Record<number, { wrapper: string; title: string }> = {
  0: {
    wrapper: "lg:col-span-2 lg:row-span-2 lg:aspect-auto lg:h-full",
    title: "text-2xl sm:text-3xl",
  },
  1: {
    wrapper: "lg:col-span-2 lg:aspect-[16/9]",
    title: "text-xl",
  },
};

export default function ProductCategories() {
  return (
    <section
      aria-labelledby="produtos-heading"
      className="relative mx-auto max-w-7xl overflow-hidden px-6 py-24 sm:py-32 lg:px-10 lg:py-40"
    >
      <AmbientOrnament
        variant="rings"
        tone="orange"
        className="-top-32 -right-32 h-[440px] w-[440px] sm:h-[560px] sm:w-[560px]"
      />
      <RevealOnScroll className="mx-auto mb-16 max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange">
          Nossos produtos
        </p>
        <h2 id="produtos-heading" className="mt-4 font-serif text-3xl font-normal text-brand-navy sm:text-4xl">
          Uma experiência sensorial para cada ambiente
        </h2>
      </RevealOnScroll>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCT_CATEGORIES.map((category, index) => {
          const layout = CATEGORY_LAYOUT[index];
          return (
            <RevealOnScroll
              key={category.id}
              delayMs={index * 90}
              className={`aspect-[3/4] overflow-hidden rounded-sm ${layout?.wrapper ?? ""}`}
            >
              <Link href={category.href} className="group relative block h-full w-full">
                <PlaceholderImage
                  src={category.imageSrc}
                  alt={category.label}
                  label={category.label}
                  className="transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent transition-opacity group-hover:from-black/85" />
                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-7">
                  <h3 className={`font-serif font-normal text-white ${layout?.title ?? "text-xl"}`}>
                    {category.label}
                  </h3>
                  <span className="mt-1 inline-block text-xs uppercase tracking-widest text-brand-orange-light opacity-0 transition-opacity group-hover:opacity-100">
                    Ver produtos →
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
