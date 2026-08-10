import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { FOOTER_CONTENT, NAV_CATEGORIES, PRODUCT_CATEGORIES } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          <Logo className="items-start text-left" />
          <p className="mt-4 max-w-xs text-sm text-white/70">{FOOTER_CONTENT.tagline}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
            Navegação
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {NAV_CATEGORIES.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
            Categorias
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {PRODUCT_CATEGORIES.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
            Contato
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>{FOOTER_CONTENT.contact.email}</li>
            <li>{FOOTER_CONTENT.contact.phone}</li>
          </ul>
          <div className="mt-6 flex gap-4">
            {FOOTER_CONTENT.social.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-sm text-white/70 transition-colors hover:text-brand-orange"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-center text-xs text-white/60 sm:flex-row sm:text-left">
          <p>© {year} Sensora. Todos os direitos reservados.</p>
          <p className="uppercase tracking-[0.2em]">Marketing Sensorial</p>
        </div>
      </div>
    </footer>
  );
}
