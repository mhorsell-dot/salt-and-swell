import {
  ShieldCheck,
  Truck,
} from "lucide-react";

type Props = {
  subtotal: number;
};

export default function PremiumSummaryHeader({
  subtotal,
}: Props) {

  return (

    <div className="mb-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.28em] text-black/40">
            Your Order
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Ready to ship
          </h2>

        </div>

        <div className="rounded-full bg-[#f4f1ea] px-4 py-2 text-sm font-medium">
          ${subtotal.toFixed(2)}
        </div>

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

        <div className="flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 text-sm">
          <Truck className="h-4 w-4" />
          Dispatch within 24 hours
        </div>

        <div className="flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 text-sm">
          <ShieldCheck className="h-4 w-4" />
          Secure checkout
        </div>

      </div>

    </div>

  );

}
