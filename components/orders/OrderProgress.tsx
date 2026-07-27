"use client";

type OrderStatus = "PENDING" | "PAID" | "PACKED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

const stages = ["PENDING", "PAID", "PACKED", "SHIPPED", "DELIVERED"];

const labels = {
  PENDING: "Order Received",
  PAID: "Payment Confirmed",
  PACKED: "Preparing Your Gear",
  SHIPPED: "On The Way",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const descriptions = {
  PENDING: "Your order has been received and is waiting to be prepared.",
  PAID: "Your payment has been confirmed and your order is moving forward.",
  PACKED: "Our team is carefully preparing your Salt & Swell pieces.",
  SHIPPED: "Your order is on the way. Tracking details will follow shortly.",
  DELIVERED: "Your order has arrived. Enjoy the coast.",
  CANCELLED: "This order has been cancelled.",
};

export default function OrderProgress({ status }: { status: OrderStatus }) {
  if (status === "CANCELLED") {
    return (
      <div className="rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold">Order Cancelled</h2>

        <p className="mt-2 text-sm text-black/50">This order has been cancelled.</p>
      </div>
    );
  }

  const currentIndex = stages.indexOf(status);

  const progress = Math.round(((currentIndex + 1) / stages.length) * 100);

  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
        Salt & Swell Journey
      </p>

      <div className="mt-5 flex items-end justify-between gap-5">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.04em]">{labels[status]}</h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-black/50">{descriptions[status]}</p>
        </div>

        <div className="text-right">
          <p className="text-4xl font-semibold">{progress}%</p>

          <p className="text-xs uppercase tracking-[0.2em] text-black/40">Complete</p>
        </div>
      </div>

      <div className="mt-8 h-2 overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full rounded-full bg-[#182321] transition-all duration-700"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <p className="mt-4 text-xs text-black/40">
        Stage {currentIndex + 1} of {stages.length}
      </p>
    </section>
  );
}
