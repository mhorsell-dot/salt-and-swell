"use client";

import { useState } from "react";

const workflow = [
  {
    status: "PACKED",
    label: "Prepare Order",
    description: "Mark order as packed and ready for shipment.",
  },
  {
    status: "SHIPPED",
    label: "Mark Shipped",
    description: "Confirm order has left the studio.",
  },
  {
    status: "DELIVERED",
    label: "Mark Delivered",
    description: "Complete the customer journey.",
  },
];

export default function OrderWorkflow({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const [loading, setLoading] = useState(false);

  async function updateStatus(status: string) {
    setLoading(true);

    await fetch(`/api/admin/orders/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    });

    window.location.reload();
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <p className="text-xs uppercase tracking-[0.25em] text-black/40">Order Workflow</p>

      <h2 className="mt-3 text-2xl font-semibold">Current Status: {currentStatus}</h2>

      <div className="mt-8 space-y-4">
        {workflow.map((step) => {
          const completed =
            currentStatus === "DELIVERED" ||
            (currentStatus === "SHIPPED" && step.status === "PACKED") ||
            (currentStatus === "PACKED" && step.status === "PACKED");

          return (
            <div
              key={step.status}
              className="flex items-center justify-between rounded-2xl border border-black/10 p-5"
            >
              <div>
                <p className="font-semibold">{step.label}</p>

                <p className="text-sm text-black/50">{step.description}</p>
              </div>

              <button
                disabled={loading || completed}
                onClick={() => updateStatus(step.status)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  completed ? "bg-black/10 text-black/40" : "bg-black text-white hover:bg-black/80"
                }`}
              >
                {completed ? "Complete" : "Update"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
