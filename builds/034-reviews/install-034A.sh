#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "BUILD 034A - REVIEWS DATABASE"
echo "========================================"

SCHEMA="prisma/schema.prisma"

if [ ! -f "$SCHEMA" ]; then
  echo "❌ Could not find $SCHEMA"
  exit 1
fi

cp "$SCHEMA" "${SCHEMA}.backup-$(date +%Y%m%d-%H%M%S)"

python3 <<'PY'
from pathlib import Path

schema = Path("prisma/schema.prisma")
text = schema.read_text()

if "model Review {" in text:
    print("✅ Review model already exists. No changes made.")
    raise SystemExit

addition = """

enum FitFeedback {
  RUNS_SMALL
  TRUE_TO_SIZE
  RUNS_LARGE
}

model Review {
  id               String        @id @default(cuid())
  rating           Int
  title            String
  body             String
  reviewerName     String
  verifiedPurchase Boolean       @default(false)
  fit              FitFeedback?
  helpfulCount     Int           @default(0)

  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  images ReviewImage[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([productId])
}

model ReviewImage {
  id       String @id @default(cuid())
  url      String
  alt      String?

  reviewId String
  review   Review @relation(fields: [reviewId], references: [id], onDelete: Cascade)
}
"""

text += addition

# Attach relation to Product model if not already present
if "reviews Review[]" not in text:
    product_start = text.find("model Product {")
    if product_start != -1:
        brace = text.find("{", product_start)
        end = text.find("}", brace)
        block = text[brace+1:end]
        if "reviews" not in block:
            insertion = "\n  reviews Review[]\n"
            text = text[:end] + insertion + text[end:]

schema.write_text(text)
print("✅ Review schema added.")
PY

echo
echo "========================================"
echo "NEXT STEPS"
echo "========================================"
echo
echo "Run:"
echo
echo "npx prisma format"
echo "npx prisma migrate dev --name add_reviews"
echo "npx prisma generate"
echo
