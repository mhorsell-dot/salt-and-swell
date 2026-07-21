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
  },
  {
    key: "PAYMENT_RECEIVED",
    title: "Payment Complete",
    description: "Your payment has been securely processed.",
  },
  {
    key: "ORDER_PACKED",
    title: "Being Prepared",
    description: "Your pieces are being carefully prepared.",
  },
  {
    key: "ORDER_SHIPPED",
    title: "On The Way",
    description: "Your order has left our studio.",
  },
  {
    key: "ORDER_DELIVERED",
    title: "Delivered",
    description: "Enjoy your Salt & Swell pieces.",
  },
];

export default function OrderTimeline({ events }: { events: Event[] }) {
  return (
    <div className="space-y-8">
      {journey.map((step, index) => {
        const completed = events.some((event) => event.event === step.key);

        const current = events.length > 0 && events[events.length - 1]?.event === step.key;

        return (
          <div key={step.key} className="flex gap-5">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                  completed ? "bg-black text-white" : "border border-black/20 text-black/30"
                }`}
              >
                {completed ? "✓" : index + 1}
              </div>

              {index < journey.length - 1 && (
                <div className={`mt-2 h-12 w-px ${completed ? "bg-black" : "bg-black/10"}`} />
              )}
            </div>

            <div>
              <h3 className={`font-semibold ${current ? "text-black" : "text-black/70"}`}>
                {step.title}
              </h3>

              <p className="mt-1 text-sm text-black/50">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
