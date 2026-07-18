import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

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
    <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, index) => {
        const image =
          product.images[0]?.url ??
          fallbackImages[index % fallbackImages.length];

        const inventory = product.variants.reduce(
          (total, variant) => total + variant.inventory,
          0,
        );

        return (
          <article key={product.id} className="group">
            <Link href="/shop" className="block">
              <div
                className="relative aspect-[4/5] overflow-hidden bg-neutral-200 bg-cover bg-center"
                style={{
                  backgroundImage: `url("${image}")`,
                }}
              >
                <div className="absolute inset-0 bg-black/5 transition duration-500 group-hover:bg-black/15" />

                {product.featured && (
                  <span className="absolute left-4 top-4 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black">
                    Featured
                  </span>
                )}

                <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="flex h-11 items-center justify-center bg-white text-sm font-semibold text-black">
                    View product
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-sm text-black/55">
                    {product.category?.name ??
                      product.collection?.name ??
                      "Salt & Swell"}
                  </p>

                  {product.variants.length > 0 && (
                    <p className="mt-1 text-xs text-black/40">
                      {inventory > 0
                        ? `${inventory} available`
                        : "Out of stock"}
                    </p>
                  )}
                </div>

                <p className="shrink-0 text-sm font-semibold">
                  {formatCurrency(product.price.toString())}
                </p>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
