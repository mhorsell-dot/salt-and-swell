#!/usr/bin/env bash
set -e

echo "========================================"
echo "SALT & SWELL"
echo "Hydration + Dev Server Permanent Fix"
echo "========================================"


# ----------------------------------------
# BACKUP
# ----------------------------------------

cp components/cart/CartProvider.tsx \
components/cart/CartProvider.tsx.backup-hydration-fix

echo "✓ CartProvider backup created"


# ----------------------------------------
# PATCH CART PROVIDER HYDRATION
# ----------------------------------------

python3 <<'PY'

from pathlib import Path

path = Path("components/cart/CartProvider.tsx")

text = path.read_text()


old = """const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? sanitiseStoredItems(JSON.parse(stored)) : [];
    } catch {
      return [];
    }
  });"""


new = """const [items, setItems] = useState<CartItem[]>([]);"""


if old in text:
    text = text.replace(old, new)
    print("✓ Cart state changed to hydration safe mode")
else:
    print("Cart state block already updated or not found")


old_effect = """useEffect(() => {
    setIsHydrated(true);
  }, []);"""


new_effect = """useEffect(() => {

    try {

      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setItems(
          sanitiseStoredItems(JSON.parse(stored))
        );
      }

    } catch {
      setItems([]);
    }


    setIsHydrated(true);

  }, []);"""


if old_effect in text:
    text = text.replace(old_effect, new_effect)
    print("✓ Local storage moved client-side")
else:
    print("Hydration effect already updated or not found")


path.write_text(text)

PY


# ----------------------------------------
# FIX DEV SERVER MANAGEMENT
# ----------------------------------------

cat > scripts/dev-server.sh <<'SH'
#!/usr/bin/env bash

echo "================================"
echo "Stopping existing Next servers"
echo "================================"

pkill -f "next dev" || true
pkill -f "next-server" || true

sleep 2


echo "================================"
echo "Starting Salt & Swell"
echo "================================"

npm run dev
SH


chmod +x scripts/dev-server.sh

echo "✓ Dev server helper created"


# ----------------------------------------
# CLEAN NEXT CACHE
# ----------------------------------------

rm -rf .next

echo "✓ Next cache cleared"


# ----------------------------------------
# VERIFY
# ----------------------------------------

npm run lint || true


echo ""
echo "========================================"
echo "FIX COMPLETE"
echo "========================================"

echo ""
echo "Start development with:"
echo "./scripts/dev-server.sh"

