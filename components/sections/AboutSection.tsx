import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { ABOUT_CONTENT } from "@/lib/content";

export default function AboutSection() {
  return (
    <section aria-labelledby="sobre-heading" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-24">
        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
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
        </div>

        <div className="lg:pr-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange">
            {ABOUT_CONTENT.eyebrow}
          </p>
          <h2 id="sobre-heading" className="mt-4 text-3xl font-semibold text-brand-navy sm:text-4xl">
            {ABOUT_CONTENT.title}
          </h2>
          <div className="mt-7 max-w-xl space-y-6 text-base leading-relaxed text-slate-600">
            {ABOUT_CONTENT.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
