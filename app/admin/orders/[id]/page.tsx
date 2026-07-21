import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import OrderFulfilmentControls from "@/components/admin/orders/OrderFulfilmentControls";

export default async function AdminOrderDetail({
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
      customer: true,
      items: true,
      payment: true,
      shipment: true,
      events: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-semibold">{order.orderNumber}</h1>

        <div className="mt-8 rounded-3xl bg-white p-8">
          <h2 className="text-xl font-semibold">Customer</h2>

          <p className="mt-3">
            {order.customer
              ? `${order.customer.firstName} ${order.customer.lastName}`
              : order.shippingFirstName + " " + order.shippingLastName}
          </p>

          <p className="text-black/50">
            {order.customer ? order.customer.email : order.emailSnapshot}
          </p>

          <hr className="my-6" />

          <h2 className="text-xl font-semibold">Status</h2>

          <p className="mt-3">{order.status}</p>

          <p>Payment: {order.paymentStatus}</p>

          <hr className="my-6" />

          <h2 className="text-xl font-semibold">Items</h2>

          <div className="mt-4 space-y-3">
            {order.items.map((item) => (
              <div key={item.id}>
                {item.productName}× {item.quantity}
              </div>
            ))}
          </div>
        </div>

        <OrderFulfilmentControls orderId={order.id} currentStatus={order.status} />
      </div>
    </main>
  );
}
