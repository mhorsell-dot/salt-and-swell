"use client";

import { useState } from "react";

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

export default function EditAddress({ address }: { address: Address }) {
  const [open, setOpen] = useState(false);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    await fetch(`/api/account/addresses/${address.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    window.location.reload();
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="rounded-full border px-4 py-2 text-sm">
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
          <form onSubmit={save} className="w-full max-w-lg rounded-3xl bg-white p-8 space-y-4">
            <h2 className="text-2xl font-semibold">Edit Address</h2>

            <input
              name="label"
              defaultValue={address.label}
              className="w-full rounded-xl border p-3"
            />

            <input
              name="firstName"
              defaultValue={address.firstName}
              className="w-full rounded-xl border p-3"
            />

            <input
              name="lastName"
              defaultValue={address.lastName}
              className="w-full rounded-xl border p-3"
            />

            <input
              name="address1"
              defaultValue={address.address1}
              className="w-full rounded-xl border p-3"
            />

            <input
              name="city"
              defaultValue={address.city}
              className="w-full rounded-xl border p-3"
            />

            <input
              name="state"
              defaultValue={address.state}
              className="w-full rounded-xl border p-3"
            />

            <input
              name="postcode"
              defaultValue={address.postcode}
              className="w-full rounded-xl border p-3"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border px-5 py-3"
              >
                Cancel
              </button>

              <button className="rounded-full bg-black px-5 py-3 text-white">Save Changes</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
