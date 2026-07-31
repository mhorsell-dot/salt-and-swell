#!/usr/bin/env bash
set -e

echo "========================================"
echo "BUILD 041C"
echo "Customer Address Foundation"
echo "========================================"


python3 <<'PY'
from pathlib import Path

path = Path("prisma/schema.prisma")

text = path.read_text()

if "model CustomerAddress" not in text:

    addition = '''

model CustomerAddress {
  id String @id @default(cuid())

  customerId String
  customer Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)

  label String @default("Home")

  firstName String
  lastName String

  company String?

  address1 String
  address2 String?

  city String
  state String
  postcode String
  country String @default("Australia")

  isDefault Boolean @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

'''

    text += addition


# add relationship to customer
text = text.replace(
'''  wishlistItems WishlistItem[]
''',
'''  wishlistItems WishlistItem[]

  addresses CustomerAddress[]
'''
)

path.write_text(text)

print("CustomerAddress model added")

PY


npx prisma format

echo ""
echo "Creating migration..."

npx prisma migrate dev \
--name add_customer_addresses


echo ""
echo "========================================"
echo "DONE"
echo "========================================"

