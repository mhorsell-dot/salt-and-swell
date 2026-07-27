import Link from "next/link";
import { Check, Package, Truck, Waves } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] px-5 py-16">
      <section className="mx-auto max-w-2xl rounded-[2.5rem] bg-white p-8 text-center shadow-sm sm:p-14">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#182321] text-white">
          <Check className="h-9 w-9" />
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-black/40">
          Salt & Swell
        </p>

        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">Your journey begins.</h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-black/55">
          Thanks for supporting Salt & Swell. Your coastal essentials have been received and our
          team is preparing your order with care.
        </p>

        <div className="mt-10 rounded-3xl bg-[#f7f5ef] p-6 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
            Order journey
          </p>

          <div className="mt-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#182321] text-white">
                <Check className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold">Order received</p>
                <p className="text-xs text-black/45">Your order has been confirmed</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15">
                <Package className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold">Preparing your gear</p>
                <p className="text-xs text-black/45">Carefully packed by our team</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15">
                <Truck className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold">On the way</p>
                <p className="text-xs text-black/45">Tracking details will be sent shortly</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15">
                <Waves className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold">Enjoy the coast</p>
                <p className="text-xs text-black/45">Welcome to the Salt & Swell community</p>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/shop"
          className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-[#171715] px-10 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-black/80"
        >
          Continue Shopping
        </Link>
      </section>
    </main>
  );
}
