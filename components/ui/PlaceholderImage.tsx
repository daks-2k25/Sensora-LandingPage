import Image from "next/image";

type PlaceholderImageProps = {
  alt: string;
  /** Quando definido, renderiza a imagem final no lugar do placeholder. */
  src?: string;
  label?: string;
  priority?: boolean;
  /** Atributo `sizes` do next/image (obrigatório com `fill` para evitar o
   *  warning de performance) — descreve a largura real renderizada da
   *  imagem em cada breakpoint. Ver o call site para o cálculo específico. */
  sizes?: string;
  className?: string;
};

// Ocupa 100% do container relativo do pai (posicionamento absoluto embutido).
// Basta passar `src` quando a arte final estiver disponível — nenhum outro
// componente precisa mudar.
export default function PlaceholderImage({
  alt,
  src,
  label,
  priority = false,
  sizes,
  className = "",
}: PlaceholderImageProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-white/25 bg-gradient-to-br from-brand-navy via-brand-navy-light to-[#5b2f1c] px-6 text-center ${className}`}
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/45">
        Imagem em breve
      </span>
      {label && (
        <span className="text-lg font-light text-white/85 sm:text-xl">
          {label}
        </span>
      )}
    </div>
  );
}
