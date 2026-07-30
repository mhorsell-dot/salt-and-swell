import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Package } from "lucide-react";

import prisma from "@/lib/prisma";

const fallbackImages = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1200&q=85",
];

const colourMap: Record<string, string> = {
  Black: "#111111",
  White: "#ffffff",
  Navy: "#1b2b44",
  Blue: "#3b82f6",
  Grey: "#9ca3af",
  Sand: "#d6c3a5",
  Beige: "#e7d7bc",
  Olive: "#6b7d4d",
  Sage: "#9caf88",
  Brown: "#8b5a2b",
};

function formatCurrency(value: string) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Number(value));
}

type LiveProductGridProps = {
  limit?: number;
  showEmptyState?: boolean;
  category?: string;
  collection?: string;
  featured?: boolean;
  gender?: "MENS" | "WOMENS" | "UNISEX";
};

export default async function LiveProductGrid({
  limit,
  showEmptyState = true,
  category,
  collection,
  featured,
  gender,
}: LiveProductGridProps) {
  const products = await prisma.product.findMany({
    where: {
      active: true,
      ...(gender && { gender }),
      ...(featured !== undefined && { featured }),
      ...(category && { category: { slug: category } }),
      ...(collection && { collection: { slug: collection } }),
    },
    include: {
      category: true,
      collection: true,
      images: {
        orderBy: { sortOrder: "asc" },
      },
      variants: true,
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    take: limit,
  });

  if (products.length === 0 && showEmptyState) {
    return (
      <div className="mt-10 flex min-h-[360px] flex-col items-center justify-center border border-neutral-200 bg-white px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
          <Package className="h-6 w-6" />
        </div>

        <h3 className="mt-6 text-2xl font-light">The first collection is coming.</h3>

        <p className="mt-4 max-w-md text-neutral-500">
          Products created through the Salt &amp; Swell admin will appear here automatically.
        </p>

        <Link
          href="/admin/products/new"
          className="mt-8 inline-flex items-center gap-2 border-b border-black pb-2 text-xs uppercase tracking-[0.3em]"
        >
          Create Product
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, index) => {
        const primaryImage =
          product.images[0]?.url ?? fallbackImages[index % fallbackImages.length];

        const secondaryImage = product.images[1]?.url ?? primaryImage;

        const inventory = product.variants.reduce((total, variant) => total + variant.inventory, 0);

        const colours = Array.from(new Set(product.variants.map((v) => v.colour).filter(Boolean)));

        const hasVariants = product.variants.length > 0;
        const isOutOfStock = hasVariants && inventory === 0;

        return (
          <article
            key={product.id}
            className="group overflow-hidden rounded-[28px] bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
          >
            <Link href={`/shop/${product.slug}`}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] bg-[#F7F5F1]">
                <Image
                  src={primaryImage}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:opacity-0"
                />

                <Image
                  src={secondaryImage}
                  alt={product.name}
                  fill
                  className="object-cover scale-105 opacity-0 transition-all duration-[1400ms] ease-out group-hover:scale-100 group-hover:opacity-100"
                />

                <button className="absolute right-5 top-5 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110">
                  <Heart className="h-4 w-4" />
                </button>

                {product.featured && (
                  <div className="absolute left-5 top-5 bg-white px-3 py-2 text-[10px] uppercase tracking-[0.3em]">
                    NEW SEASON
                  </div>
                )}

                {isOutOfStock && (
                  <div className="absolute left-5 top-16 rounded-full bg-black px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white">
                    SOLD OUT
                  </div>
                )}

                <div className="absolute inset-x-6 bottom-6 translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="rounded-full bg-white/95 p-2 shadow-xl backdrop-blur-xl">
                    <div className="flex items-center justify-center rounded-full bg-black px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-neutral-800">
                      Quick Shop
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5 px-2 pt-6">
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-light tracking-wide transition-colors duration-300 group-hover:text-neutral-900">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-neutral-500">
                      {product.category?.name ?? product.collection?.name ?? "Salt & Swell"}
                    </p>
                  </div>

                  <p className="text-lg font-medium">{formatCurrency(product.price.toString())}</p>
                </div>

                {hasVariants && colours.length > 0 && (
                  <div className="flex gap-2">
                    {colours.slice(0, 5).map((colour) => (
                      <span
                        key={colour}
                        className="h-3 w-3 rounded-full border border-neutral-300"
                        style={{
                          backgroundColor: colourMap[colour] ?? "#cccccc",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
