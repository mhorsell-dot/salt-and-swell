#!/usr/bin/env bash
set -e

echo "========================================"
echo "BUILD 041D.1"
echo "Saved Address Checkout Integration"
echo "========================================"


# --------------------------------------------------
# BACKUPS
# --------------------------------------------------

cp app/checkout/CheckoutClient.tsx \
app/checkout/CheckoutClient.tsx.backup-041D1


# --------------------------------------------------
# CREATE API ROUTE
# --------------------------------------------------

mkdir -p app/api/account/addresses


cat > app/api/account/addresses/route.ts <<'TS'
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const DEMO_CUSTOMER_ID = "demo-customer";

export async function GET() {

  const addresses = await prisma.customerAddress.findMany({
    where: {
      customerId: DEMO_CUSTOMER_ID,
    },
    orderBy: [
      {
        isDefault: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return NextResponse.json(addresses);

}
TS


echo "✓ Address API created"


# --------------------------------------------------
# CREATE COMPONENT
# --------------------------------------------------

mkdir -p app/checkout/components


cat > app/checkout/components/SavedAddressSelector.tsx <<'TS'
"use client";

import { useEffect, useState } from "react";


type Address = {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
};


export default function SavedAddressSelector() {

  const [addresses, setAddresses] = useState<Address[]>([]);


  useEffect(() => {

    fetch("/api/account/addresses")
      .then((response) => response.json())
      .then(setAddresses)
      .catch(() => setAddresses([]));

  }, []);


  if (addresses.length === 0) {
    return null;
  }


  return (

    <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.05)] sm:p-8">

      <div>
        <h2 className="text-xl font-semibold tracking-[-0.025em]">
          Saved addresses
        </h2>

        <p className="mt-1 text-sm text-black/45">
          Select a saved address for faster checkout.
        </p>
      </div>


      <div className="mt-6 space-y-3">

        {addresses.map((address) => (

          <label
            key={address.id}
            className="flex cursor-pointer gap-4 rounded-2xl border border-black/10 p-5 transition hover:border-black"
          >

            <input
              type="radio"
              name="savedAddress"
              className="mt-1 h-4 w-4"
            />


            <div className="text-sm">

              <p className="font-semibold uppercase tracking-wide">
                {address.label}
              </p>


              <p className="mt-2 text-black/60">
                {address.firstName} {address.lastName}
              </p>


              <p className="text-black/60">
                {address.address1}
              </p>


              <p className="text-black/60">
                {address.city} {address.state} {address.postcode}
              </p>


              <p className="text-black/60">
                {address.country}
              </p>

            </div>

          </label>

        ))}

      </div>

    </section>

  );

}
TS


echo "✓ Saved address selector created"


# --------------------------------------------------
# PATCH CHECKOUT CLIENT IMPORT
# --------------------------------------------------

python3 <<'PY'

from pathlib import Path

path = Path("app/checkout/CheckoutClient.tsx")

text = path.read_text()


if 'SavedAddressSelector' not in text:

    text = text.replace(
        'import ExpressCheckout from "./components/ExpressCheckout";',
        'import ExpressCheckout from "./components/ExpressCheckout";\nimport SavedAddressSelector from "./components/SavedAddressSelector";'
    )


path.write_text(text)

print("✓ Checkout import added")

PY


# --------------------------------------------------
# INSERT COMPONENT INTO CHECKOUT
# --------------------------------------------------

python3 <<'PY'

from pathlib import Path

path = Path("app/checkout/CheckoutClient.tsx")

text = path.read_text()


if "<SavedAddressSelector />" not in text:

    marker = """
            <section className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.05)] sm:p-8">
"""

    replacement = """
            <SavedAddressSelector />

            <section className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.05)] sm:p-8">
"""


    if marker in text:
        text = text.replace(marker, replacement, 1)
    else:
        print("Warning: checkout insertion point not found")

path.write_text(text)

PY


echo "✓ Checkout integration added"


# --------------------------------------------------
# FORMAT + VERIFY
# --------------------------------------------------

npx prisma format >/dev/null || true

npm run lint


echo ""
echo "========================================"
echo "BUILD 041D.1 COMPLETE"
echo "========================================"

