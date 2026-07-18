import Link from "next/link";
import { ArrowRight, Package, ShoppingBag, Sparkles } from "lucide-react";

import prisma from "@/lib/prisma";

const fallbackImages = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1200&q=85",
];

function formatCurrency(value: string) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Number(value));
}

export default async function LiveProductGrid({
  limit,
  showEmptyState = true,
}: {
  limit?: number;
  showEmptyState?: boolean;
}) {
  const products = await prisma.product.findMany({
    where: {
      active: true,
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
          Products created and activated through the Salt &amp; Swell admin will
          automatically appear here.
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
          product.images[0]?.url ??
          fallbackImages[index % fallbackImages.length];

        const secondaryImage = product.images[1]?.url ?? primaryImage;

        const inventory = product.variants.reduce(
          (total, variant) => total + variant.inventory,
          0,
        );

        const hasVariants = product.variants.length > 0;
        const isOutOfStock = hasVariants && inventory === 0;
        const isLowStock = hasVariants && inventory > 0 && inventory <= 5;

        return (
          <article key={product.id} className="group">
            <Link href={`/shop/${product.slug}`} className="block">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e7e4dc]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={primaryImage}
                  alt={product.images[0]?.alt || product.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025] group-hover:opacity-0"
                />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={secondaryImage}
                  alt={
                    product.images[1]?.alt || `${product.name} alternate view`
                  }
                  className="absolute inset-0 h-full w-full scale-[1.025] object-cover opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
                  {product.featured && (
                    <span className="inline-flex items-center gap-1.5 bg-white px-3 py-2 text-[9px] font-bold uppercase tracking-[0.17em] text-black shadow-sm">
                      <Sparkles className="h-3 w-3" />
                      Featured
                    </span>
                  )}

                  {isOutOfStock && (
                    <span className="bg-black px-3 py-2 text-[9px] font-bold uppercase tracking-[0.17em] text-white">
                      Sold out
                    </span>
                  )}

                  {isLowStock && (
                    <span className="bg-[#ded8ca] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.17em] text-black">
                      Low stock
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="flex h-12 items-center justify-center gap-2 bg-white text-xs font-semibold uppercase tracking-[0.14em] text-black shadow-sm">
                    <ShoppingBag className="h-4 w-4" />
                    View product
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.04em]">
                      {product.name}
                    </h3>

                    <p className="mt-1.5 text-sm text-black/50">
                      {product.category?.name ??
                        product.collection?.name ??
                        "Salt & Swell"}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold">
                    {formatCurrency(product.price.toString())}
                  </p>
                </div>

                {hasVariants && (
                  <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-3">
                    <p className="text-xs text-black/45">
                      {product.variants.length} size option
                      {product.variants.length === 1 ? "" : "s"}
                    </p>

                    <p
                      className={
                        isOutOfStock
                          ? "text-xs font-semibold text-red-700"
                          : isLowStock
                            ? "text-xs font-semibold text-amber-700"
                            : "text-xs font-semibold text-black/55"
                      }
                    >
                      {isOutOfStock ? "Unavailable" : `${inventory} available`}
                    </p>
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
