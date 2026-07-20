#!/usr/bin/env bash
set -e

echo "========================================"
echo "BUILD 040B-1"
echo "Live Navbar Cart Count"
echo "========================================"

FILE="components/layout/Navbar.tsx"

if [ ! -f "$FILE" ]; then
  echo "❌ Navbar.tsx not found"
  exit 1
fi

cp "$FILE" "$FILE.backup"

python3 <<'PY'
from pathlib import Path

path = Path("components/layout/Navbar.tsx")

text = path.read_text()

# Add cart hook import
if 'useCart' not in text:
    text = text.replace(
        'import SearchResults from "@/components/search/SearchResults";',
        'import SearchResults from "@/components/search/SearchResults";\nimport { useCart } from "@/components/cart/CartProvider";'
    )

# Add hook inside component
if 'const { itemCount } = useCart();' not in text:
    text = text.replace(
        'export default function Navbar() {\n',
        'export default function Navbar() {\n  const { itemCount } = useCart();\n'
    )

# Replace static cart badge
old = '''<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">'''

new = '''<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">'''

# Replace content between span and closing span after ShoppingBag
marker = '''<ShoppingBag className="h-5 w-5" />

              <span'''

if marker in text:
    start = text.index(marker)
    end = text.index("</span>", start) + len("</span>")

    current = text[start:end]

    replacement = current
    if "itemCount" not in current:
        replacement = current.replace(
            current.split(">")[-1].split("<")[0],
            "{itemCount}"
        )

    text = text[:start] + replacement + text[end:]

path.write_text(text)

print("Navbar cart count connected")
PY

echo ""
echo "========================================"
echo "DONE"
echo "========================================"
