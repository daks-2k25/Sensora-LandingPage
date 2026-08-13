import AmbientOrnament from "@/components/ui/AmbientOrnament";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { MANIFESTO_CONTENT } from "@/lib/content";

export default function Manifesto() {
  return (
    <section
      aria-label="Manifesto Sensora"
      className="relative overflow-hidden px-6 py-32 sm:py-40 lg:py-48"
    >
      <AmbientOrnament
        variant="wave"
        tone="navy"
        className="left-1/2 top-1/2 h-[280px] w-[720px] -translate-x-1/2 -translate-y-1/2 sm:h-[360px] sm:w-[920px]"
      />
      <RevealOnScroll className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <span aria-hidden className="h-px w-12 bg-brand-orange" />
        <p className="font-serif text-3xl leading-snug font-normal tracking-tight text-brand-navy italic sm:text-4xl lg:text-5xl">
          {MANIFESTO_CONTENT.quote}
        </p>
      </RevealOnScroll>
    </section>
  );
}
