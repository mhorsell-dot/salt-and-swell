import OrderWorkflow from "@/components/orders/OrderWorkflow";
import ShipmentPanel from "@/components/admin/orders/ShipmentPanel";

async function getOrder(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}/api/admin/orders/${id}`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function OrderPage({ params }: { params: { id: string } }) {
  const order = await getOrder(params.id);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold">Order #{order.orderNumber}</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="border rounded-xl p-6">
          <h2 className="font-semibold">Customer</h2>

          <p>
            {order.shippingFirstName} {order.shippingLastName}
          </p>

          <p>{order.emailSnapshot}</p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="font-semibold">Status</h2>

          <p>{order.status}</p>
        </div>
      </div>

      <div className="mt-8 border rounded-xl p-6">
        <h2 className="font-semibold">Items</h2>

        {order.items.map((item: { id: string; productName: string; quantity: number }) => (
          <p key={item.id}>
            {item.productName} x {item.quantity}
          </p>
        ))}
      </div>

      <div className="mt-8">
        <OrderWorkflow id={order.id} currentStatus={order.status} />
      </div>

      <div className="mt-8">
        <ShipmentPanel orderId={order.id} existingShipment={order.shipment} />
      </div>
    </div>
  );
}
