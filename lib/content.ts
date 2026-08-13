import { LOJA_URL } from "@/lib/config";

export type CategorySlug = "velas" | "sprays" | "difusores";

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
  /** Usar quando a arte do slide já traz título/subtítulo desenhados nela. */
  hideOverlayHeading?: boolean;
};

export type ProductCategory = {
  id: string;
  label: string;
  href: string;
  /** Quando definido, a imagem final substitui o placeholder automaticamente. */
  imageSrc?: string;
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  imageAlt: string;
  /** Quando definido, a imagem final substitui o placeholder automaticamente. */
  imageSrc?: string;
};

export type FragranceNotes = {
  top?: string[];
  heart?: string[];
  base?: string[];
};

export type ProductItem = {
  slug: string;
  name: string;
  /** Rótulo curto exibido como chip/eyebrow (ex.: "Primavera"). */
  seasonLabel?: string;
  description: string;
  /** Notas olfativas — só renderizado quando definido. */
  notes?: FragranceNotes;
  /** Sensação/atmosfera transmitida pelo produto. */
  mood?: string;
  imageSrc?: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
};

export type Collection = {
  slug: string;
  categorySlug: CategorySlug;
  name: string;
  tagline?: string;
  description: string;
  heroImageSrc?: string;
  heroImageAlt: string;
  items: ProductItem[];
};

export type Category = {
  slug: CategorySlug;
  label: string;
  description: string;
  imageSrc?: string;
};

// ---------------------------------------------------------------------------
// Categorias — fonte única. Navbar, Footer, home e as páginas /[category]
// derivam tudo daqui; adicionar uma categoria nova não exige nenhum arquivo
// de rota novo (ver app/[category]/**).
// ---------------------------------------------------------------------------

export const CATEGORIES: Category[] = [
  {
    slug: "velas",
    label: "Velas Aromáticas",
    description:
      "Velas perfumadas que transformam qualquer ambiente em uma experiência sensorial completa.",
    imageSrc: "/images/categories/velas-aromaticas.png",
  },
  {
    slug: "sprays",
    label: "Sprays de Ambiente",
    description: "Fragrâncias em spray para perfumar o ambiente na hora, com a assinatura Sensora.",
  },
  {
    slug: "difusores",
    label: "Difusores de Aroma",
    description: "Fragrância contínua e discreta para manter a atmosfera perfumada o dia inteiro.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function getCategoryHref(slug: CategorySlug): string {
  return `/${slug}`;
}

// ---------------------------------------------------------------------------
// Coleções — cada uma pertence a uma categoria via categorySlug. Uma nova
// coleção (nesta ou em outra categoria) é só um novo item neste array: ela
// aparece sozinha em /colecoes e na página da sua categoria.
// ---------------------------------------------------------------------------

const VELAS_4_ESTACOES: Collection = {
  slug: "4-estacoes",
  categorySlug: "velas",
  name: "Velas 4 Estações",
  tagline: "Primavera, Verão, Outono e Inverno em uma coleção.",
  description:
    "Quatro atmosferas, infinitas memórias. Uma coleção criada para transformar cada momento do ano em uma experiência de aconchego, beleza e sensações que permanecem.",
  heroImageSrc: "/images/hero/velas-4-estacoes.png",
  heroImageAlt: "Coleção de velas aromáticas 4 Estações da Sensora",
  items: [
    {
      slug: "primavera",
      name: "Frescor de Primavera",
      seasonLabel: "Primavera",
      description: "[Descrição a definir: notas e inspiração da vela Frescor de Primavera.]",
      mood: "[Atmosfera a definir: sensação que a Sensora deseja transmitir na primavera.]",
      imageSrc: "/images/collections/velas-4-estacoes/primavera.png",
      imageAlt: "Vela aromática Frescor de Primavera da Sensora",
      ctaLabel: "Conhecer vela",
      ctaHref: LOJA_URL,
    },
    {
      slug: "verao",
      name: "Luz de Verão",
      seasonLabel: "Verão",
      description: "[Descrição a definir: notas e inspiração da vela Luz de Verão.]",
      mood: "[Atmosfera a definir: sensação que a Sensora deseja transmitir no verão.]",
      imageSrc: "/images/collections/velas-4-estacoes/verao.png",
      imageAlt: "Vela aromática Luz de Verão da Sensora",
      ctaLabel: "Conhecer vela",
      ctaHref: LOJA_URL,
    },
    {
      slug: "outono",
      name: "Manhã de Outono",
      seasonLabel: "Outono",
      description: "[Descrição a definir: notas e inspiração da vela Manhã de Outono.]",
      mood: "[Atmosfera a definir: sensação que a Sensora deseja transmitir no outono.]",
      imageSrc: "/images/collections/velas-4-estacoes/outono.png",
      imageAlt: "Vela aromática Manhã de Outono da Sensora",
      ctaLabel: "Conhecer vela",
      ctaHref: LOJA_URL,
    },
    {
      slug: "inverno",
      name: "Brisa de Inverno",
      seasonLabel: "Inverno",
      description: "[Descrição a definir: notas e inspiração da vela Brisa de Inverno.]",
      mood: "[Atmosfera a definir: sensação que a Sensora deseja transmitir no inverno.]",
      imageSrc: "/images/collections/velas-4-estacoes/inverno.png",
      imageAlt: "Vela aromática Brisa de Inverno da Sensora",
      ctaLabel: "Conhecer vela",
      ctaHref: LOJA_URL,
    },
  ],
};

export const COLLECTIONS: Collection[] = [VELAS_4_ESTACOES];

export function getCollectionsByCategory(categorySlug: string): Collection[] {
  return COLLECTIONS.filter((collection) => collection.categorySlug === categorySlug);
}

export function getCollection(categorySlug: string, collectionSlug: string): Collection | undefined {
  return COLLECTIONS.find(
    (collection) => collection.categorySlug === categorySlug && collection.slug === collectionSlug,
  );
}

export function getItem(
  categorySlug: string,
  collectionSlug: string,
  itemSlug: string,
): { collection: Collection; item: ProductItem } | undefined {
  const collection = getCollection(categorySlug, collectionSlug);
  const item = collection?.items.find((candidate) => candidate.slug === itemSlug);
  return collection && item ? { collection, item } : undefined;
}

export function getCollectionHref(collection: Pick<Collection, "categorySlug" | "slug">): string {
  return `/${collection.categorySlug}/${collection.slug}`;
}

export function getItemHref(
  collection: Pick<Collection, "categorySlug" | "slug">,
  item: Pick<ProductItem, "slug">,
): string {
  return `${getCollectionHref(collection)}/${item.slug}`;
}

// ---------------------------------------------------------------------------
// Navegação — derivada de CATEGORIES, sem lista escrita à mão. "Coleções"
// não é uma categoria de produto, é um índice transversal (/colecoes).
// ---------------------------------------------------------------------------

export const NAV_CATEGORIES: NavCategory[] = [
  ...CATEGORIES.map((category) => ({
    label: category.label,
    href: getCategoryHref(category.slug),
  })),
  { label: "Coleções", href: "/colecoes" },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  ...CATEGORIES.map((category) => ({
    id: category.slug,
    label: category.label,
    href: getCategoryHref(category.slug),
    imageSrc: category.imageSrc,
  })),
  { id: "colecoes", label: "Coleções", href: "/colecoes" },
];

// ---------------------------------------------------------------------------
// Slides do carrossel principal. Adicionar um novo banner é só incluir um
// novo item aqui — o componente HeroCarousel já suporta N slides.
// ---------------------------------------------------------------------------

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "velas-4-estacoes",
    title: VELAS_4_ESTACOES.name,
    subtitle: VELAS_4_ESTACOES.tagline,
    ctaLabel: "Conhecer coleção",
    ctaHref: getCollectionHref(VELAS_4_ESTACOES),
    imageAlt: VELAS_4_ESTACOES.heroImageAlt,
    imageSrc: VELAS_4_ESTACOES.heroImageSrc,
    // A arte já traz "Coleção 4 Estações" e a legenda desenhados na imagem;
    // sobrepor o título aqui de novo deixava o texto ilegível.
    hideOverlayHeading: true,
  },
  {
    id: "sprays-de-ambiente",
    title: "Sprays de Ambiente",
    subtitle: "Perfume o seu espaço com a assinatura Sensora.",
    ctaLabel: "Conhecer coleção",
    ctaHref: getCategoryHref("sprays"),
    imageAlt: "Sprays de ambiente Sensora",
  },
  {
    id: "difusores-de-aroma",
    title: "Difusores de Aroma",
    subtitle: "Fragrância contínua para todos os ambientes.",
    ctaLabel: "Conhecer coleção",
    ctaHref: getCategoryHref("difusores"),
    imageAlt: "Difusores de aroma Sensora",
  },
];

export const ABOUT_CONTENT: AboutContent = {
  eyebrow: "Marketing Sensorial",
  title: "Sobre a Sensora",
  paragraphs: [
    "Na Sensora Home, acreditamos que os aromas têm o poder de transformar a forma como vivemos nossos espaços. Uma fragrância pode despertar uma lembrança, marcar um momento ou simplesmente mudar a atmosfera de um ambiente. É por isso que criamos aromas que convidam você a sentir a casa de uma maneira diferente.",
    "Cada produto nasce da nossa experiência com o marketing sensorial, unindo perfumaria, estética e cuidado para transformar o cotidiano em experiências que despertam os sentidos. Porque uma casa bem perfumada não é apenas percebida — ela é sentida.",
  ],
  imageAlt: "Vela aromática Sensora Home decorada com flor de laranjeira",
  imageSrc: "/images/about/sobre-sensora.png",
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
