"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

import { useCart } from "./CartProvider";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(value);
}

export default function CartDrawer() {
  const { items, itemCount, subtotal, isOpen, closeCart, openCart, removeItem, updateQuantity } =
    useCart();

  return (
    <>
      <button
        type="button"
        onClick={openCart}
        aria-label={`Open shopping bag with ${itemCount} items`}
        className="fixed bottom-6 right-6 z-40 flex h-14 items-center gap-3 rounded-full bg-[#111412] px-5 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.02]"
      >
        <ShoppingBag className="h-5 w-5" />

        <span>Bag</span>

        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-black">
          {itemCount}
        </span>
      </button>

      <div
        aria-hidden={!isOpen}
        className={
          isOpen
            ? "fixed inset-0 z-50 bg-black/45 opacity-100 transition"
            : "pointer-events-none fixed inset-0 z-50 bg-black/45 opacity-0 transition"
        }
        onClick={closeCart}
      />

      <aside
        aria-label="Shopping bag"
        className={
          isOpen
            ? "fixed bottom-0 right-0 top-0 z-[60] flex w-full max-w-md translate-x-0 flex-col bg-[#f5f3ee] shadow-2xl transition duration-300"
            : "fixed bottom-0 right-0 top-0 z-[60] flex w-full max-w-md translate-x-full flex-col bg-[#f5f3ee] shadow-2xl transition duration-300"
        }
      >
        <header className="flex h-20 items-center justify-between border-b border-black/10 px-6">
          <div>
            <p className="text-lg font-semibold">Your bag</p>
            <p className="mt-1 text-xs text-black/50">
              {itemCount} item{itemCount === 1 ? "" : "s"}
            </p>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close shopping bag"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 transition hover:bg-black hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
              <ShoppingBag className="h-7 w-7" />
            </div>

            <h2 className="mt-6 text-2xl font-semibold tracking-tight">Your bag is empty.</h2>

            <p className="mt-3 max-w-xs text-sm leading-7 text-black/55">
              Explore the current Salt &amp; Swell collection and add something made for life beside
              the ocean.
            </p>

            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-7 inline-flex h-12 items-center justify-center bg-black px-7 text-xs font-semibold uppercase tracking-[0.15em] text-white"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <article
                    key={item.cartId}
                    className="grid grid-cols-[100px_1fr] gap-4 border-b border-black/10 pb-6"
                  >
                    <Link
                      href={`/shop/${item.productSlug}`}
                      onClick={closeCart}
                      className="aspect-[4/5] overflow-hidden bg-[#e5e1d8]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                      />
                    </Link>

                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            href={`/shop/${item.productSlug}`}
                            onClick={closeCart}
                            className="text-sm font-semibold uppercase tracking-[0.04em]"
                          >
                            {item.productName}
                          </Link>

                          <p className="mt-1 text-xs text-black/50">
                            {item.colour} / {item.size}
                          </p>

                          <p className="mt-1 font-mono text-[10px] uppercase text-black/35">
                            {item.sku}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.cartId)}
                          aria-label={`Remove ${item.productName}`}
                          className="text-black/40 transition hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex h-10 items-center border border-black/15">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="flex h-full w-9 items-center justify-center disabled:opacity-30"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>

                          <span className="flex h-full min-w-9 items-center justify-center text-xs font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            disabled={item.quantity >= item.inventory}
                            className="flex h-full w-9 items-center justify-center disabled:opacity-30"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <p className="text-sm font-semibold">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <footer className="border-t border-black/10 bg-white/45 px-6 py-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.12em]">Subtotal</p>

                <p className="text-xl font-semibold">{formatCurrency(subtotal)}</p>
              </div>

              <p className="mt-2 text-xs leading-5 text-black/50">
                Shipping and taxes are calculated during checkout.
              </p>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-5 flex h-14 items-center justify-center bg-black text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-black/80"
              >
                Proceed to checkout
              </Link>

              <button
                type="button"
                onClick={closeCart}
                className="mt-3 flex h-11 w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.14em] text-black/60"
              >
                Continue shopping
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
