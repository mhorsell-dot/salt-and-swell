#!/usr/bin/env bash
set -e

echo "========================================"
echo "BUILD 040A-2"
echo "Integrate Cart Recommendations"
echo "========================================"

FILE="components/cart/CartDrawer.tsx"

if [ ! -f "$FILE" ]; then
  echo "❌ CartDrawer.tsx not found"
  exit 1
fi

cp "$FILE" "$FILE.backup"

python3 <<'PY'
from pathlib import Path

path = Path("components/cart/CartDrawer.tsx")

text = path.read_text()

# Add import
if 'import CartRecommendations from "./CartRecommendations";' not in text:
    text = text.replace(
        'import { useCart, type CartItem } from "./CartProvider";',
        'import { useCart, type CartItem } from "./CartProvider";\nimport CartRecommendations from "./CartRecommendations";'
    )

# Add component before estimated delivery block
marker = '''<div className="my-5 flex items-start gap-3 rounded-2xl bg-white/65 p-4">'''

if "<CartRecommendations />" not in text:
    text = text.replace(
        marker,
        '''<CartRecommendations />

              ''' + marker
    )

path.write_text(text)

print("Cart recommendations integrated successfully")
PY


echo ""
echo "========================================"
echo "DONE"
echo "========================================"
