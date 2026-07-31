import Link from "next/link";
import { ArrowLeft, Package, ShoppingBag } from "lucide-react";
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

type ProductPageProps = {
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

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
      collection: true,
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
      variants: {
        orderBy: [
          {
            colour: "asc",
          },
          {
            size: "asc",
          },
        ],
      },
    },
  });

  if (!product || !product.active) {
    notFound();
  }

  const primaryImage =
    product.images[0]?.url ??
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=90";

  const galleryImages =
    product.images.length > 0
      ? product.images
      : [
          {
            id: "fallback-image",
            url: primaryImage,
            alt: product.name,
            sortOrder: 0,
            productId: product.id,
          },
        ];

  const sizes = Array.from(
    new Set(product.variants.map((variant) => variant.size).filter(Boolean)),
  );

  const colours = Array.from(
    new Set(product.variants.map((variant) => variant.colour).filter(Boolean)),
  );

  const inventory = product.variants.reduce((total, variant) => total + variant.inventory, 0);

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#171715]">
      <header className="border-b border-black/10 bg-[#182321] text-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="text-2xl font-semibold tracking-[-0.04em]">
            Salt &amp; Swell
          </Link>

          <nav className="flex items-center gap-7 text-sm font-medium">
            <Link href="/shop" className="text-white">
              Shop
            </Link>

            <Link
              href="/collections"
              className="hidden text-white/65 transition hover:text-white sm:block"
            >
              Collections
            </Link>

            <Link
              href="/about"
              className="hidden text-white/65 transition hover:text-white sm:block"
            >
              Our Story
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/55 transition hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </Link>
      </div>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:pb-28">
        <div className="grid gap-4 sm:grid-cols-2">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={
                index === 0
                  ? "relative aspect-[4/5] overflow-hidden bg-neutral-200 sm:col-span-2"
                  : "relative aspect-[4/5] overflow-hidden bg-neutral-200"
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.alt || product.name}
                className="h-full w-full object-cover"
              />

              {index === 0 && product.featured && (
                <span className="absolute left-5 top-5 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black">
                  Featured
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-10 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
            {product.category?.name ?? product.collection?.name ?? "Salt & Swell"}
          </p>

          <h1 className="mt-4 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl">
            {product.name}
          </h1>

          <p className="mt-6 text-xl font-semibold">{formatCurrency(product.price.toString())}</p>

          <div className="mt-8 border-y border-black/10 py-7">
            <p className="whitespace-pre-line text-sm leading-7 text-black/65">
              {product.description}
            </p>
          </div>

          {colours.length > 0 && (
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">Colour</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {colours.map((colour) => (
                  <button
                    key={colour}
                    type="button"
                    className="min-w-20 border border-black/20 px-4 py-3 text-sm font-medium transition hover:border-black"
                  >
                    {colour}
                  </button>
                ))}
              </div>
            </div>
          )}

          {sizes.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">Size</p>

                <button
                  type="button"
                  className="text-xs font-semibold text-black/50 underline underline-offset-4"
                >
                  Size guide
                </button>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className="h-12 border border-black/20 text-sm font-semibold transition hover:border-black hover:bg-black hover:text-white"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-[90px_1fr] gap-3">
            <label className="sr-only" htmlFor="quantity">
              Quantity
            </label>

            <input
              id="quantity"
              type="number"
              min="1"
              defaultValue="1"
              className="h-14 border border-black/20 bg-transparent px-4 text-center text-sm font-semibold outline-none focus:border-black"
            />

            <button
              type="button"
              disabled={product.variants.length > 0 && inventory === 0}
              className="inline-flex h-14 items-center justify-center gap-3 bg-black px-6 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-black/30"
            >
              <ShoppingBag className="h-5 w-5" />
              {product.variants.length > 0 && inventory === 0 ? "Out of stock" : "Add to bag"}
            </button>
          </div>

          <div className="mt-8 grid gap-3 border-t border-black/10 pt-7 text-sm text-black/60">
            <div className="flex items-start gap-3">
              <Package className="mt-0.5 h-5 w-5 shrink-0 text-black" />

              <div>
                <p className="font-semibold text-black">Complimentary delivery over $150</p>
                <p className="mt-1 leading-6">
                  Standard Australian delivery is calculated at checkout.
                </p>
              </div>
            </div>

            <div className="border-t border-black/10 pt-4">
              <p className="font-semibold text-black">Easy 30-day returns</p>

              <p className="mt-1 leading-6">
                Return unworn products in their original condition within 30 days.
              </p>
            </div>
          </div>

          {product.variants.length > 0 && (
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-black/45">
              {inventory > 0 ? `${inventory} units currently available` : "Currently unavailable"}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
