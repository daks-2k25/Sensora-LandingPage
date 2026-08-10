type LogoProps = {
  className?: string;
};

// Logo em texto até o arquivo oficial da Sensora ser fornecido.
// Basta trocar por um <Image src="/logo.png" ... /> quando o arquivo chegar.
export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`flex flex-col items-center leading-none ${className}`}>
      <span className="text-2xl font-light tracking-[0.35em] text-white">
        SENS<span className="text-brand-orange">O</span>RA
      </span>
      <span className="mt-1.5 text-[10px] font-medium tracking-[0.3em] text-brand-orange">
        MARKETING SENSORIAL
      </span>
    </span>
  );
}
