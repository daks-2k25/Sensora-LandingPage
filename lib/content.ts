import { LOJA_URL } from "@/lib/config";

export type NavCategory = {
  label: string;
  href: string;
};

export type HeroSlide = {
  id: string;
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  imageAlt: string;
  /** Quando definido, a imagem final substitui o placeholder automaticamente. */
  imageSrc?: string;
};

export type ProductCategory = {
  id: string;
  label: string;
  href: string;
  /** Quando definido, a imagem final substitui o placeholder automaticamente. */
  imageSrc?: string;
};

// Categorias replicadas da navbar/hero de referência da Sensora.
export const NAV_CATEGORIES: NavCategory[] = [
  { label: "Velas Aromáticas", href: LOJA_URL },
  { label: "Sprays de Ambiente", href: LOJA_URL },
  { label: "Difusores de Aroma", href: LOJA_URL },
  { label: "Coleções", href: LOJA_URL },
];

// Slides do carrossel principal. Adicionar um novo banner é só incluir um
// novo item aqui — o componente HeroCarousel já suporta N slides.
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "velas-4-estacoes",
    title: "Velas 4 Estações",
    subtitle: "Primavera, Verão, Outono e Inverno em uma coleção.",
    ctaLabel: "Conhecer coleção",
    ctaHref: LOJA_URL,
    imageAlt: "Coleção de velas aromáticas 4 Estações da Sensora",
    // imageSrc: "/images/banners/velas-4-estacoes.jpg", // adicionar quando a arte final chegar
  },
  {
    id: "sprays-de-ambiente",
    title: "Sprays de Ambiente",
    subtitle: "Perfume o seu espaço com a assinatura Sensora.",
    ctaLabel: "Conhecer coleção",
    ctaHref: LOJA_URL,
    imageAlt: "Sprays de ambiente Sensora",
  },
  {
    id: "difusores-de-aroma",
    title: "Difusores de Aroma",
    subtitle: "Fragrância contínua para todos os ambientes.",
    ctaLabel: "Conhecer coleção",
    ctaHref: LOJA_URL,
    imageAlt: "Difusores de aroma Sensora",
  },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: "velas-aromaticas", label: "Velas Aromáticas", href: LOJA_URL },
  { id: "sprays-de-ambiente", label: "Sprays de Ambiente", href: LOJA_URL },
  { id: "difusores-de-aroma", label: "Difusores de Aroma", href: LOJA_URL },
  { id: "colecoes", label: "Coleções", href: LOJA_URL },
];

// Conteúdo institucional ainda não definido pela Sensora — mantido como
// placeholder explícito até que o texto final seja fornecido.
export const ABOUT_CONTENT = {
  eyebrow: "Marketing Sensorial",
  title: "Sobre a Sensora",
  paragraphs: [
    "[Texto institucional a definir: proposta da marca, identidade e o que torna a experiência Sensora única.]",
    "[Texto institucional a definir: cuidado na produção dos produtos e a sensação que a marca deseja transmitir.]",
  ],
};

export const FOOTER_CONTENT = {
  tagline: "Marketing sensorial em cada detalhe.",
  contact: {
    email: "[e-mail de contato a definir]",
    phone: "[telefone de contato a definir]",
  },
  social: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
  ],
};
