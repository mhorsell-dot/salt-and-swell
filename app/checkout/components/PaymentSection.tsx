import {
  CreditCard,
  LockKeyhole,
  Wallet,
  ShieldCheck,
} from "lucide-react";

export default function PaymentSection() {
  return (
    <section className="mt-6 rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.05)]">

      <div className="flex items-center gap-3">
        <div className="rounded-full bg-[#171715] p-3 text-white">
          <CreditCard className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Payment
          </h2>

          <p className="text-sm text-black/50">
            Secure payment powered by Stripe.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">

        {["Visa","Mastercard","Apple Pay","Google Pay"].map(card => (
          <div
            key={card}
            className="flex h-16 items-center justify-center rounded-xl border border-black/10 bg-[#faf9f6] text-sm font-semibold"
          >
            {card}
          </div>
        ))}

      </div>

      <div className="mt-8 rounded-xl bg-[#f8f8f8] p-5">

        <div className="flex items-center gap-3">
          <LockKeyhole className="h-5 w-5" />
          <span className="font-medium">
            PCI DSS Secure Checkout
          </span>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-green-600" />
          <span className="text-sm text-black/60">
            Your payment information is encrypted end-to-end.
          </span>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <Wallet className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-black/60">
            Apple Pay and Google Pay will be available in the next build.
          </span>
        </div>

      </div>

    </section>
  );
}
