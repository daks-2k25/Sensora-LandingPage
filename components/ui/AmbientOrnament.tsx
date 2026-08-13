type AmbientOrnamentProps = {
  /** "rings" ecoa os círculos do Sobre a Sensora; "wave"/"arc" sugerem
   *  o movimento de um aroma se espalhando. */
  variant?: "rings" | "wave" | "arc";
  tone?: "orange" | "navy";
  className?: string;
};

const TONE_CLASS: Record<NonNullable<AmbientOrnamentProps["tone"]>, string> = {
  orange: "text-brand-orange",
  navy: "text-brand-navy",
};

// Ornamento de fundo puramente decorativo: traço fino, sem preenchimento,
// opacidade muito baixa. Mesma linguagem visual dos círculos do Sobre a
// Sensora, só reaproveitada em outras seções — nunca compete com foto,
// texto ou CTA, e nunca deve ser usado como padrão repetido.
export default function AmbientOrnament({
  variant = "rings",
  tone = "orange",
  className = "",
}: AmbientOrnamentProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 600"
      fill="none"
      className={`pointer-events-none absolute -z-10 opacity-[0.07] ${TONE_CLASS[tone]} ${className}`}
    >
      {variant === "rings" && (
        <>
          <circle
            cx="220"
            cy="300"
            r="220"
            stroke="currentColor"
            strokeWidth="24"
            strokeDasharray="820 560"
            strokeLinecap="round"
          />
          <circle
            cx="360"
            cy="230"
            r="130"
            stroke="currentColor"
            strokeWidth="14"
            strokeDasharray="460 380"
            strokeLinecap="round"
            transform="rotate(24 360 230)"
          />
        </>
      )}
      {variant === "wave" && (
        <path
          d="M -40 340 C 90 220, 220 460, 350 320 S 620 200, 700 340"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
        />
      )}
      {variant === "arc" && (
        <circle
          cx="560"
          cy="40"
          r="320"
          stroke="currentColor"
          strokeWidth="18"
          strokeDasharray="1400 600"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
