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
      <header className="border-b border-white/15 bg-[#182321] text-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="text-2xl font-semibold tracking-[-0.04em]">
            Salt &amp; Swell
          </Link>

          <Link
            href="/shop"
            className="text-sm font-semibold text-white/70 transition hover:text-white"
          >
            Shop
          </Link>
        </div>
      </header>

      <section className="px-6 py-20 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
            Curated coastal ranges
          </p>

          <h1 className="mt-5 text-6xl font-semibold leading-[0.9] tracking-[-0.055em] sm:text-8xl">
            Collections
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-7 text-black/55">
            Explore considered ranges inspired by the Australian coast, open roads and everyday life
            beside the ocean.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {collections.length === 0 ? (
            <div className="flex min-h-96 flex-col items-center justify-center border border-black/10 bg-white/40 px-6 text-center">
              <Layers3 className="h-9 w-9 text-black/30" />

              <h2 className="mt-5 text-2xl font-semibold">Collections are coming.</h2>

              <p className="mt-3 max-w-md text-sm leading-7 text-black/50">
                New curated Salt &amp; Swell ranges will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {collections.map((collection) => {
                const image =
                  collection.products[0]?.images[0]?.url ??
                  "/mockups/products/essential-tee-lifestyle.svg";

                return (
                  <article
                    key={collection.id}
                    className="group relative flex min-h-[620px] items-end overflow-hidden bg-[#d9d5cc]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={collection.name}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="relative p-8 text-white sm:p-12">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65">
                        {collection.products.length} product
                        {collection.products.length === 1 ? "" : "s"}
                      </p>

                      <h2 className="mt-4 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">
                        {collection.name}
                      </h2>

                      {collection.description && (
                        <p className="mt-5 max-w-lg text-sm leading-7 text-white/70">
                          {collection.description}
                        </p>
                      )}

                      <Link
                        href={`/collections/${collection.slug}`}
                        className="mt-7 inline-flex items-center gap-3 border-b border-white pb-2 text-xs font-semibold uppercase tracking-[0.15em]"
                      >
                        Explore collection
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
