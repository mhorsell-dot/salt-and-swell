"use client";

import { useState } from "react";

export default function StatusButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  async function updateStatus() {
    setLoading(true);

    await fetch(`/api/admin/orders/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "PACKED",
      }),
    });

    setLoading(false);

    window.location.reload();
  }

  return (
    <button
      onClick={updateStatus}
      disabled={loading}
      className="rounded-full bg-black px-6 py-3 text-white"
    >
      {loading ? "Updating..." : "Mark Packed"}
    </button>
  );
}
