"use client";

import { useMemo, useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";

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

export default function ProductPurchasePanel({
  product,
  variants,
}: ProductPurchasePanelProps) {
  const { addItem } = useCart();

  const availableVariants = useMemo(
    () => variants.filter((variant) => variant.inventory > 0),
    [variants],
  );

  const colours = useMemo(
    () => Array.from(new Set(variants.map((variant) => variant.colour))),
    [variants],
  );

  const [selectedColour, setSelectedColour] = useState(
    availableVariants[0]?.colour ?? colours[0] ?? "",
  );

  const availableSizes = useMemo(
    () =>
      Array.from(
        new Set(
          variants
            .filter((variant) => variant.colour === selectedColour)
            .map((variant) => variant.size),
        ),
      ),
    [variants, selectedColour],
  );

  const initialVariant =
    availableVariants.find((variant) => variant.colour === selectedColour) ??
    availableVariants[0];

  const [selectedVariantId, setSelectedVariantId] = useState(
    initialVariant?.id ?? "",
  );

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const selectedVariant =
    variants.find((variant) => variant.id === selectedVariantId) ??
    variants.find(
      (variant) => variant.colour === selectedColour && variant.inventory > 0,
    );

  function selectColour(colour: string) {
    setSelectedColour(colour);

    const firstVariant = variants.find(
      (variant) => variant.colour === colour && variant.inventory > 0,
    );

    setSelectedVariantId(firstVariant?.id ?? "");
    setQuantity(1);
  }

  function selectSize(size: string) {
    const variant = variants.find(
      (candidate) =>
        candidate.colour === selectedColour && candidate.size === size,
    );

    setSelectedVariantId(variant?.id ?? "");
    setQuantity(1);
  }

  function handleAddToBag() {
    if (!selectedVariant || selectedVariant.inventory <= 0) {
      return;
    }

    addItem({
      productId: product.id,
      slug: product.slug,
      productName: product.name,
      variantId: selectedVariant.id,
      size: selectedVariant.size,
      colour: selectedVariant.colour,
      sku: selectedVariant.sku,
      price: product.price,
      quantity,
      inventory: selectedVariant.inventory,
      imageUrl: product.imageUrl,
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1800);
  }

  if (variants.length === 0) {
    return (
      <div className="mt-8 border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900">
        This product does not have any purchasable variants yet.
      </div>
    );
  }

  return (
    <div className="mt-8">
      {colours.length > 0 && (
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]">
              Colour
            </p>

            <p className="text-xs text-black/50">{selectedColour}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {colours.map((colour) => {
              const isSelected = colour === selectedColour;

              return (
                <button
                  key={colour}
                  type="button"
                  onClick={() => selectColour(colour)}
                  className={
                    isSelected
                      ? "border border-black bg-black px-4 py-3 text-sm font-medium text-white"
                      : "border border-black/20 px-4 py-3 text-sm font-medium transition hover:border-black"
                  }
                >
                  {colour}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">
            Size
          </p>

          <button
            type="button"
            className="text-xs font-semibold text-black/50 underline underline-offset-4"
          >
            Size guide
          </button>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {availableSizes.map((size) => {
            const variant = variants.find(
              (candidate) =>
                candidate.colour === selectedColour && candidate.size === size,
            );

            const isSelected = variant?.id === selectedVariant?.id;

            const disabled = !variant || variant.inventory <= 0;

            return (
              <button
                key={size}
                type="button"
                disabled={disabled}
                onClick={() => selectSize(size)}
                className={
                  isSelected
                    ? "h-12 border border-black bg-black text-sm font-semibold text-white"
                    : "h-12 border border-black/20 text-sm font-semibold transition hover:border-black disabled:cursor-not-allowed disabled:bg-black/5 disabled:text-black/25"
                }
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {selectedVariant && (
        <p className="mt-4 text-xs text-black/50">
          {selectedVariant.inventory} available in {selectedVariant.colour},
          size {selectedVariant.size}
        </p>
      )}

      <div className="mt-8 grid grid-cols-[120px_1fr] gap-3">
        <div className="flex h-14 items-center border border-black/20">
          <button
            type="button"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            disabled={quantity <= 1}
            className="flex h-full w-10 items-center justify-center disabled:opacity-30"
          >
            <Minus className="h-4 w-4" />
          </button>

          <span className="flex min-w-10 flex-1 items-center justify-center text-sm font-semibold">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() =>
              setQuantity((current) =>
                Math.min(selectedVariant?.inventory ?? 1, current + 1),
              )
            }
            disabled={!selectedVariant || quantity >= selectedVariant.inventory}
            className="flex h-full w-10 items-center justify-center disabled:opacity-30"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToBag}
          disabled={!selectedVariant || selectedVariant.inventory <= 0}
          className={
            added
              ? "inline-flex h-14 items-center justify-center gap-3 bg-emerald-700 px-6 text-sm font-semibold uppercase tracking-[0.14em] text-white"
              : "inline-flex h-14 items-center justify-center gap-3 bg-black px-6 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-black/30"
          }
        >
          {added ? (
            <>
              <Check className="h-5 w-5" />
              Added to bag
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5" />
              Add to bag
            </>
          )}
        </button>
      </div>
    </div>
  );
}
