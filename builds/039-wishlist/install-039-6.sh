#!/usr/bin/env bash
set -e

echo "========================================"
echo "BUILD 039.6"
echo "Wishlist Page"
echo "========================================"

cat > app/account/wishlist/page.tsx <<'TS'
import Link from "next/link";
import prisma from "@/lib/prisma";

const DEMO_CUSTOMER_ID = "demo-customer";

function formatCurrency(value: string) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Number(value));
}

export const dynamic = "force-dynamic";

export default async function WishlistPage() {

  const items = await prisma.wishlistItem.findMany({
    where: {
      customerId: DEMO_CUSTOMER_ID,
    },
    include: {
      product: {
        include: {
          images: {
            orderBy:{
              sortOrder:"asc"
            },
            take:1,
          },
        },
      },
    },
    orderBy:{
      createdAt:"desc",
    },
  });


  return (
    <main className="min-h-screen bg-[#f5f3ee] px-6 py-20">

      <div className="mx-auto max-w-7xl">

        <p className="text-xs uppercase tracking-[0.3em] text-black/50">
          Saved items
        </p>

        <h1 className="mt-4 text-5xl font-bold tracking-tight">
          Your Wishlist
        </h1>


        {items.length === 0 ? (

          <div className="mt-20 text-center">

            <h2 className="text-2xl font-semibold">
              Your wishlist is empty
            </h2>

            <p className="mt-4 text-black/60">
              Save your favourite Salt & Swell pieces here.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-block bg-black px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white"
            >
              Explore Collection
            </Link>

          </div>

        ) : (

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {items.map((item)=>(
              
              <Link
                key={item.id}
                href={`/shop/${item.product.slug}`}
                className="group"
              >

                <div className="aspect-[4/5] overflow-hidden bg-white">

                  <img
                    src={
                      item.product.images[0]?.url ??
                      "/mockups/products/essential-tee-front.svg"
                    }
                    alt={item.product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                </div>


                <h2 className="mt-4 font-semibold">
                  {item.product.name}
                </h2>

                <p className="mt-2 text-sm text-black/60">
                  {formatCurrency(item.product.price.toString())}
                </p>


              </Link>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}
TS


echo "Wishlist page created"

