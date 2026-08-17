import Link from "next/link";
import type { ReactNode } from "react";

const VARIANTS = {
  primary: "bg-brand-orange text-white hover:bg-brand-orange-light hover:shadow-brand-orange/25",
  outline: "border border-white text-white hover:bg-white hover:text-brand-navy hover:shadow-black/10",
  navy: "bg-brand-navy text-white hover:bg-brand-navy-light hover:shadow-brand-navy/30",
} as const;

type ButtonProps = {
  href: string;
  variant?: keyof typeof VARIANTS;
  className?: string;
  children: ReactNode;
};

export default function Button({
  href,
  variant = "primary",
  className = "",
  children,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-lg ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
