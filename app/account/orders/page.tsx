import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ArrowRight, Package } from "lucide-react";

export const dynamic = "force-dynamic";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(value);
}

async function getOrders() {
  const token = (await cookies()).get("salt_swell_token")?.value;

  if (!token) {
    redirect("/account/login");
  }

  const decoded = jwt.verify(token!, process.env.JWT_SECRET || "development-secret") as {
    sub: string;
  };

  return prisma.order.findMany({
    where: {
      customerId: decoded.sub,
    },

    include: {
      items: true,
      shipment: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-5 py-16 text-[#171715]">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
          Salt & Swell
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Your Orders</h1>

        <div className="mt-10 space-y-5">
          {orders.length === 0 ? (
            <div className="rounded-3xl bg-white p-8">No orders yet.</div>
          ) : (
            orders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="block rounded-3xl bg-white p-8 transition hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-black/40">Order</p>

                    <h2 className="mt-2 text-xl font-semibold">{order.orderNumber}</h2>

                    <p className="mt-2 text-sm text-black/50">
                      {order.createdAt.toLocaleDateString("en-AU")}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold">{order.status}</p>

                    <p className="mt-2 font-semibold">{formatCurrency(Number(order.total))}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-2 border-t border-black/10 pt-5">
                  {order.items.slice(0, 3).map((item) => (
                    <p key={item.id} className="text-sm text-black/60">
                      {item.productName}× {item.quantity}
                    </p>
                  ))}

                  {order.items.length > 3 && (
                    <p className="text-xs text-black/40">+ {order.items.length - 3} more items</p>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-black/50">
                    <Package className="h-4 w-4" />

                    {order.shipment?.status || "Processing"}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em]">
                    View order
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
