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
    <section aria-label="Destaques Sensora" className="relative w-full overflow-hidden bg-brand-navy">
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {HERO_SLIDES.map((slide, slideIndex) => (
          <div
            key={slide.id}
            className="relative aspect-[4/5] w-full flex-shrink-0 sm:aspect-[16/9] lg:aspect-[21/9]"
            aria-hidden={slideIndex !== index}
          >
            <PlaceholderImage
              src={slide.imageSrc}
              alt={slide.imageAlt}
              label={slide.title}
              priority={slideIndex === 0}
            />
            <div
              className={
                slide.hideOverlayHeading
                  ? "absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent"
                  : "absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"
              }
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-6 pb-12 text-center text-white sm:pb-16">
              <h2
                className={
                  slide.hideOverlayHeading
                    ? "sr-only"
                    : "text-2xl font-light tracking-wide sm:text-4xl"
                }
              >
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p
                  className={
                    slide.hideOverlayHeading
                      ? "sr-only"
                      : "max-w-md text-sm text-white/85 sm:text-base"
                  }
                >
                  {slide.subtitle}
                </p>
              )}
              <Link
                href={slide.ctaHref}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-orange px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-orange-light"
              >
                {slide.ctaLabel}
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
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/30 p-2 text-2xl leading-none text-white transition-colors hover:bg-black/50 sm:flex"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Próximo banner"
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/30 p-2 text-2xl leading-none text-white transition-colors hover:bg-black/50 sm:flex"
          >
            ›
          </button>

          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
            {HERO_SLIDES.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(slideIndex)}
                aria-label={`Ir para o banner ${slideIndex + 1}`}
                aria-current={slideIndex === index}
                className={`h-2 rounded-full transition-all ${
                  slideIndex === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
