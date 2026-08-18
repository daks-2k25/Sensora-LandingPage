"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { HERO_SLIDES } from "@/lib/content";

const AUTOPLAY_MS = 6000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const total = HERO_SLIDES.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (target: number) => {
      setIndex(((target % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (total <= 1) return undefined;

    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total]);

  return (
    <section
      aria-label="Destaques Sensora"
      className="group relative w-full overflow-hidden bg-brand-navy"
    >
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-auto lg:h-[90vh] lg:max-h-[860px] lg:min-h-[600px]">
        {HERO_SLIDES.map((slide, slideIndex) => (
          <div
            key={slide.id}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-[1600ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
              slideIndex === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={slideIndex !== index}
          >
            {/* Zoom quase imperceptível ("Ken Burns") só na imagem ativa — sugere
                profundidade, nunca movimento perceptível. */}
            <div
              className={`relative h-full w-full transition-transform ease-linear ${
                slideIndex === index ? "duration-[9000ms] scale-[1.025]" : "duration-0 scale-100"
              }`}
            >
              <PlaceholderImage
                src={slide.imageSrc}
                alt={slide.imageAlt}
                label={slide.title}
                priority={slideIndex === 0}
                // Só o banner inicial (LCP, acima da dobra) precisa do sizes:
                // é full-bleed, sem padding nem max-width no container.
                sizes={slideIndex === 0 ? "100vw" : undefined}
                // Foto de origem em retrato (2:3): no recorte bem largo do
                // hero, o centro padrão deixa o rótulo do frasco atrás do
                // texto sobreposto. Ancorar mais alto mantém o frasco
                // inteiro visível e afasta o rótulo da faixa de texto.
                className={slide.id === "sprays-de-ambiente" ? "object-[center_25%]" : undefined}
              />
            </div>
            <div
              className={`absolute inset-x-0 bottom-0 flex flex-col items-center px-6 text-center text-white ${
                slide.id === "velas-4-estacoes"
                  ? "pb-8 [text-shadow:0_2px_12px_rgb(0_0_0_/_45%)] sm:pb-20"
                  : slide.id === "sprays-de-ambiente"
                    ? "pb-16 [text-shadow:0_2px_12px_rgb(0_0_0_/_45%)] sm:pb-20"
                    : "pb-16 sm:pb-20"
              }`}
            >
              <h2
                className={
                  slide.hideOverlayHeading
                    ? "sr-only"
                    : slide.id === "velas-4-estacoes"
                      ? "max-w-3xl font-serif text-3xl leading-tight font-normal tracking-tight sm:text-6xl lg:text-7xl"
                      : "max-w-3xl font-serif text-4xl leading-tight font-normal tracking-tight sm:text-6xl lg:text-7xl"
                }
              >
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p
                  className={
                    slide.hideOverlayHeading
                      ? "sr-only"
                      : `text-sm font-light text-white/80 sm:text-base ${
                          slide.id === "velas-4-estacoes" ? "mt-2 max-w-lg sm:mt-4 lg:max-w-2xl" : "mt-4 max-w-md"
                        }`
                  }
                >
                  {slide.subtitle}
                </p>
              )}
              <Link
                href={slide.ctaHref}
                className={`group/cta inline-flex items-center gap-3 border border-white/70 px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-brand-orange hover:bg-brand-orange ${
                  slide.id === "velas-4-estacoes" ? "mt-5 sm:mt-8" : "mt-8"
                }`}
              >
                {slide.ctaLabel}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover/cta:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Banner anterior"
            className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/40 p-2.5 text-xl leading-none text-white opacity-0 transition-all duration-300 hover:border-white hover:bg-white/10 group-hover:opacity-100 sm:flex sm:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Próximo banner"
            className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/40 p-2.5 text-xl leading-none text-white opacity-0 transition-all duration-300 hover:border-white hover:bg-white/10 group-hover:opacity-100 sm:flex sm:right-6"
          >
            ›
          </button>

          <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2 px-6 sm:bottom-8">
            {HERO_SLIDES.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(slideIndex)}
                aria-label={`Ir para o banner ${slideIndex + 1}`}
                aria-current={slideIndex === index}
                className="h-[3px] w-10 overflow-hidden rounded-full bg-white/30 sm:w-14"
              >
                {slideIndex === index && (
                  <span
                    aria-hidden
                    className="block h-full origin-left bg-white"
                    style={{ animation: `hero-progress ${AUTOPLAY_MS}ms linear forwards` }}
                  />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
