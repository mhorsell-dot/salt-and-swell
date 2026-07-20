#!/usr/bin/env bash
set -e

echo "========================================"
echo "BUILD 040C.1"
echo "Premium Add To Bag Confirmation"
echo "========================================"

FILE="components/storefront/ProductPurchasePanel.tsx"

cp "$FILE" "$FILE.backup"

python3 <<'PY'
from pathlib import Path

path = Path("components/storefront/ProductPurchasePanel.tsx")

text = path.read_text()

# Update imports
text = text.replace(
'import { useMemo, useState } from "react";',
'import { useMemo, useState } from "react";'
)

# Add Link import
if 'import Link from "next/link";' not in text:
    text = text.replace(
        '"use client";\n',
        '"use client";\n\nimport Link from "next/link";\n'
    )


# Update cart hook
text = text.replace(
'const { addItem } = useCart();',
'const { addItem, openCart } = useCart();'
)


# Replace timeout section
old = '''    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1800);'''

new = '''    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 3500);'''

text = text.replace(old,new)


# Insert toast after handleAddToBag function before variants check

marker = '''  if (variants.length === 0) {'''

toast = '''
  {added && (
    <div className="fixed bottom-6 right-6 z-[100] w-[360px] rounded-2xl bg-black p-5 text-white shadow-2xl animate-in slide-in-from-bottom-5">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          <Check className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-semibold">
            Added to your bag
          </p>

          <p className="text-xs text-white/70">
            {product.name}
          </p>
        </div>

      </div>


      <div className="mt-4 grid grid-cols-2 gap-3">

        <button
          type="button"
          onClick={openCart}
          className="rounded-full bg-white px-4 py-3 text-xs font-bold uppercase tracking-wider text-black"
        >
          View Bag
        </button>


        <Link
          href="/checkout"
          className="rounded-full border border-white/30 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white"
        >
          Checkout
        </Link>

      </div>

    </div>
  )}

'''

text = text.replace(marker, toast + marker)


path.write_text(text)

print("Add-to-bag experience installed")

PY


echo "========================================"
echo "DONE"
echo "========================================"
