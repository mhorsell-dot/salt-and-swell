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

function formatCurrency(value: string) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Number(value));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;

  const collection = await prisma.collection.findUnique({
    where: { slug },
    select: {
      name: true,
      description: true,
    },
  });

  if (!collection) {
    return {
      title: "Collection Not Found",
    };
  }

  return {
    title: `${collection.name} | Salt & Swell`,
    description:
      collection.description ?? `Explore the ${collection.name} collection from Salt & Swell.`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;

  const collection = await prisma.collection.findUnique({
    where: { slug },
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
      {/* Hero */}

      <section className="relative overflow-hidden bg-[#111412] text-white">
        <div className="absolute inset-0">
          <img
            src="/images/hero/salt-swell-hero.webp"
            alt={collection.name}
            className="h-full w-full object-cover opacity-45"
          />

          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-36 lg:px-10">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60"
          >
            <ArrowLeft className="h-4 w-4" />
            All collections
          </Link>

          <p className="mt-16 text-xs uppercase tracking-[0.4em] text-white/60">
            Salt & Swell Collection
          </p>

          <h1 className="mt-6 max-w-5xl text-6xl font-semibold leading-[0.9] tracking-[-0.05em] sm:text-8xl">
            {collection.name}
          </h1>

          {collection.description && (
            <p className="mt-10 max-w-xl text-lg leading-8 text-white/75">
              {collection.description}
            </p>
          )}
        </div>
      </section>

      {/* Products */}

      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between border-b border-black/10 pb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-black/40">Collection</p>

              <h2 className="mt-3 text-4xl font-semibold">{collection.products.length} pieces</h2>
            </div>
          </div>

          {collection.products.length === 0 ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center border border-black/10">
              <Layers3 className="h-10 w-10 text-black/30" />

              <h2 className="mt-6 text-3xl font-semibold">Coming soon</h2>
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {collection.products.map((product) => {
                const image = product.images[0]?.url ?? "/images/hero/salt-swell-hero.webp";

                const inventory = product.variants.reduce((total, v) => total + v.inventory, 0);

                return (
                  <Link key={product.id} href={`/shop/${product.slug}`} className="group">
                    <div className="aspect-[4/5] overflow-hidden bg-[#dedbd3]">
                      <img
                        src={image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-5 flex justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.08em]">
                          {product.name}
                        </h3>

                        <p className="mt-2 text-xs text-black/45">
                          {product.category?.name ?? collection.name}
                        </p>
                      </div>

                      <p className="text-sm font-semibold">
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

      {/* Story */}

      <section className="bg-[#111412] px-6 py-24 text-white lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Salt & Swell</p>

          <h2 className="mt-6 text-5xl font-semibold">Designed for life beside the ocean.</h2>

          <p className="mt-8 text-lg leading-8 text-white/65">
            Everyday essentials created for coastal mornings, open roads and wherever the tide takes
            you.
          </p>

          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-3 border-b border-white pb-2 text-sm uppercase tracking-[0.2em]"
          >
            Our story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
