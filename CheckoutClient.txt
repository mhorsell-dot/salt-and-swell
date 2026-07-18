"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  LockKeyhole,
  PackageCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useState, type FormEvent } from "react";

import { useCart } from "@/components/cart/CartProvider";

type ShippingMethod = "standard" | "express";

const STANDARD_SHIPPING = 9.95;
const EXPRESS_SHIPPING = 16.95;
const FREE_SHIPPING_THRESHOLD = 100;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(value);
}

export default function CheckoutClient() {
  const { items, itemCount, subtotal, isHydrated } = useCart();

  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("standard");

  const [submitted, setSubmitted] = useState(false);

  const standardShipping =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;

  const shipping =
    shippingMethod === "express" ? EXPRESS_SHIPPING : standardShipping;

  const total = subtotal + shipping;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-[#f4f1ea] px-5 py-20 text-[#171715]">
        <div className="mx-auto max-w-7xl">
          <div className="h-8 w-48 animate-pulse rounded-full bg-black/10" />

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="h-[680px] animate-pulse rounded-[2rem] bg-white" />
            <div className="h-[520px] animate-pulse rounded-[2rem] bg-white" />
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f1ea] px-5 py-20 text-[#171715]">
        <section className="w-full max-w-xl rounded-[2rem] border border-black/10 bg-white px-7 py-12 text-center shadow-[0_24px_80px_rgba(0,0,0,0.07)] sm:px-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#171715] text-white">
            <ShoppingBag className="h-7 w-7" />
          </div>

          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
            Your bag
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Your checkout is empty.
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-black/55">
            Add something from the latest Salt &amp; Swell collection before
            heading to checkout.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex h-13 items-center justify-center gap-2 bg-[#171715] px-8 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-black/80"
          >
            Explore the shop
            <ChevronRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#171715]">
      <div className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/55 transition hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to bag
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/50">
            <LockKeyhole className="h-4 w-4" />
            Secure checkout
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
            Salt &amp; Swell
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
            Checkout
          </h1>

          <p className="mt-4 text-sm leading-7 text-black/55">
            Complete your delivery details and review your order before moving
            to secure payment.
          </p>
        </div>

        {submitted && (
          <div className="mb-8 flex items-start gap-4 rounded-2xl border border-[#315c43]/20 bg-[#eaf3ec] p-5 text-[#244632]">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#315c43] text-white">
              <Check className="h-4 w-4" />
            </div>

            <div>
              <p className="font-semibold">Your details are ready.</p>
              <p className="mt-1 text-sm leading-6 text-[#315c43]/75">
                Secure online payment will be connected in Build 026B. Your cart
                has not been cleared or charged.
              </p>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_420px]"
        >
          <div className="space-y-7">
            <section className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.05)] sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171715] text-sm font-semibold text-white">
                  1
                </div>

                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.025em]">
                    Contact information
                  </h2>
                  <p className="mt-1 text-sm text-black/45">
                    We’ll send your receipt and delivery updates here.
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <CheckoutField
                  id="firstName"
                  label="First name"
                  autoComplete="given-name"
                  required
                />

                <CheckoutField
                  id="lastName"
                  label="Last name"
                  autoComplete="family-name"
                  required
                />

                <CheckoutField
                  id="email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  required
                />

                <CheckoutField
                  id="phone"
                  label="Mobile number"
                  type="tel"
                  autoComplete="tel"
                  required
                />
              </div>

              <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-6 text-black/55">
                <input
                  type="checkbox"
                  name="marketing"
                  className="mt-1 h-4 w-4 rounded border-black/20 accent-black"
                />
                Keep me updated with new drops, restocks and Salt &amp; Swell
                stories.
              </label>
            </section>

            <section className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.05)] sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171715] text-sm font-semibold text-white">
                  2
                </div>

                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.025em]">
                    Delivery address
                  </h2>
                  <p className="mt-1 text-sm text-black/45">
                    Australian delivery addresses are supported.
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <CheckoutField
                    id="address"
                    label="Street address"
                    autoComplete="address-line1"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <CheckoutField
                    id="addressLine2"
                    label="Apartment, suite or unit"
                    autoComplete="address-line2"
                  />
                </div>

                <CheckoutField
                  id="suburb"
                  label="Suburb"
                  autoComplete="address-level2"
                  required
                />

                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.13em] text-black/55">
                    State
                  </span>

                  <select
                    name="state"
                    id="state"
                    autoComplete="address-level1"
                    required
                    defaultValue=""
                    className="mt-2 h-13 w-full appearance-none rounded-xl border border-black/12 bg-[#faf9f6] px-4 text-sm outline-none transition focus:border-black/40 focus:ring-2 focus:ring-black/5"
                  >
                    <option value="" disabled>
                      Select state
                    </option>
                    <option value="SA">South Australia</option>
                    <option value="VIC">Victoria</option>
                    <option value="NSW">New South Wales</option>
                    <option value="QLD">Queensland</option>
                    <option value="WA">Western Australia</option>
                    <option value="TAS">Tasmania</option>
                    <option value="ACT">Australian Capital Territory</option>
                    <option value="NT">Northern Territory</option>
                  </select>
                </label>

                <CheckoutField
                  id="postcode"
                  label="Postcode"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  pattern="[0-9]{4}"
                  maxLength={4}
                  required
                />

                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.13em] text-black/55">
                    Country
                  </span>

                  <input
                    value="Australia"
                    readOnly
                    className="mt-2 h-13 w-full rounded-xl border border-black/12 bg-black/[0.035] px-4 text-sm text-black/55 outline-none"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.05)] sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171715] text-sm font-semibold text-white">
                  3
                </div>

                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.025em]">
                    Delivery method
                  </h2>
                  <p className="mt-1 text-sm text-black/45">
                    Choose how quickly you’d like your order.
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-3">
                <ShippingOption
                  selected={shippingMethod === "standard"}
                  name="shippingMethod"
                  value="standard"
                  title="Standard delivery"
                  description="Estimated 3–7 business days"
                  price={
                    standardShipping === 0
                      ? "Free"
                      : formatCurrency(standardShipping)
                  }
                  icon={<Truck className="h-5 w-5" />}
                  onChange={() => setShippingMethod("standard")}
                />

                <ShippingOption
                  selected={shippingMethod === "express"}
                  name="shippingMethod"
                  value="express"
                  title="Express delivery"
                  description="Estimated 1–3 business days"
                  price={formatCurrency(EXPRESS_SHIPPING)}
                  icon={<PackageCheck className="h-5 w-5" />}
                  onChange={() => setShippingMethod("express")}
                />
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-6">
            <section className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.07)] sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                    Order summary
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </h2>
                </div>

                <ShoppingBag className="h-6 w-6 text-black/45" />
              </div>

              <div className="mt-7 divide-y divide-black/8 border-y border-black/8">
                {items.map((item) => (
                  <div key={item.cartId} className="flex gap-4 py-5">
                    <div className="flex h-20 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f1eee7]">
                      {item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ShoppingBag className="h-5 w-5 text-black/25" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="line-clamp-2 text-sm font-semibold leading-5">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-black/45">
                            {[item.colour, item.size]
                              .filter(Boolean)
                              .join(" · ") || "Standard"}
                          </p>

                          <p className="mt-2 text-xs text-black/45">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-semibold">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 py-6 text-sm">
                <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />

                <SummaryRow
                  label={
                    shippingMethod === "express"
                      ? "Express delivery"
                      : "Standard delivery"
                  }
                  value={shipping === 0 ? "Free" : formatCurrency(shipping)}
                />
              </div>

              <div className="flex items-end justify-between border-t border-black/10 pt-5">
                <div>
                  <p className="text-sm font-semibold">Total</p>
                  <p className="mt-1 text-xs text-black/40">
                    Including applicable GST
                  </p>
                </div>

                <p className="text-2xl font-semibold tracking-[-0.035em]">
                  {formatCurrency(total)}
                </p>
              </div>

              <button
                type="submit"
                className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#171715] px-6 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-black/80 focus:outline-none focus:ring-4 focus:ring-black/10"
              >
                Continue to payment
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-black/40">
                <LockKeyhole className="h-3.5 w-3.5" />
                Secure checkout · Payments coming next
              </div>
            </section>

            <div className="mt-5 rounded-2xl border border-black/8 bg-white/55 p-5 text-sm leading-6 text-black/50">
              Free standard delivery applies automatically when your subtotal
              reaches {formatCurrency(FREE_SHIPPING_THRESHOLD)}.
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}

type CheckoutFieldProps = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  pattern?: string;
  maxLength?: number;
};

function CheckoutField({
  id,
  label,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
  pattern,
  maxLength,
}: CheckoutFieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.13em] text-black/55">
        {label}
        {required ? " *" : ""}
      </span>

      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={maxLength}
        className="mt-2 h-13 w-full rounded-xl border border-black/12 bg-[#faf9f6] px-4 text-sm outline-none transition placeholder:text-black/25 focus:border-black/40 focus:ring-2 focus:ring-black/5"
      />
    </label>
  );
}

type ShippingOptionProps = {
  selected: boolean;
  name: string;
  value: string;
  title: string;
  description: string;
  price: string;
  icon: React.ReactNode;
  onChange: () => void;
};

function ShippingOption({
  selected,
  name,
  value,
  title,
  description,
  price,
  icon,
  onChange,
}: ShippingOptionProps) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
        selected
          ? "border-black bg-black/[0.025] ring-1 ring-black"
          : "border-black/10 hover:border-black/25"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={onChange}
        className="sr-only"
      />

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1eee7]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs text-black/45">{description}</p>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-sm font-semibold">{price}</p>

        <div
          className={`flex h-5 w-5 items-center justify-center rounded-full border ${
            selected
              ? "border-black bg-black text-white"
              : "border-black/20 bg-white"
          }`}
        >
          {selected && <Check className="h-3 w-3" />}
        </div>
      </div>
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-5">
      <span className="text-black/50">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
