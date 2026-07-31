#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "BUILD 033C - COMPLETE THE LOOK"
echo "========================================"

FILE="components/storefront/CompleteTheLook.tsx"

cp "$FILE" "${FILE}.backup-$(date +%Y%m%d-%H%M%S)" 2>/dev/null || true

cat > "$FILE" <<'TSX'
import Link from "next/link";

import prisma from "@/lib/prisma";

function formatCurrency(value: string): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Number(value));
}

export default async function CompleteTheLook({
  productId,
  categoryId,
  collectionId,
}: {
  productId: string;
  categoryId: string | null;
  collectionId: string | null;
}) {
  const products = await prisma.product.findMany({
    where: {
      id: {
        not: productId,
      },
      active: true,
      OR: [
        ...(collectionId ? [{ collectionId }] : []),
        ...(categoryId ? [{ categoryId }] : []),
      ],
    },
    include: {
      images: {
        orderBy: {
          sortOrder: "asc",
        },
        take: 1,
      },
    },
    orderBy: [
      { featured: "desc" },
      { createdAt: "desc" },
    ],
    take: 3,
  });

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-black/10 px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
          Complete the Look
        </p>

        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
          Styled Together
        </h2>

        <p className="mt-4 max-w-xl text-black/60">
          Curated pieces that pair perfectly with this item.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {products.map(product => {

            const image =
              product.images[0]?.url ??
              "/mockups/products/essential-tee-front.svg";

            return (
              <Link
                key={product.id}
                href={`/shop/${product.slug}`}
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#e7e4dc]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  {product.name}
                </h3>

                <p className="mt-1 text-sm text-black/55">
                  {formatCurrency(product.price.toString())}
                </p>
              </Link>
            );

          })}

        </div>

      </div>
    </section>
  );
}
TSX

echo "✅ CompleteTheLook upgraded."
