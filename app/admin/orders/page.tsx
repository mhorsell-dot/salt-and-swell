import Link from "next/link";

async function getOrders() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}/api/admin/orders`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="p-10">
      <h1 className="text-4xl font-semibold">Orders</h1>

      <div className="mt-10 space-y-4">
        {orders.map(
          (order: {
            id: string;
            orderNumber: string;
            total: string | number;
            status: string;
            shippingFirstName: string;
            shippingLastName: string;
          }) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="block rounded-2xl border p-6 hover:bg-black/5"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">#{order.orderNumber}</p>

                  <p>
                    {order.shippingFirstName} {order.shippingLastName}
                  </p>
                </div>

                <div className="text-right">
                  <p>${Number(order.total).toFixed(2)}</p>

                  <p className="uppercase text-sm">{order.status}</p>
                </div>
              </div>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
