"use client";

import { useState } from "react";

export default function ShipmentPanel({
  orderId,
  existingShipment,
}: {
  orderId: string;
  existingShipment?: {
    carrier?: string | null;
    trackingNumber?: string | null;
    trackingUrl?: string | null;
  };
}) {
  const [carrier, setCarrier] = useState(existingShipment?.carrier || "");

  const [trackingNumber, setTrackingNumber] = useState(existingShipment?.trackingNumber || "");

  const [trackingUrl, setTrackingUrl] = useState(existingShipment?.trackingUrl || "");

  const [loading, setLoading] = useState(false);

  async function createShipment() {
    setLoading(true);

    await fetch(`/api/admin/orders/${orderId}/shipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carrier,
        trackingNumber,
        trackingUrl,
      }),
    });

    setLoading(false);

    window.location.reload();
  }

  return (
    <div className="rounded-3xl bg-white p-8">
      <h2 className="text-xl font-semibold">Shipment</h2>

      <div className="mt-6 space-y-4">
        <input
          className="w-full rounded-xl border p-3"
          placeholder="Carrier"
          value={carrier}
          onChange={(e) => setCarrier(e.target.value)}
        />

        <input
          className="w-full rounded-xl border p-3"
          placeholder="Tracking number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />

        <input
          className="w-full rounded-xl border p-3"
          placeholder="Tracking URL"
          value={trackingUrl}
          onChange={(e) => setTrackingUrl(e.target.value)}
        />

        <button
          onClick={createShipment}
          disabled={loading}
          className="rounded-full bg-black px-6 py-3 text-white"
        >
          {loading ? "Creating..." : "Create Shipment"}
        </button>
      </div>
    </div>
  );
}
