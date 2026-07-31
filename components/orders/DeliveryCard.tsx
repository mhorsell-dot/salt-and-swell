function getDeliveryEstimate() {
  const start = new Date();
  const end = new Date();

  start.setDate(start.getDate() + 3);
  end.setDate(end.getDate() + 6);

  return `${start.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
  })} - ${end.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
  })}`;
}

export default function DeliveryCard({
  shipment,
}: {
  shipment: {
    carrier: string | null;
    trackingNumber: string | null;
    trackingUrl: string | null;
    status: string;
  };
}) {
  return (
    <section className="rounded-3xl bg-white p-8">
      <p className="text-xs uppercase tracking-[0.25em] text-black/40">Delivery</p>

      <h2 className="mt-3 text-2xl font-semibold">
        {shipment.status === "SHIPPED" ? "Your order is on the way" : "Preparing your delivery"}
      </h2>

      <div className="mt-6">
        <p className="text-sm text-black/50">Estimated arrival</p>

        <p className="mt-1 font-semibold">{getDeliveryEstimate()}</p>
      </div>

      {shipment.carrier && (
        <div className="mt-6">
          <p className="text-sm text-black/50">Carrier</p>

          <p className="font-semibold">{shipment.carrier}</p>
        </div>
      )}

      {shipment.trackingNumber && (
        <div className="mt-6">
          <p className="text-sm text-black/50">Tracking</p>

          <p className="font-semibold">{shipment.trackingNumber}</p>

          {shipment.trackingUrl && (
            <a
              href={shipment.trackingUrl}
              target="_blank"
              className="mt-4 inline-block rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
            >
              Track Package
            </a>
          )}
        </div>
      )}
    </section>
  );
}
