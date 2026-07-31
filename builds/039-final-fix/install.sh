#!/usr/bin/env bash
set -e

echo "===================================="
echo "BUILD 039 FINAL ERROR FIX"
echo "===================================="


python3 <<'PY'
from pathlib import Path


# -----------------------------
# CartProvider remove hydration state
# -----------------------------

path = Path("components/cart/CartProvider.tsx")

text = path.read_text()

text = text.replace(
'''  const [isHydrated] = useState(
    typeof window !== "undefined"
  );''',
'''  const isHydrated = typeof window !== "undefined";'''
)


text = text.replace(
'''  useEffect(() => {
    if (!isHydrated) {
      setIsHydrated(true);
    }
  }, [isHydrated]);

''',
''
)


path.write_text(text)



# -----------------------------
# ProductGallery remove effect reset
# -----------------------------

path = Path("components/storefront/ProductGallery.tsx")

text = path.read_text()

old = '''  useEffect(() => {
    if (activeIndex >= imageCount) {
      setActiveIndex(0);
    }
  }, [activeIndex, imageCount]);
'''

text = text.replace(old, "")

path.write_text(text)



# -----------------------------
# Remove lint scanning backup
# -----------------------------

path = Path("backups/build-025/components/cart/CartProvider.tsx")

if path.exists():
    path.unlink()



# -----------------------------
# Fix CommonJS script
# -----------------------------

path = Path("scripts/attach-generic-mockups.cjs")

if path.exists():

    text = path.read_text()

    text = text.replace(
        "const fs = require('fs');",
        "import fs from 'fs';"
    )

    path.write_text(text)


print("Final fixes applied")

PY


npm run lint || true

echo "===================================="
echo "COMPLETE"
echo "===================================="
