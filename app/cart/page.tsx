"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";

const FREE_SHIPPING_THRESHOLD = 150;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(value);
}

export default function CartPage() {
  const { items, itemCount, subtotal, isHydrated, updateQuantity, removeItem, clearCart } =
    useCart();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  if (!isHydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f3ee]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/15 border-t-black" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#171715]">
      <header className="border-b border-white/15 bg-[#182321] text-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="text-2xl font-semibold tracking-[-0.04em]">
            Salt &amp; Swell
          </Link>

          <Link
            href="/shop"
            className="text-sm font-semibold text-white/65 transition hover:text-white"
          >
            Continue shopping
          </Link>
        </div>
      </header>

      <section className="border-b border-black/10 px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/45"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue shopping
          </Link>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/40">
                Your selection
              </p>

              <h1 className="mt-3 text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
                Shopping bag
              </h1>
            </div>

            {itemCount > 0 && (
              <p className="text-sm text-black/50">
                {itemCount} item{itemCount === 1 ? "" : "s"}
              </p>
            )}
          </div>
        </div>
      </section>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <section className="px-6 py-12 lg:px-10 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_390px]">
            <div>
              <div className="border-b border-black/10 pb-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Complimentary delivery progress</p>

                  <p className="text-xs font-semibold text-black/45">
                    {remaining <= 0 ? "Unlocked" : `${formatCurrency(remaining)} remaining`}
                  </p>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/10">
                  <div
                    className="h-full rounded-full bg-[#182321] transition-all duration-500"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              <div className="divide-y divide-black/10">
                {items.map((item) => {
                  const variantDetails = [item.colour, item.size].filter(Boolean).join(" / ");

                  return (
                    <article key={item.cartId} className="grid gap-5 py-7 sm:grid-cols-[150px_1fr]">
                      <Link
                        href={`/shop/${item.slug}`}
                        className="aspect-[4/5] overflow-hidden bg-[#dfdbd2]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-500 hover:scale-[1.025]"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-6">
                            <div>
                              <Link
                                href={`/shop/${item.slug}`}
                                className="text-lg font-semibold uppercase tracking-[0.03em]"
                              >
                                {item.name}
                              </Link>

                              {variantDetails && (
                                <p className="mt-2 text-sm text-black/45">{variantDetails}</p>
                              )}

                              {item.sku && (
                                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-black/30">
                                  SKU {item.sku}
                                </p>
                              )}
                            </div>

                            <p className="shrink-0 text-lg font-semibold">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex h-11 items-center rounded-full border border-black/15 bg-white/45">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                              className="flex h-11 w-11 items-center justify-center disabled:opacity-25"
                            >
                              <Minus className="h-4 w-4" />
                            </button>

                            <span className="w-10 text-center text-sm font-semibold">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              disabled={item.quantity >= item.inventory}
                              aria-label="Increase quantity"
                              className="flex h-11 w-11 items-center justify-center disabled:opacity-25"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.cartId)}
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-black/40 transition hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={clearCart}
                className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-black/35 transition hover:text-red-700"
              >
                Clear entire bag
              </button>
            </div>

            <aside className="h-fit border border-black/10 bg-white/50 p-6 lg:sticky lg:top-8 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                Order summary
              </p>

              <div className="mt-6 space-y-4 border-b border-black/10 pb-6 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-black/55">Subtotal</span>
                  <span className="font-semibold">{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-black/55">Standard delivery</span>
                  <span className="font-semibold">
                    {remaining <= 0 ? "Complimentary" : "Calculated next"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-6">
                <span className="font-semibold">Estimated total</span>

                <span className="text-2xl font-semibold tracking-[-0.03em]">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="flex h-14 items-center justify-center gap-3 rounded-full bg-[#182321] px-6 text-sm font-semibold text-white transition hover:bg-[#263633]"
              >
                Proceed to checkout
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="mt-7 space-y-4 border-t border-black/10 pt-6">
                <TrustLine
                  icon={<ShieldCheck className="h-5 w-5" />}
                  title="Secure checkout"
                  description="Your payment information is encrypted."
                />

                <TrustLine
                  icon={<Truck className="h-5 w-5" />}
                  title="Australia-wide delivery"
                  description="Tracked delivery on every order."
                />

                <TrustLine
                  icon={<Check className="h-5 w-5" />}
                  title="Easy 30-day returns"
                  description="Return unworn products in original condition."
                />
              </div>
            </aside>
          </div>
        </section>
      )}
    </main>
  );
}

function TrustLine({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0">{icon}</div>

      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs leading-5 text-black/45">{description}</p>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <section className="px-6 py-24 text-center lg:px-10">
      <div className="mx-auto flex max-w-xl flex-col items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm">
          <ShoppingBag className="h-10 w-10 text-black/35" />
        </div>

        <h2 className="mt-8 text-4xl font-semibold tracking-[-0.045em]">Your bag is waiting</h2>

        <p className="mt-4 max-w-md text-sm leading-7 text-black/50">
          Explore coastal essentials designed for everyday wear, weekends away and life beside the
          ocean.
        </p>

        <Link
          href="/shop"
          className="mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#182321] px-8 text-sm font-semibold text-white"
        >
          Shop all products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
