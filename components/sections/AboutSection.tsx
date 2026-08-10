import { ABOUT_CONTENT } from "@/lib/content";

export default function AboutSection() {
  return (
    <section aria-labelledby="sobre-heading" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -left-28 top-1/2 hidden w-[440px] -translate-y-1/2 text-brand-orange sm:block"
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

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:gap-16">
        <div aria-hidden className="hidden lg:block" />
        <div className="lg:pr-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange">
            {ABOUT_CONTENT.eyebrow}
          </p>
          <h2 id="sobre-heading" className="mt-3 text-3xl font-semibold text-brand-navy sm:text-4xl">
            {ABOUT_CONTENT.title}
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-600">
            {ABOUT_CONTENT.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
