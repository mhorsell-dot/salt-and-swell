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
        <h2 className="text-xl font-semibold tracking-[-0.025em]">Saved addresses</h2>

        <p className="mt-1 text-sm text-black/45">Select a saved address for faster checkout.</p>
      </div>

      <div className="mt-6 space-y-3">
        {addresses.map((address) => (
          <label
            key={address.id}
            className="flex cursor-pointer gap-4 rounded-2xl border border-black/10 p-5 transition hover:border-black"
          >
            <input type="radio" name="savedAddress" className="mt-1 h-4 w-4" />

            <div className="text-sm">
              <p className="font-semibold uppercase tracking-wide">{address.label}</p>

              <p className="mt-2 text-black/60">
                {address.firstName} {address.lastName}
              </p>

              <p className="text-black/60">{address.address1}</p>

              <p className="text-black/60">
                {address.city} {address.state} {address.postcode}
              </p>

              <p className="text-black/60">{address.country}</p>
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
