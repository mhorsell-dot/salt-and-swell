#!/usr/bin/env bash
set -e

echo "========================================"
echo "BUILD 041B"
echo "Customer Order History"
echo "========================================"

cat > app/account/orders/page.tsx <<'TS'
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


const timeline = [
  "Order placed",
  "Payment confirmed",
  "Packed",
  "Shipped",
  "Delivered",
];


export default async function OrdersPage() {

  const orders = await prisma.order.findMany({
    where: {
      customerId: DEMO_CUSTOMER_ID,
    },
    include: {
      shipment: true,
      payment: true,
      events: {
        orderBy: {
          createdAt: "asc",
        },
      },
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });


  return (
    <main className="mx-auto max-w-5xl px-6 py-32">

      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
        My Account
      </p>

      <h1 className="mt-4 text-5xl font-black tracking-tight">
        My Orders
      </h1>


      <div className="mt-12 space-y-8">


        {orders.length === 0 && (
          <div className="rounded-3xl border border-black/10 p-8">
            <p className="text-black/60">
              You have no orders yet.
            </p>

            <Link
              href="/shop"
              className="mt-5 inline-block font-bold underline"
            >
              Start shopping →
            </Link>
          </div>
        )}



        {orders.map((order) => (

          <article
            key={order.id}
            className="rounded-3xl border border-black/10 p-8"
          >

            <div className="flex flex-col justify-between gap-4 sm:flex-row">

              <div>

                <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                  Order
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  #{order.orderNumber}
                </h2>

              </div>


              <div className="text-left sm:text-right">

                <p className="text-xl font-bold">
                  {formatCurrency(order.total)}
                </p>

                <p className="mt-1 text-xs uppercase tracking-wider text-black/50">
                  {order.status}
                </p>

              </div>

            </div>



            <div className="mt-8">

              <h3 className="font-bold">
                Order Progress
              </h3>


              <div className="mt-5 space-y-3">

              {timeline.map((step, index) => (

                <div
                  key={step}
                  className="flex items-center gap-3"
                >

                  <span
                    className={
                      index <= order.events.length
                        ? "flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs text-white"
                        : "flex h-6 w-6 items-center justify-center rounded-full bg-black/10 text-xs"
                    }
                  >
                    {index <= order.events.length ? "✓" : ""}
                  </span>


                  <span className="text-sm">
                    {step}
                  </span>

                </div>

              ))}

              </div>

            </div>



            {order.shipment?.trackingUrl && (

              <Link
                href={order.shipment.trackingUrl}
                className="mt-8 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold text-white"
              >
                Track shipment →
              </Link>

            )}


          </article>

        ))}

      </div>

    </main>
  );
}
TS


echo "Order history created"

