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

export default function SavedAddressSelector({
  onSelect,
}: {
  onSelect: (address: Address) => void;
}) {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    fetch("/api/account/addresses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAddresses(data);
        }
      })
      .catch(() => setAddresses([]));
  }, []);

  if (addresses.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Saved addresses</h2>

      <p className="mt-1 text-sm text-black/45">Select an address for faster checkout.</p>

      <div className="mt-6 space-y-3">
        {addresses.map((address) => (
          <label
            key={address.id}
            className="flex cursor-pointer gap-4 rounded-2xl border p-5 hover:border-black"
          >
            <input type="radio" name="savedAddress" onChange={() => onSelect(address)} />

            <div>
              <p className="font-semibold uppercase">{address.label}</p>

              <p className="mt-2 text-sm text-black/60">
                {address.firstName} {address.lastName}
              </p>

              <p className="text-sm text-black/60">{address.address1}</p>

              <p className="text-sm text-black/60">
                {address.city} {address.state} {address.postcode}
              </p>
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
