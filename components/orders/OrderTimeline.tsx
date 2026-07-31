"use client";

import { Check, Package, Truck, Waves } from "lucide-react";

type Event = {
  id: string;
  event: string;
  message: string | null;
  createdAt: string | Date;
};

const journey = [
  {
    key: "ORDER_CREATED",
    title: "Order Confirmed",
    description: "Your Salt & Swell order has been received.",
    icon: Check,
  },
  {
    key: "PAYMENT_RECEIVED",
    title: "Payment Complete",
    description: "Your payment has been securely processed.",
    icon: Check,
  },
  {
    key: "ORDER_PACKED",
    title: "Preparing Your Gear",
    description: "Your pieces are being carefully prepared.",
    icon: Package,
  },
  {
    key: "ORDER_SHIPPED",
    title: "On The Way",
    description: "Your order has left our studio.",
    icon: Truck,
  },
  {
    key: "ORDER_DELIVERED",
    title: "Delivered",
    description: "Enjoy your Salt & Swell pieces.",
    icon: Waves,
  },
];

export default function OrderTimeline({ events }: { events: Event[] }) {
  return (
    <div className="space-y-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
        Your Salt & Swell Journey
      </p>

      {journey.map((step, index) => {
        const completed = events.some((event) => event.event === step.key);

        const current = events.length > 0 && events[events.length - 1]?.event === step.key;

        const Icon = step.icon;

        return (
          <div key={step.key} className="flex gap-5">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                  completed
                    ? "bg-[#182321] text-white"
                    : current
                      ? "border border-black bg-white"
                      : "border border-black/15 text-black/30"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              {index < journey.length - 1 && (
                <div className={`mt-3 h-14 w-px ${completed ? "bg-[#182321]" : "bg-black/10"}`} />
              )}
            </div>

            <div className="pt-1">
              <h3
                className={`text-base font-semibold ${completed ? "text-black" : "text-black/45"}`}
              >
                {step.title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-black/50">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
