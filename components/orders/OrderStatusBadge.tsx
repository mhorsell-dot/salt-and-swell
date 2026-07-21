const statusMap = {
  PENDING: {
    label: "Order Received",
    description: "We have received your order and are getting everything ready.",
  },

  PAID: {
    label: "Payment Confirmed",
    description: "Your order has been confirmed and preparation has started.",
  },

  PACKED: {
    label: "Being Prepared",
    description: "Your Salt & Swell pieces are being carefully prepared.",
  },

  SHIPPED: {
    label: "On The Way",
    description: "Your order has left our studio and is on its way.",
  },

  DELIVERED: {
    label: "Delivered",
    description: "Your order has arrived. Enjoy your Salt & Swell pieces.",
  },

  CANCELLED: {
    label: "Cancelled",
    description: "This order has been cancelled.",
  },
};

export default function OrderStatusBadge({ status }: { status: string }) {
  const current = statusMap[status as keyof typeof statusMap] ?? statusMap.PENDING;

  return (
    <div className="rounded-3xl bg-black p-8 text-white">
      <p className="text-xs uppercase tracking-[0.25em] text-white/50">Order Status</p>

      <h2 className="mt-4 text-3xl font-semibold tracking-tight">{current.label}</h2>

      <p className="mt-3 max-w-xl text-white/70">{current.description}</p>
    </div>
  );
}
