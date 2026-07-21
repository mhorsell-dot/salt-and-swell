type OrderStatus = "PENDING" | "PAID" | "PACKED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

const stages = ["PENDING", "PAID", "PACKED", "SHIPPED", "DELIVERED"];

const labels = {
  PENDING: "Order Received",
  PAID: "Payment Confirmed",
  PACKED: "Being Prepared",
  SHIPPED: "On The Way",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default function OrderProgress({ status }: { status: OrderStatus }) {
  if (status === "CANCELLED") {
    return (
      <div className="rounded-3xl bg-white p-6">
        <h2 className="text-xl font-semibold">Order Cancelled</h2>

        <p className="mt-2 text-sm text-black/50">This order has been cancelled.</p>
      </div>
    );
  }

  const currentIndex = stages.indexOf(status);

  const progress = Math.round(((currentIndex + 1) / stages.length) * 100);

  return (
    <div className="rounded-3xl bg-white p-8">
      <div className="flex justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-black/40">Order Journey</p>

          <h2 className="mt-2 text-2xl font-semibold">{labels[status]}</h2>
        </div>

        <div className="text-right">
          <p className="text-3xl font-semibold">{progress}%</p>

          <p className="text-xs uppercase tracking-wider text-black/40">Complete</p>
        </div>
      </div>

      <div className="mt-8 h-2 overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full bg-black transition-all"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}
