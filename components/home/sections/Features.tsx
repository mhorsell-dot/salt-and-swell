import { Waves, ShieldCheck, Sun, Truck } from "lucide-react";

const features = [
  {
    icon: Waves,
    title: "Inspired by the Coast",
    body: "Designed for life beside the ocean.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    body: "Heavyweight fabrics built to last.",
  },
  {
    icon: Sun,
    title: "Designed in Australia",
    body: "Made for salty souls everywhere.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    body: "Australia-wide over $150.",
  },
];

export default function Features() {
  return (
    <section className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-[1500px] px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="flex gap-5">
                <Icon className="mt-1 h-7 w-7 text-black" strokeWidth={1.5} />

                <div>
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.28em]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-neutral-600">{feature.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
