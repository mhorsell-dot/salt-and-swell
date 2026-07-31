#!/usr/bin/env bash
set -e

echo "========================================"
echo "BUILD 041A"
echo "Customer Account Dashboard"
echo "========================================"

cat > app/account/page.tsx <<'TS'
import Link from "next/link";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

const DEMO_CUSTOMER_ID = "demo-customer";

function formatCurrency(value: unknown) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Number(value));
}

export default async function AccountPage() {

  const customer = await prisma.customer.findUnique({
    where: {
      id: DEMO_CUSTOMER_ID,
    },
    include: {
      orders: {
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      },
      wishlistItems: {
        include: {
          product: {
            include: {
              images: {
                take: 1,
              },
            },
          },
        },
        take: 3,
      },
    },
  });


  if (!customer) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-32">
        Customer account unavailable.
      </main>
    );
  }


  return (
    <main className="mx-auto max-w-5xl px-6 py-32">

      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
          My Account
        </p>

        <h1 className="mt-4 text-5xl font-black tracking-tight">
          Welcome back,
          <br />
          {customer.firstName}
        </h1>
      </section>


      <div className="mt-16 grid gap-8 md:grid-cols-2">


        <section className="rounded-3xl border border-black/10 p-8">

          <h2 className="text-xl font-bold">
            Orders
          </h2>

          <div className="mt-6 space-y-4">

          {customer.orders.length === 0 ? (
            <p className="text-sm text-black/50">
              No orders yet.
            </p>
          ) : (
            customer.orders.map(order => (
              <div
                key={order.id}
                className="rounded-2xl bg-black/5 p-5"
              >
                <p className="font-semibold">
                  #{order.orderNumber}
                </p>

                <p className="mt-2 text-sm text-black/60">
                  {formatCurrency(order.total)}
                </p>

                <p className="mt-2 text-xs uppercase tracking-wider">
                  {order.status}
                </p>
              </div>
            ))
          )}

          </div>


          <Link
            href="/account/orders"
            className="mt-6 inline-block text-sm font-bold underline"
          >
            View orders →
          </Link>

        </section>



        <section className="rounded-3xl border border-black/10 p-8">

          <h2 className="text-xl font-bold">
            Wishlist
          </h2>


          <p className="mt-6 text-4xl font-black">
            {customer.wishlistItems.length}
          </p>

          <p className="text-sm text-black/50">
            saved products
          </p>


          <Link
            href="/account/wishlist"
            className="mt-6 inline-block text-sm font-bold underline"
          >
            View wishlist →
          </Link>

        </section>



      </div>


      <section className="mt-8 rounded-3xl border border-black/10 p-8">

        <h2 className="text-xl font-bold">
          Account Details
        </h2>

        <div className="mt-6 space-y-2 text-sm">

          <p>
            {customer.firstName} {customer.lastName}
          </p>

          <p className="text-black/50">
            {customer.email}
          </p>

        </div>


        <div className="mt-6 flex gap-6 text-sm font-bold">

          <Link href="/account/profile">
            Edit profile
          </Link>

          <Link href="/account/addresses">
            Addresses
          </Link>

        </div>

      </section>


    </main>
  );
}
TS


echo "Account dashboard created"

