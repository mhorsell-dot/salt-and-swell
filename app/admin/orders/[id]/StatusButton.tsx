"use client";

import { useState } from "react";

const statuses = ["PAID", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function StatusButton({ id, currentStatus }: { id: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function updateStatus() {
    setLoading(true);

    await fetch(`/api/admin/orders/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    });

    setLoading(false);

    window.location.reload();
  }

  return (
    <div className="flex gap-3 items-center">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-lg border px-4 py-2"
      >
        {statuses.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      <button
        onClick={updateStatus}
        disabled={loading}
        className="rounded-lg bg-black px-5 py-2 text-white"
      >
        {loading ? "Saving..." : "Update Status"}
      </button>
    </div>
  );
}
