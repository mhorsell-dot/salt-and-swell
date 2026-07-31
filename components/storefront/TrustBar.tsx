import { CheckCircle, Truck, ShieldCheck, Star } from "lucide-react";

export default function TrustBar() {
  return (
    <div className="mt-8 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 fill-current text-amber-500" />
        <p className="font-semibold">
          4.9 <span className="font-normal text-black/60">(347 verified reviews)</span>
        </p>
      </div>

      <div className="mt-5 space-y-4 text-sm">
        <div className="flex items-center gap-3">
          <Truck className="h-5 w-5" />
          <span>Free shipping over $150</span>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5" />
          <span>30 day easy returns</span>
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5" />
          <span>Australian designed premium apparel</span>
        </div>
      </div>
    </div>
  );
}
