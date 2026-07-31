"use client";

import { useState } from "react";

export default function AddressForm() {
  const [loading, setLoading] = useState(false);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const form = new FormData(e.currentTarget);

    await fetch("/api/account/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(form)),
    });

    window.location.reload();
  }

  return (
    <form onSubmit={save} className="rounded-3xl bg-white p-8 space-y-4">
      <h2 className="text-xl font-semibold">Add Address</h2>

      <input name="label" placeholder="Label" className="border p-3 w-full rounded-xl" />

      <input name="firstName" placeholder="First name" className="border p-3 w-full rounded-xl" />

      <input name="lastName" placeholder="Last name" className="border p-3 w-full rounded-xl" />

      <input name="address1" placeholder="Address" className="border p-3 w-full rounded-xl" />

      <input name="city" placeholder="City" className="border p-3 w-full rounded-xl" />

      <input name="state" placeholder="State" className="border p-3 w-full rounded-xl" />

      <input name="postcode" placeholder="Postcode" className="border p-3 w-full rounded-xl" />

      <label className="flex gap-2">
        <input type="checkbox" name="isDefault" />
        Default address
      </label>

      <button disabled={loading} className="rounded-full bg-black px-6 py-3 text-white">
        {loading ? "Saving..." : "Save Address"}
      </button>
    </form>
  );
}
