import AmbientOrnament from "@/components/ui/AmbientOrnament";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { MANIFESTO_CONTENT } from "@/lib/content";

export default function Manifesto() {
  return (
    <section
      aria-label="Manifesto Sensora"
      className="relative overflow-hidden bg-[#f5f2ed] px-6 py-32 sm:py-40 lg:py-48"
    >
      <AmbientOrnament
        variant="wave"
        tone="navy"
        className="left-1/2 top-1/2 h-[280px] w-[720px] -translate-x-1/2 -translate-y-1/2 sm:h-[360px] sm:w-[920px]"
      />
      <AmbientOrnament
        variant="arc"
        tone="orange"
        className="-top-24 -left-24 hidden h-64 w-64 sm:block sm:h-80 sm:w-80"
      />
      <AmbientOrnament
        variant="rings"
        tone="navy"
        className="-bottom-28 -right-28 hidden h-72 w-72 sm:block sm:h-96 sm:w-96"
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
