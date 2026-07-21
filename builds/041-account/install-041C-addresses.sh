#!/usr/bin/env bash
set -e

echo "========================================"
echo "BUILD 041C.3"
echo "Customer Address Management"
echo "========================================"

cat > app/account/addresses/page.tsx <<'TS'
import Link from "next/link";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

const DEMO_CUSTOMER_ID = "demo-customer";


export default async function AddressesPage() {

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


  return (
    <main className="mx-auto max-w-5xl px-6 py-32">

      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
        My Account
      </p>

      <h1 className="mt-4 text-5xl font-black tracking-tight">
        Addresses
      </h1>


      <div className="mt-12 grid gap-6 md:grid-cols-2">


        {addresses.length === 0 && (

          <div className="rounded-3xl border border-black/10 p-8">

            <h2 className="text-xl font-bold">
              No saved addresses
            </h2>

            <p className="mt-3 text-sm text-black/50">
              Add an address to make checkout faster.
            </p>

          </div>

        )}



        {addresses.map((address) => (

          <article
            key={address.id}
            className="rounded-3xl border border-black/10 p-8"
          >

            <div className="flex items-center justify-between">

              <h2 className="text-lg font-bold uppercase tracking-wide">
                {address.label}
              </h2>


              {address.isDefault && (

                <span className="rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Default
                </span>

              )}

            </div>


            <div className="mt-6 text-sm leading-7 text-black/70">

              <p>
                {address.firstName} {address.lastName}
              </p>

              {address.company && (
                <p>{address.company}</p>
              )}

              <p>
                {address.address1}
              </p>

              {address.address2 && (
                <p>{address.address2}</p>
              )}

              <p>
                {address.city} {address.state} {address.postcode}
              </p>

              <p>
                {address.country}
              </p>

            </div>


            <div className="mt-8 flex gap-5 text-sm font-bold">

              <button>
                Edit
              </button>

              <button className="text-red-700">
                Delete
              </button>

            </div>


          </article>

        ))}


      </div>



      <Link
        href="#"
        className="mt-10 inline-flex rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white"
      >
        + Add New Address
      </Link>


    </main>
  );
}
TS


echo "Address page created"

