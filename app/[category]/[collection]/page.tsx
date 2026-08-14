import { notFound } from "next/navigation";
import CollectionShowcase from "@/components/collections/CollectionShowcase";
import AmbientOrnament from "@/components/ui/AmbientOrnament";
import { COLLECTIONS, getCollection } from "@/lib/content";

export function generateStaticParams() {
  return COLLECTIONS.map((collection) => ({
    category: collection.categorySlug,
    collection: collection.slug,
  }));
}

type CollectionPageProps = {
  params: Promise<{ category: string; collection: string }>;
};

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { category: categorySlug, collection: collectionSlug } = await params;
  const collection = getCollection(categorySlug, collectionSlug);

  if (!collection) {
    notFound();
  }

  return (
    <div className="relative isolate overflow-hidden pt-28 sm:pt-36">
      <AmbientOrnament
        variant="rings"
        tone="orange"
        className="-top-16 -right-24 hidden h-72 w-72 sm:block sm:h-96 sm:w-96"
      />
      <CollectionShowcase collection={collection} />
    </div>
  );
}
