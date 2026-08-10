import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { PRODUCT_CATEGORIES } from "@/lib/content";

export default function ProductCategories() {
  return (
    <section aria-labelledby="produtos-heading" className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange">
          Nossos produtos
        </p>
        <h2 id="produtos-heading" className="mt-3 text-3xl font-light text-brand-navy sm:text-4xl">
          Uma experiência sensorial para cada ambiente
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCT_CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group relative block aspect-[3/4] overflow-hidden rounded-sm"
          >
            <PlaceholderImage src={category.imageSrc} alt={category.label} label={category.label} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent transition-opacity group-hover:from-black/85" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="text-lg font-medium text-white">{category.label}</h3>
              <span className="mt-1 inline-block text-xs uppercase tracking-widest text-brand-orange-light opacity-0 transition-opacity group-hover:opacity-100">
                Ver produtos →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
