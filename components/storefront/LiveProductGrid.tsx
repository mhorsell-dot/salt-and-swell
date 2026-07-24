import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Package, ShoppingBag } from "lucide-react";

import prisma from "@/lib/prisma";

const fallbackImages = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1200&q=85",
];

const colourMap: Record<string,string> = {
  Black:"#111111",
  White:"#ffffff",
  Navy:"#1b2b44",
  Blue:"#3b82f6",
  Grey:"#9ca3af",
  Sand:"#d6c3a5",
  Beige:"#e7d7bc",
  Olive:"#6b7d4d",
  Sage:"#9caf88",
  Brown:"#8b5a2b",
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

      ...(gender && {
        gender,
      }),

      ...(featured !== undefined && {
        featured,
      }),

      ...(category && {
        category: {
          slug: category,
        },
      }),

      ...(collection && {
        collection: {
          slug: collection,
        },
      }),
    },

    include: {
      category: true,
      collection: true,
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
      variants: true,
    },

    orderBy: [
      {
        featured: "desc",
      },
      {
        createdAt: "desc",
      },
    ],

    take: limit,
  });

if (products.length === 0 && showEmptyState) {
    return (
      <div className="mt-10 flex min-h-[360px] flex-col items-center justify-center border border-black/10 bg-white/40 px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
          <Package className="h-6 w-6" />
        </div>

        <h3 className="mt-6 text-2xl font-semibold tracking-tight">
          The first collection is coming.
        </h3>

        <p className="mt-3 max-w-md text-sm leading-7 text-black/55">
          Products created and activated through the Salt &amp; Swell admin will automatically
          appear here.
        </p>

        <Link
          href="/admin/products/new"
          className="mt-7 inline-flex items-center gap-3 border-b border-black pb-2 text-xs font-semibold uppercase tracking-[0.16em]"
        >
          Create a product
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, index) => {
        const primaryImage =
          product.images[0]?.url ?? fallbackImages[index % fallbackImages.length];

        const secondaryImage = product.images[1]?.url ?? primaryImage;

        const inventory = product.variants.reduce((total, variant) => total + variant.inventory, 0);

        const colours = Array.from(
          new Set(product.variants.map((variant) => variant.colour).filter(Boolean)),
        );

        const hasVariants = product.variants.length > 0;
        const isOutOfStock = hasVariants && inventory === 0;
        const isLowStock = hasVariants && inventory > 0 && inventory <= 5;

        return (
          <article key={product.id} className="
group
overflow-hidden
rounded-[28px]
bg-white
shadow-sm
transition-all
duration-500
hover:-translate-y-2
hover:shadow-2xl
">
            <Link href={`/shop/${product.slug}`} className="block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[28px] bg-[#f6f4ef]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  src={primaryImage}
                  alt={product.images[0]?.alt || product.name}
                  fill
                  sizes="(max-width:768px)100vw,(max-width:1200px)50vw,25vw"
                  className="absolute inset-0 object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-0"
                />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  src={secondaryImage}
                  alt={product.images[1]?.alt || `${product.name} alternate view`}
                  fill
                  sizes="(max-width:768px)100vw,(max-width:1200px)50vw,25vw"
                  className="absolute inset-0 object-cover opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                <button
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition hover:scale-110"
                >
                  <Heart className="h-5 w-5"/>
                </button>

                <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
                  {product.featured && (
                    <span className="rounded-full bg-white/95 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] shadow-lg backdrop-blur">
                      New Arrival
                    </span>
                  )}

                  {isOutOfStock && (
                    <span className="rounded-full bg-black px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                      Sold out
                    </span>
                  )}

                  {isLowStock && (
                    <span className="rounded-full bg-[#ece6d8] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em]">
                      Low stock
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <button
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold shadow-xl transition-all duration-300 hover:bg-black hover:text-white">
                    <ShoppingBag className="h-4 w-4" />
                    Quick Add
                  </button>
                </div>
              </div>

              <div className="space-y-5 p-6">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-xs uppercase tracking-[0.3em] text-black/40">
                      {product.category?.name ?? product.collection?.name ?? "Salt & Swell"}
                    </p>
                  </div>

                  <p className="shrink-0 text-lg font-semibold tracking-tight">
                    {formatCurrency(product.price.toString())}
                  </p>
                </div>

                {hasVariants && colours.length > 0 && (
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      {colours.slice(0, 5).map((colour) => (
                        <span
                          key={colour}
                          title={colour}
                          className="h-4 w-4 rounded-full border border-black/15"
                          style={{
                            backgroundColor:
                              colourMap[colour] ??
                              "#d4d4d4",
                          }}
                        />
                      ))}
                    </div>

                    <span className="text-[10px] uppercase tracking-[0.18em] text-black/45">
                      {colours.length} colours
                    </span>
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
