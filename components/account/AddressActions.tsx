"use client";

export default function AddressActions({ id, isDefault }: { id: string; isDefault: boolean }) {
  async function remove() {
    await fetch(`/api/account/addresses/${id}`, {
      method: "DELETE",
    });

    window.location.reload();
  }

  async function makeDefault() {
    await fetch(`/api/account/addresses/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isDefault: true,
      }),
    });

    window.location.reload();
  }

  return (
    <div className="mt-6 flex gap-3">
      {!isDefault && (
        <button onClick={makeDefault} className="rounded-full border px-4 py-2 text-sm">
          Make Default
        </button>
      )}

      <button onClick={remove} className="rounded-full bg-black px-4 py-2 text-sm text-white">
        Delete
      </button>
    </div>
  );
}
