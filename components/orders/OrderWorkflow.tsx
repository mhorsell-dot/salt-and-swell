"use client";

import { useState } from "react";
import { Check, Package, Truck, Waves } from "lucide-react";

const workflow = [
  {
    status: "PAID",
    label: "Payment Confirmed",
    description: "Confirm payment and begin preparing the order.",
    icon: Check,
  },
  {
    status: "PACKED",
    label: "Preparing Your Gear",
    description: "Mark the order as packed and ready for shipment.",
    icon: Package,
  },
  {
    status: "SHIPPED",
    label: "On The Way",
    description: "Confirm the order has left the studio.",
    icon: Truck,
  },
  {
    status: "DELIVERED",
    label: "Delivered",
    description: "Complete the customer journey.",
    icon: Waves,
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

    try {

      console.log("🌊 Updating order status", {
        orderId: id,
        status,
      });

      const response = await fetch(`/api/admin/orders/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });


      const data = await response.json();


      console.log("🌊 Status response", {
        status: response.status,
        data,
      });


      if (!response.ok) {
        throw new Error(data.error || "Status update failed");
      }


      window.location.reload();


    } catch (error) {

      console.error("❌ Order update failed", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to update order"
      );

      setLoading(false);

    }

  }


  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-sm">

      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
        Salt & Swell Fulfilment
      </p>


      <h2 className="mt-4 text-3xl font-semibold tracking-tight">
        {currentStatus}
      </h2>


      <div className="mt-8 space-y-4">

        {workflow.map((step) => {

          const Icon = step.icon;

          const completed =
            workflow.findIndex(
              item => item.status === currentStatus
            ) >=
            workflow.findIndex(
              item => item.status === step.status
            );


          return (

            <div
              key={step.status}
              className="flex items-center justify-between rounded-2xl border border-black/10 p-5"
            >

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${
                    completed
                      ? "bg-[#182321] text-white"
                      : "bg-black/5 text-black/40"
                  }`}
                >
                  <Icon className="h-5 w-5"/>
                </div>


                <div>

                  <p className="font-semibold">
                    {step.label}
                  </p>

                  <p className="text-sm text-black/50">
                    {step.description}
                  </p>

                </div>

              </div>


              <button
                disabled={loading || completed}
                onClick={() => updateStatus(step.status)}
                className={`rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-wider ${
                  completed
                    ? "bg-black/10 text-black/40"
                    : "bg-black text-white"
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
