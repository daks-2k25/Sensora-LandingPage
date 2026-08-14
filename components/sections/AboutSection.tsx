import AmbientOrnament from "@/components/ui/AmbientOrnament";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { ABOUT_CONTENT } from "@/lib/content";

export default function AboutSection() {
  return (
    <section
      aria-labelledby="sobre-heading"
      className="relative overflow-hidden bg-[#f5f2ed] py-28 sm:py-36 lg:py-40"
    >
      <AmbientOrnament
        variant="arc"
        tone="navy"
        className="-top-24 -right-24 hidden h-64 w-64 sm:block sm:h-80 sm:w-80"
      />
      <AmbientOrnament
        variant="rings"
        tone="orange"
        className="-bottom-28 -right-28 hidden h-72 w-72 sm:block sm:h-96 sm:w-96"
      />

      {/* Acentos de margem: um traço ondulado (esquerda) e uma barra sólida
          (direita), vivendo na calha vazia fora da coluna de conteúdo. */}
      <svg
        aria-hidden
        viewBox="0 0 40 260"
        className="pointer-events-none absolute left-2 top-20 hidden h-56 w-10 text-brand-orange/60 sm:block lg:left-6"
      >
        <path
          d="M20 4 C4 40, 36 80, 20 120 S4 200, 20 256"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span
        aria-hidden
        className="pointer-events-none absolute right-2 top-[13rem] hidden h-56 w-[3px] rounded-full bg-white/70 sm:block lg:right-6"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
        <RevealOnScroll className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <svg
            aria-hidden
            viewBox="0 0 400 400"
            className="pointer-events-none absolute -bottom-10 -left-10 hidden w-64 text-brand-orange sm:block sm:w-80"
          >
            <circle
              cx="120"
              cy="200"
              r="150"
              fill="none"
              stroke="currentColor"
              strokeWidth="26"
              strokeDasharray="620 320"
              strokeLinecap="round"
            />
            <circle
              cx="155"
              cy="235"
              r="108"
              fill="none"
              stroke="currentColor"
              strokeWidth="16"
              strokeDasharray="400 280"
              strokeLinecap="round"
              transform="rotate(24 155 235)"
              opacity="0.85"
            />
          </svg>
          <div className="relative z-10 aspect-[4/5] w-full overflow-hidden rounded-sm bg-white shadow-2xl shadow-brand-navy/15">
            <PlaceholderImage
              src={ABOUT_CONTENT.imageSrc}
              alt={ABOUT_CONTENT.imageAlt}
              label={ABOUT_CONTENT.title}
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150} className="lg:pr-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange">
            {ABOUT_CONTENT.eyebrow}
          </p>
          <h2
            id="sobre-heading"
            className="mt-4 font-serif text-4xl leading-[1.05] font-normal tracking-tight text-brand-navy sm:text-5xl"
          >
            {ABOUT_CONTENT.title}
          </h2>
          <div className="mt-8 max-w-xl space-y-6 text-base leading-relaxed text-slate-600">
            {ABOUT_CONTENT.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
