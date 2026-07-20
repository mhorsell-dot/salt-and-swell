#!/usr/bin/env bash
set -e

echo "========================================"
echo "BUILD 040C.2"
echo "Premium Cart Drawer Upgrade"
echo "========================================"

FILE="components/cart/CartDrawer.tsx"

cp "$FILE" "$FILE.backup-040C2"

python3 <<'PY'
from pathlib import Path

path = Path("components/cart/CartDrawer.tsx")

text = path.read_text()


# Header upgrade
text = text.replace(
'''<h2 className="mt-1 text-xl font-semibold tracking-[-0.03em]">
              Your bag
              {isHydrated && itemCount > 0 && (
                <span className="ml-2 text-sm font-medium text-black/45">({itemCount})</span>
              )}
            </h2>''',
'''<h2 className="mt-1 text-xl font-semibold tracking-[-0.03em]">
              Your bag
            </h2>

            {isHydrated && itemCount > 0 && (
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/45">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
            )}'''
)


# Checkout text
text = text.replace(
'''Secure checkout
                <ArrowRight''',
'''Checkout
                <ArrowRight'''
)


# Insert trust block before checkout button
marker = '''<Link
                href="/checkout"'''

trust = '''<div className="mb-4 grid grid-cols-3 gap-2 rounded-2xl bg-white/60 p-4 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-black/55">
                <span>Secure payments</span>
                <span>Australian shipping</span>
                <span>Easy returns</span>
              </div>

              '''

text = text.replace(marker, trust + marker)


path.write_text(text)

print("Cart drawer upgraded")

PY

echo "========================================"
echo "DONE"
echo "========================================"
