import Link from "next/link";
import { ArrowRight, Layers3 } from "lucide-react";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const collections = await prisma.collection.findMany({
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
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#171715]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#111412] text-white">
        <div className="absolute inset-0">
          <img
            src="/images/hero/salt-swell-hero.png"
            alt="Salt & Swell coastal lifestyle"
            className="h-full w-full object-cover opacity-45"
          />

          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-36 lg:px-10">
          <p className="text-xs uppercase tracking-[0.45em] text-white/60">Salt & Swell</p>

          <h1 className="mt-8 max-w-5xl text-6xl font-semibold leading-[0.9] tracking-[-0.05em] sm:text-8xl">
            Collections
            <br />
            made for the coast.
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-8 text-white/75">
            Explore considered apparel inspired by Australian beaches, coastal roads and everyday
            adventures.
          </p>
        </div>
      </section>

      {/* Collections */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {collections.length === 0 ? (
            <div className="flex min-h-96 flex-col items-center justify-center border border-black/10 bg-white/40 px-6 text-center">
              <Layers3 className="h-9 w-9 text-black/30" />

              <h2 className="mt-5 text-2xl font-semibold">Collections are coming.</h2>

              <p className="mt-3 max-w-md text-sm leading-7 text-black/50">
                New curated Salt & Swell ranges will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {collections.map((collection) => {
                const image =
                  collection.products[0]?.images[0]?.url ?? "/images/hero/salt-swell-hero.png";

                return (
                  <Link
                    key={collection.id}
                    href={`/collections/${collection.slug}`}
                    className="group relative block min-h-[650px] overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={collection.name}
                      className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    <div className="relative flex min-h-[650px] items-end p-8 text-white sm:p-14">
                      <div className="max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                          {collection.products.length} pieces
                        </p>

                        <h2 className="mt-5 text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
                          {collection.name}
                        </h2>

                        {collection.description && (
                          <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
                            {collection.description}
                          </p>
                        )}

                        <span className="mt-8 inline-flex items-center gap-3 border-b border-white pb-2 text-sm font-semibold uppercase tracking-[0.18em]">
                          Explore collection
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </span>
                      </div>
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
