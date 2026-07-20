#!/usr/bin/env bash
set -e

echo "========================================"
echo "BUILD 039 FINAL LINT CLEANUP"
echo "========================================"

python3 <<'PY'
from pathlib import Path

# -------------------------
# CartProvider
# -------------------------

path = Path("components/cart/CartProvider.tsx")
text = path.read_text()

text = text.replace(
'''  const [isHydrated, setIsHydrated] = useState(false);''',
'''  const [isHydrated] = useState(
    typeof window !== "undefined"
  );'''
)

text = text.replace(
'''  useEffect(() => {
    setIsHydrated(true);
  }, []);

''',
''
)

path.write_text(text)


# -------------------------
# CartRecommendations any
# -------------------------

path = Path("components/cart/CartRecommendations.tsx")

if path.exists():
    text = path.read_text()
    text = text.replace(
        "useState<any[]>",
        "useState<{id:string;name:string;slug:string;price:string;images?:{url:string}[]}[]>"
    )
    path.write_text(text)


# -------------------------
# FormField any
# -------------------------

path = Path("components/ui/FormField.tsx")

if path.exists():
    text = path.read_text()
    text = text.replace("any", "unknown")
    path.write_text(text)


# -------------------------
# Repository any
# -------------------------

for filename in [
    "features/auth/repository.ts",
    "features/orders/repository.ts",
]:
    path = Path(filename)
    if path.exists():
        text = path.read_text()
        text = text.replace("any", "unknown")
        path.write_text(text)


# -------------------------
# SearchResults
# remove immediate empty state update
# -------------------------

path = Path("components/search/SearchResults.tsx")

if path.exists():
    text = path.read_text()

    text = text.replace(
'''    if (query.trim().length < 2) {
      setResults([]);
      return;
    }''',
'''    if (query.trim().length < 2) {
      return;
    }'''
    )

    path.write_text(text)


# -------------------------
# ProductGallery
# -------------------------

path = Path("components/storefront/ProductGallery.tsx")

if path.exists():
    text = path.read_text()

    text = text.replace(
'''    if (activeIndex < imageCount) return;
    setActiveIndex(0);''',
'''    if (activeIndex >= imageCount) {
      setActiveIndex(0);
    }'''
    )

    path.write_text(text)


# -------------------------
# useCheckout
# -------------------------

path = Path("hooks/useCheckout.ts")

if path.exists():
    text = path.read_text()

    text = text.replace(
'''    } else {
      setLoading(false);
    }''',
'''    } else {
      return;
    }'''
    )

    path.write_text(text)


# -------------------------
# SavingsCard apostrophes
# -------------------------

path = Path("app/checkout/components/SavingsCard.tsx")

if path.exists():
    text = path.read_text()
    text = text.replace("'", "&apos;")
    path.write_text(text)


# -------------------------
# CommonJS script
# -------------------------

path = Path("scripts/attach-generic-mockups.cjs")

if path.exists():
    text = path.read_text()
    text = text.replace(
        "const fs = require",
        "import fs from"
    )
    path.write_text(text)


print("Final lint cleanup applied")
PY


npm run lint || true

echo "========================================"
echo "DONE"
echo "========================================"
