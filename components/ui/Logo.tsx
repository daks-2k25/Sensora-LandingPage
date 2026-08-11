type LogoProps = {
  className?: string;
};

// Logo em texto até o arquivo oficial da Sensora ser fornecido.
// Basta trocar por um <Image src="/logo.png" ... /> quando o arquivo chegar.
export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`flex flex-col items-center leading-none ${className}`}>
      <span className="text-4xl font-light tracking-[0.35em] text-white mr-[-0.35em]">
        SENS<span className="text-brand-orange">O</span>RA
      </span>
      <span className="mt-4.5 text-[10px] font-medium tracking-[0.5em] text-brand-orange mr-[-0.5em]">
        MARKETING SENSORIAL
      </span>
    </span>
  );
}
