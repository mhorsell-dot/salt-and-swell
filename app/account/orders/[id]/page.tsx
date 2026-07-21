import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import OrderTimeline from "@/components/orders/OrderTimeline";

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
              <h3 className="text-lg font-semibold">Shipment</h3>

              <p className="mt-3 text-black/50">{order.shipment.carrier || "Carrier"}</p>

              {order.shipment.trackingNumber && (
                <a
                  href={order.shipment.trackingUrl || "#"}
                  target="_blank"
                  className="mt-3 inline-block font-semibold underline"
                >
                  Track shipment: {order.shipment.trackingNumber}
                </a>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
