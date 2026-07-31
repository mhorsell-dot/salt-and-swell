import { Apple, CreditCard, Wallet } from "lucide-react";

const buttons = [
  {
    name: "Apple Pay",
    icon: Apple,
    bg: "bg-black",
    text: "text-white",
  },
  {
    name: "Google Pay",
    icon: Wallet,
    bg: "bg-white",
    text: "text-black",
  },
  {
    name: "PayPal",
    icon: CreditCard,
    bg: "bg-[#0070ba]",
    text: "text-white",
  },
  {
    name: "Shop Pay",
    icon: CreditCard,
    bg: "bg-[#5A31F4]",
    text: "text-white",
  },
];

export default function ExpressCheckout() {
  return (
    <section className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.3em] text-black/45">Express Checkout</p>

      <div className="mt-5 grid gap-4">
        {buttons.map((button) => {
          const Icon = button.icon;

          return (
            <button
              key={button.name}
              type="button"
              className={`${button.bg} ${button.text} flex h-14 items-center justify-center gap-3 rounded-2xl font-semibold transition hover:scale-[1.01]`}
            >
              <Icon className="h-5 w-5" />
              {button.name}
            </button>
          );
        })}
      </div>

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-black/10" />

        <span className="text-xs uppercase tracking-[0.25em] text-black/40">OR</span>

        <div className="h-px flex-1 bg-black/10" />
      </div>
    </section>
  );
}
