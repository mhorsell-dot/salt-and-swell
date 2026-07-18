import type { Metadata } from "next";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Layers3 } from "lucide-react";
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

type CollectionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatCurrency(value: string): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Number(value));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;

  const collection = await prisma.collection.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      description: true,
    },
  });

  if (!collection) {
    return {
      title: "Collection Not Found | Salt & Swell",
    };
  }

  const description =
    collection.description ?? `Shop the ${collection.name} collection from Salt & Swell.`;

  return {
    title: `${collection.name} | Salt & Swell`,
    description: description.slice(0, 160),
    openGraph: {
      title: `${collection.name} | Salt & Swell`,
      description: description.slice(0, 160),
      type: "website",
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;

  const collection = await prisma.collection.findUnique({
    where: {
      slug,
    },
    include: {
      products: {
        where: {
          active: true,
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
      },
    },
  });

  if (!collection) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#171715]">
      <header className="border-b border-white/15 bg-[#182321] text-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="text-2xl font-semibold tracking-[-0.04em]">
            Salt &amp; Swell
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/collections"
              className="hidden text-sm font-semibold text-white/65 transition hover:text-white sm:block"
            >
              Collections
            </Link>

            <Link
              href="/shop"
              className="text-sm font-semibold text-white/65 transition hover:text-white"
            >
              Shop
            </Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-black/10 px-6 py-16 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/50 transition hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            All collections
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.5fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
                Salt &amp; Swell collection
              </p>

              <h1 className="mt-5 max-w-4xl text-6xl font-semibold leading-[0.9] tracking-[-0.055em] sm:text-8xl">
                {collection.name}
              </h1>
            </div>

            <div className="lg:pb-2">
              {collection.description && (
                <p className="text-sm leading-7 text-black/55">{collection.description}</p>
              )}

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                {collection.products.length} product
                {collection.products.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {collection.products.length === 0 ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center border border-black/10 bg-white/40 px-6 text-center">
              <Layers3 className="h-9 w-9 text-black/30" />

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em]">
                This collection is being prepared.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-black/50">
                Products assigned to {collection.name} will appear here automatically.
              </p>

              <Link
                href="/shop"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#182321] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white"
              >
                Explore all products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {collection.products.map((product) => {
                const image = product.images[0]?.url ?? "/mockups/products/essential-tee-front.svg";

                const inventory = product.variants.reduce(
                  (total, variant) => total + variant.inventory,
                  0,
                );

                return (
                  <Link key={product.id} href={`/shop/${product.slug}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#dedbd3]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt={product.images[0]?.alt || product.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                      />

                      {product.featured && (
                        <span className="absolute left-4 top-4 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-black">
                          Featured
                        </span>
                      )}

                      {product.variants.length > 0 && inventory <= 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <span className="bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em]">
                            Sold out
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-sm font-semibold uppercase tracking-[0.04em]">
                          {product.name}
                        </h2>

                        <p className="mt-1 text-xs text-black/45">
                          {product.category?.name ?? "Salt & Swell"}
                        </p>

                        {product.variants.length > 0 && (
                          <p className="mt-2 text-xs text-black/40">
                            {inventory > 0 ? `${inventory} available` : "Out of stock"}
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
          )}
        </div>
      </section>
    </main>
  );
}
