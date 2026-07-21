import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import OrderTimeline from "@/components/orders/OrderTimeline";
import DeliveryCard from "@/components/orders/DeliveryCard";
import OrderProgress from "@/components/orders/OrderProgress";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(value);
}

export default async function OrderDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const order = await prisma.order.findUnique({
    where: {
      id: params.id,
    },

    include: {
      items: true,
      payment: true,
      shipment: true,
      events: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-5 py-16 text-[#171715]">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
          Salt & Swell
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Order {order.orderNumber}</h1>

        <p className="mt-2 text-black/50">Placed {order.createdAt.toLocaleDateString("en-AU")}</p>

        <div className="mt-8">
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="mt-8">
          <OrderProgress status={order.status} />
        </div>

        <section className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">Order summary</h2>

          <div className="mt-6 space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between border-b border-black/10 pb-4">
                <div>
                  <p className="font-medium">{item.productName}</p>

                  <p className="text-sm text-black/50">
                    {item.colour} {item.size}
                  </p>
                </div>

                <p className="font-semibold">{formatCurrency(Number(item.price))}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between text-lg font-semibold">
            <span>Total</span>

            <span>{formatCurrency(Number(order.total))}</span>
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-8">
          <h2 className="text-xl font-semibold">Your Order Journey</h2>

          <div className="mt-8">
            <OrderTimeline
              events={order.events.map((event) => ({
                ...event,
                createdAt: event.createdAt.toISOString(),
              }))}
            />
          </div>

          {order.shipment && (
            <div className="mt-10 border-t border-black/10 pt-8">
              <DeliveryCard shipment={order.shipment} />

              <div className="rounded-3xl bg-[#f4f1ea] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
                  Shipment
                </p>

                <h3 className="mt-3 text-2xl font-semibold">Your order is on the way</h3>

                <div className="mt-6 space-y-3 text-sm">
                  <p>
                    <span className="font-semibold">Carrier:</span>{" "}
                    {order.shipment.carrier || "Preparing"}
                  </p>

                  {order.shipment.trackingNumber && (
                    <p>
                      <span className="font-semibold">Tracking:</span>{" "}
                      {order.shipment.trackingNumber}
                    </p>
                  )}

                  {order.shipment.dispatchedAt && (
                    <p className="text-black/50">
                      Dispatched {order.shipment.dispatchedAt.toLocaleDateString("en-AU")}
                    </p>
                  )}
                </div>

                {order.shipment.trackingUrl && (
                  <a
                    href={order.shipment.trackingUrl}
                    target="_blank"
                    className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
                  >
                    Track Package
                  </a>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
