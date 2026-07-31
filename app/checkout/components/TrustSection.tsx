import { ShieldCheck, Truck, RotateCcw, CreditCard, Star } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="mt-6 rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.05)]">
      <div className="grid gap-5 md:grid-cols-2">
        <TrustItem
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Secure Checkout"
          text="256-bit SSL encrypted payments."
        />

        <TrustItem
          icon={<Truck className="h-5 w-5" />}
          title="Fast Dispatch"
          text="Orders ship within 24 hours."
        />

        <TrustItem
          icon={<RotateCcw className="h-5 w-5" />}
          title="30 Day Returns"
          text="Easy returns on eligible items."
        />

        <TrustItem
          icon={<CreditCard className="h-5 w-5" />}
          title="Secure Payments"
          text="Visa • Mastercard • Apple Pay • Google Pay"
        />
      </div>

      <div className="mt-8 rounded-xl bg-[#f7f5ef] p-5">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-current text-yellow-500" />
          <Star className="h-5 w-5 fill-current text-yellow-500" />
          <Star className="h-5 w-5 fill-current text-yellow-500" />
          <Star className="h-5 w-5 fill-current text-yellow-500" />
          <Star className="h-5 w-5 fill-current text-yellow-500" />
        </div>

        <p className="mt-3 text-sm text-black/70">
          Rated 4.9/5 by thousands of Australian customers.
        </p>
      </div>
    </section>
  );
}

function TrustItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 rounded-full bg-[#f4f1ea] p-3">{icon}</div>

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-black/55">{text}</p>
      </div>
    </div>
  );
}
