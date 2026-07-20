#!/usr/bin/env bash
set -e

echo "========================================"
echo " BUILD 039.1"
echo " WISHLIST DATABASE"
echo "========================================"

SCHEMA="prisma/schema.prisma"

cp "$SCHEMA" "${SCHEMA}.backup-$(date +%Y%m%d-%H%M%S)"

python3 <<'PY'
from pathlib import Path

path = Path("prisma/schema.prisma")
text = path.read_text()

if "model WishlistItem" in text:
    print("WishlistItem already exists.")
    raise SystemExit(0)

customer_block = """  orders  Order[]
  reviews Review[]
"""

customer_replacement = """  orders  Order[]
  reviews Review[]
  wishlistItems WishlistItem[]
"""

text = text.replace(customer_block, customer_replacement)

product_block = """  variants   ProductVariant[]
  reviews    Review[]
  orderItems OrderItem[]
"""

product_replacement = """  variants   ProductVariant[]
  reviews    Review[]
  orderItems OrderItem[]
  wishlistItems WishlistItem[]
"""

text = text.replace(product_block, product_replacement)

text += """

model WishlistItem {
  id String @id @default(cuid())

  customerId String
  customer Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)

  productId String
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())

  @@unique([customerId, productId])
}
"""

path.write_text(text)
print("Wishlist schema added.")
PY

echo
echo "========================================"
echo "Schema Updated"
echo "========================================"
echo
echo "Run the migration:"
echo
echo "npx prisma migrate dev --name add-wishlist"
echo
echo "Then generate the client:"
echo
echo "npx prisma generate"
echo
