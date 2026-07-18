import Link from "next/link";
import { ArrowRight } from "lucide-react";

import prisma from "@/lib/prisma";

function formatCurrency(value: string): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Number(value));
}

export default async function RelatedProducts({
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
        ...(categoryId ? [{ categoryId }] : []),
        ...(collectionId ? [{ collectionId }] : []),
      ],
    },
    include: {
      images: {
        orderBy: {
          sortOrder: "asc",
        },
        take: 1,
      },
      variants: true,
      category: true,
    },
    orderBy: [
      {
        featured: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
    take: 4,
  });

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-black/10 px-6 py-20 sm:py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
              Continue exploring
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
              You may also like
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em]"
          >
            Shop all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const image =
              product.images[0]?.url ??
              "/mockups/products/essential-tee-front.svg";

            const inventory = product.variants.reduce(
              (total, variant) => total + variant.inventory,
              0,
            );

            return (
              <Link
                key={product.id}
                href={`/shop/${product.slug}`}
                className="group block"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#e7e4dc]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={product.images[0]?.alt || product.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                  />
                </div>

                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.04em]">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-xs text-black/45">
                      {product.category?.name ?? "Salt & Swell"}
                    </p>

                    {product.variants.length > 0 && (
                      <p className="mt-2 text-xs text-black/40">
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
