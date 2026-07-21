import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] flex items-center justify-center px-5">
      <section className="max-w-xl rounded-[2rem] bg-white p-12 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-black/40">Salt & Swell</p>

        <h1 className="mt-6 text-4xl font-semibold">Thank you for your order.</h1>

        <p className="mt-4 text-black/60">
          Your payment has been received and your order is now being prepared.
        </p>

        <div className="mt-8">
          <Link
            href="/shop"
            className="inline-flex rounded-full bg-[#171715] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    </main>
  );
}
