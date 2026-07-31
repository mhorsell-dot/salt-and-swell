"use client";

import Link from "next/link";
import { ArrowRight, Check, Minus, PackageCheck, Plus, ShoppingBag, Trash2, X } from "lucide-react";

import { useCart, type CartItem } from "./CartProvider";

const FREE_SHIPPING_THRESHOLD = 150;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(value);
}

function getEstimatedDeliveryText(): string {
  const start = new Date();
  const end = new Date();

  start.setDate(start.getDate() + 3);
  end.setDate(end.getDate() + 6);

  return `${start.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
  })}–${end.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
  })}`;
}

export default function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    isOpen,
    isHydrated,
    lastAddedCartId,
    updateQuantity,
    removeItem,
    closeCart,
  } = useCart();

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      <button
        type="button"
        aria-label="Close shopping bag"
        onClick={closeCart}
        className={`fixed inset-0 z-[90] bg-black/45 backdrop-blur-[2px] transition duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-hidden={!isOpen}
        aria-label="Shopping bag"
        className={`fixed inset-y-0 right-0 z-[100] flex w-full max-w-[470px] flex-col bg-[#f7f5ef] shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-black/10 px-5 sm:px-7">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/40">
              Salt &amp; Swell
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em]">
              Your bag
              {isHydrated && itemCount > 0 && (
                <span className="ml-2 text-sm font-medium text-black/45">({itemCount})</span>
              )}
            </h2>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition hover:bg-black hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {!isHydrated ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-black/15 border-t-black" />
          </div>
        ) : items.length === 0 ? (
          <EmptyCart closeCart={closeCart} />
        ) : (
          <>
            <ShippingProgress remaining={remainingForFreeShipping} progress={shippingProgress} />

            <div className="flex-1 overflow-y-auto px-5 py-2 sm:px-7">
              <div className="divide-y divide-black/10">
                {items.map((item) => (
                  <CartLine
                    key={item.cartId}
                    item={item}
                    wasJustAdded={lastAddedCartId === item.cartId}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                    closeCart={closeCart}
                  />
                ))}
              </div>

              <div className="my-5 flex items-start gap-3 rounded-2xl bg-white/65 p-4">
                <PackageCheck className="mt-0.5 h-5 w-5 shrink-0" />

                <div>
                  <p className="text-sm font-semibold">Estimated delivery</p>

                  <p className="mt-1 text-xs leading-5 text-black/50">
                    Standard Australian delivery estimated between {getEstimatedDeliveryText()}.
                  </p>
                </div>
              </div>
            </div>

            <footer className="shrink-0 border-t border-black/10 bg-[#f7f5ef] px-5 py-5 sm:px-7">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Subtotal</span>

                <span className="text-xl font-semibold tracking-[-0.025em]">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-black/45">
                Shipping and discounts are calculated at checkout.
              </p>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-5 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#182321] px-6 text-sm font-semibold text-white transition hover:bg-[#263633]"
              >
                Secure checkout
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-3 flex h-11 w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.15em] text-black/55 transition hover:text-black"
              >
                View full bag
              </Link>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}

function ShippingProgress({ remaining, progress }: { remaining: number; progress: number }) {
  const qualified = remaining <= 0;

  return (
    <div className="shrink-0 border-b border-black/10 bg-white/45 px-5 py-4 sm:px-7">
      <div className="flex items-center gap-2 text-xs font-semibold">
        {qualified ? (
          <>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#182321] text-white">
              <Check className="h-3 w-3" />
            </span>
            Complimentary standard delivery unlocked
          </>
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" />
            Spend {formatCurrency(remaining)} more for free delivery
          </>
        )}
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full rounded-full bg-[#182321] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function CartLine({
  item,
  wasJustAdded,
  updateQuantity,
  removeItem,
  closeCart,
}: {
  item: CartItem;
  wasJustAdded: boolean;
  updateQuantity: (cartId: string, quantity: number) => void;
  removeItem: (cartId: string) => void;
  closeCart: () => void;
}) {
  const variantDetails = [item.colour, item.size].filter(Boolean).join(" / ");

  return (
    <article
      className={`grid grid-cols-[94px_1fr] gap-4 py-5 transition ${
        wasJustAdded ? "translate-x-0 bg-emerald-50/60" : ""
      }`}
    >
      <Link
        href={`/shop/${item.slug}`}
        onClick={closeCart}
        className="aspect-[4/5] overflow-hidden bg-[#e4e0d7]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
      </Link>

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              href={`/shop/${item.slug}`}
              onClick={closeCart}
              className="line-clamp-2 text-sm font-semibold uppercase tracking-[0.035em]"
            >
              {item.name}
            </Link>

            {variantDetails && <p className="mt-1 text-xs text-black/45">{variantDetails}</p>}

            {item.sku && (
              <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-black/30">
                {item.sku}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.cartId)}
            aria-label={`Remove ${item.name}`}
            className="shrink-0 text-black/35 transition hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div className="flex h-9 items-center rounded-full border border-black/15 bg-white/55">
            <button
              type="button"
              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              className="flex h-9 w-9 items-center justify-center disabled:opacity-25"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>

            <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>

            <button
              type="button"
              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
              disabled={item.quantity >= item.inventory}
              aria-label="Increase quantity"
              className="flex h-9 w-9 items-center justify-center disabled:opacity-25"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</p>
        </div>

        {item.quantity >= item.inventory && (
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-amber-700">
            Maximum available quantity selected
          </p>
        )}

        {wasJustAdded && (
          <p className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
            <Check className="h-3 w-3" />
            Added to your bag
          </p>
        )}
      </div>
    </article>
  );
}

function EmptyCart({ closeCart }: { closeCart: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
        <ShoppingBag className="h-8 w-8 text-black/45" />
      </div>

      <h3 className="mt-7 text-3xl font-semibold tracking-[-0.04em]">Your bag is empty</h3>

      <p className="mt-3 max-w-xs text-sm leading-7 text-black/50">
        Discover considered coastal essentials designed for salty days and open roads.
      </p>

      <Link
        href="/shop"
        onClick={closeCart}
        className="mt-8 inline-flex h-13 items-center justify-center gap-3 rounded-full bg-[#182321] px-7 text-sm font-semibold text-white"
      >
        Explore the collection
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
