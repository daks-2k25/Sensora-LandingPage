import Link from "next/link";
import type { ReactNode } from "react";

const VARIANTS = {
  primary: "bg-brand-orange text-white hover:bg-brand-orange-light",
  outline: "border border-white text-white hover:bg-white hover:text-brand-navy",
  navy: "bg-brand-navy text-white hover:bg-brand-navy-light",
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
      className={`inline-flex items-center justify-center rounded-full px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
