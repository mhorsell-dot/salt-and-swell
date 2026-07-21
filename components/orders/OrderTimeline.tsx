type Event = {
  id: string;
  event: string;
  message: string | null;
  createdAt: string | Date;
};

const steps = [
  "ORDER_CREATED",
  "PAYMENT_RECEIVED",
  "ORDER_PACKED",
  "ORDER_SHIPPED",
  "ORDER_DELIVERED",
];

export default function OrderTimeline({ events }: { events: Event[] }) {
  return (
    <div className="space-y-6">
      {steps.map((step) => {
        const event = events.find((item) => item.event === step);

        return (
          <div key={step} className="flex gap-4">
            <div
              className={`h-4 w-4 rounded-full mt-1 ${event ? "bg-black" : "bg-black/20"}`}
            ></div>

            <div>
              <p className="font-medium">{step.replaceAll("_", " ")}</p>

              {event && <p className="text-sm text-black/50">{event.message}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
