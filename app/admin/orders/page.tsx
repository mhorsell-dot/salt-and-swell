import Link from "next/link";
import prisma from "@/lib/prisma";
import { ArrowRight } from "lucide-react";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(value);
}

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      customer: true,
      payment: true,
      shipment: true,
      items: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-semibold">Orders</h1>

        <p className="mt-2 text-black/50">Manage customer purchases and fulfilment.</p>

        <div className="mt-10 space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="block rounded-3xl bg-white p-6 transition hover:shadow-lg"
            >
              <div className="flex justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-black/40">Order</p>

                  <h2 className="mt-2 text-xl font-semibold">{order.orderNumber}</h2>

                  <p className="mt-2 text-sm text-black/50">
                    {order.customer ? order.customer.email : order.emailSnapshot}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(Number(order.total))}</p>

                  <p className="mt-2 text-sm">Payment: {order.paymentStatus}</p>

                  <p className="text-sm">Status: {order.status}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-5">
                <p className="text-sm text-black/50">{order.items.length} item(s)</p>

                <ArrowRight className="h-5 w-5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
