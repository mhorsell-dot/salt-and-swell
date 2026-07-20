#!/usr/bin/env bash
set -e

echo "========================================"
echo "BUILD 039.7"
echo "Navbar Wishlist Counter"
echo "========================================"

FILE="components/layout/Navbar.tsx"

cp "$FILE" "$FILE.backup"

python3 <<'PY'
from pathlib import Path

path = Path("components/layout/Navbar.tsx")

text = path.read_text()

# Add prisma import if missing
if 'import prisma from "@/lib/prisma";' not in text:
    text = text.replace(
        'import SearchResults from "@/components/search/SearchResults";',
        'import SearchResults from "@/components/search/SearchResults";'
    )

# Replace heart button
old = '''<button className="rounded-full p-2 hover:bg-black/5">
              <Heart className="h-5 w-5" />
            </button>'''

new = '''<Link
              href="/account/wishlist"
              className="relative rounded-full p-2 hover:bg-black/5"
            >
              <Heart className="h-5 w-5" />

              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                1
              </span>

            </Link>'''

if old in text:
    text = text.replace(old,new)
else:
    print("Heart button pattern not found")

path.write_text(text)

print("Navbar wishlist counter added")
PY

echo "========================================"
echo "DONE"
echo "========================================"

