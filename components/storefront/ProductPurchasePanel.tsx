"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import TrustBar from "@/components/storefront/TrustBar";

type Variant = {
  id: string;
  size: string;
  colour: string;
  sku: string;
  inventory: number;
};

type ProductPurchasePanelProps = {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  variants: Variant[];
};

export default function ProductPurchasePanel({ product, variants }: ProductPurchasePanelProps) {
  const { addItem, openCart } = useCart();

  const availableVariants = useMemo(() => variants.filter((v) => v.inventory > 0), [variants]);

  const colours = useMemo(() => Array.from(new Set(variants.map((v) => v.colour))), [variants]);

  const [selectedColour, setSelectedColour] = useState(
    availableVariants[0]?.colour ?? colours[0] ?? "",
  );

  const availableSizes = useMemo(
    () =>
      Array.from(new Set(variants.filter((v) => v.colour === selectedColour).map((v) => v.size))),
    [variants, selectedColour],
  );

  const initialVariant =
    availableVariants.find((v) => v.colour === selectedColour) ?? availableVariants[0];

  const [selectedVariantId, setSelectedVariantId] = useState(initialVariant?.id ?? "");

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const selectedVariant =
    variants.find((v) => v.id === selectedVariantId) ??
    variants.find((v) => v.colour === selectedColour && v.inventory > 0);

  function selectColour(colour: string) {
    setSelectedColour(colour);

    const variant = variants.find((v) => v.colour === colour && v.inventory > 0);

    setSelectedVariantId(variant?.id ?? "");
    setQuantity(1);
  }

  function selectSize(size: string) {
    const variant = variants.find((v) => v.colour === selectedColour && v.size === size);

    setSelectedVariantId(variant?.id ?? "");
    setQuantity(1);
  }

  function handleAddToBag() {
    if (!selectedVariant || selectedVariant.inventory <= 0) return;

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      variantId: selectedVariant.id,
      size: selectedVariant.size,
      colour: selectedVariant.colour,
      sku: selectedVariant.sku,
      quantity,
      inventory: selectedVariant.inventory,
      imageUrl: product.imageUrl,
      price: product.price,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 900);
  }

  if (variants.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        This product does not have any purchasable variants yet.
      </div>
    );
  }

  return (
    <div className="mt-8">
      {added && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] overflow-hidden rounded-3xl bg-[#111] text-white shadow-[0_25px_80px_rgba(0,0,0,.35)]">
          <div className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
              <Check className="h-6 w-6" />
            </div>

            <div>
              <p className="font-semibold">Added to your bag</p>

              <p className="text-sm text-white/60">{product.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 border-t border-white/10">
            <button onClick={openCart} className="py-4 font-semibold hover:bg-white/10">
              View Bag
            </button>

            <Link
              href="/checkout"
              className="border-l border-white/10 py-4 text-center font-semibold hover:bg-white/10"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}

      {!!colours.length && (
        <>
          <div className="flex justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Colour</p>

            <p className="text-xs text-black/50">{selectedColour}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {colours.map((colour) => {
              const selected = colour === selectedColour;

              return (
                <button
                  key={colour}
                  onClick={() => selectColour(colour)}
                  className={
                    selected
                      ? "rounded-full border-2 border-black bg-black px-5 py-3 text-sm text-white shadow-lg"
                      : "rounded-full border border-black/15 bg-white px-5 py-3 text-sm transition hover:border-black hover:shadow-md"
                  }
                >
                  {colour}
                </button>
              );
            })}
          </div>
        </>
      )}

      <div className="mt-10">
        <div className="flex justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">Size</p>

          <button className="text-xs underline">Size Guide</button>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {availableSizes.map((size) => {
            const variant = variants.find((v) => v.colour === selectedColour && v.size === size);

            const selected = variant?.id === selectedVariant?.id;

            return (
              <button
                key={size}
                disabled={!variant || variant.inventory <= 0}
                onClick={() => selectSize(size)}
                className={
                  selected
                    ? "h-14 rounded-xl border-2 border-black bg-black text-white shadow-lg"
                    : "h-14 rounded-xl border border-black/15 bg-white hover:border-black hover:shadow-md disabled:opacity-30"
                }
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {selectedVariant && (
        <div className="mt-5 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700">
          {selectedVariant.inventory} Available
        </div>
      )}

      <div className="mt-8 grid grid-cols-[120px_1fr] gap-4">
        <div className="flex h-14 items-center rounded-xl border border-black/15 bg-white shadow-sm">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10">
            <Minus size={16} />
          </button>

          <div className="flex-1 text-center font-semibold">{quantity}</div>

          <button
            onClick={() => setQuantity((q) => Math.min(selectedVariant?.inventory ?? 1, q + 1))}
            className="w-10"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={handleAddToBag}
          disabled={!selectedVariant}
          className="flex h-14 items-center justify-center gap-3 rounded-xl bg-[#182321] text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#243530] hover:shadow-2xl disabled:opacity-40"
        >
          <ShoppingBag size={18} />

          {added ? "Added" : "Add to Bag"}
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-black/10 bg-white p-5">
        <div className="flex justify-between">
          <span className="font-medium">Secure Checkout</span>

          <span className="text-xs uppercase tracking-widest text-black/45">SSL</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-black/60">
          <div>✓ Visa</div>
          <div>✓ Mastercard</div>
          <div>✓ Apple Pay</div>
          <div>✓ Google Pay</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-[#f7f6f2] p-5">
        <h4 className="font-semibold">Shipping</h4>

        <p className="mt-2 text-sm leading-7 text-black/60">
          Complimentary Australian shipping on orders over $150. Orders dispatch within one business
          day.
        </p>
      </div>

      <TrustBar />
    </div>
  );
}
