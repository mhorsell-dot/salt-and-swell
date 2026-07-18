import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";

export default function CheckoutPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f3ee] px-6 text-[#171715]">
      <div className="w-full max-w-xl rounded-3xl border border-black/10 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
          <LockKeyhole className="h-6 w-6" />
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-black/45">
          Secure checkout
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
          Checkout is the next build.
        </h1>

        <p className="mt-5 text-sm leading-7 text-black/55">
          Your shopping bag is now working and persistent. The next milestone
          will add customer details, delivery, order creation and payment
          processing.
        </p>

        <Link
          href="/shop"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 bg-black px-7 text-xs font-semibold uppercase tracking-[0.15em] text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to shop
        </Link>
      </div>
    </main>
  );
}
