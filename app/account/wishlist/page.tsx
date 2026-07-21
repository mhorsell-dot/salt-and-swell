import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import WishlistActions from "@/components/wishlist/WishlistActions";

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
            orderBy: {
              sortOrder: "asc",
            },
            take: 1,
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.3em] text-black/50">Saved pieces</p>

        <h1 className="mt-4 text-5xl font-bold">Your Wishlist</h1>

        {items.length === 0 ? (
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>

            <p className="mt-4 text-black/60">Save your favourite Salt & Swell pieces here.</p>

            <Link
              href="/shop"
              className="mt-8 inline-block rounded-full bg-black px-8 py-4 text-white"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-3xl bg-white p-5">
                <Link href={`/shop/${item.product.slug}`}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <Image
                      src={
                        item.product.images[0]?.url || "/mockups/products/essential-tee-front.svg"
                      }

                      alt={item.product.name}

                      fill

                      className="object-cover"
                    />
                  </div>

                  <h2 className="mt-5 font-semibold">{item.product.name}</h2>

                  <p className="mt-2 text-sm text-black/60">
                    {formatCurrency(item.product.price.toString())}
                  </p>
                </Link>

                <WishlistActions
                  product={{
                    id: item.product.id,

                    slug: item.product.slug,

                    name: item.product.name,

                    price: Number(item.product.price),

                    imageUrl: item.product.images[0]?.url || "",
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
