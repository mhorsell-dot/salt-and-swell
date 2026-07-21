"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BuyAgainButton({ orderId }: { orderId: string }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState<string | null>(null);

  const [unavailable, setUnavailable] = useState<
    {
      name: string;
      reason: string;
    }[]
  >([]);

  async function buyAgain() {
    setLoading(true);

    setMessage(null);

    setUnavailable([]);

    try {
      const response = await fetch(`/api/account/orders/${orderId}/reorder`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage("Unable to rebuild your order.");

        return;
      }

      localStorage.setItem("salt_swell_reorder", JSON.stringify(data.items));

      if (data.unavailable?.length) {
        setUnavailable(data.unavailable);
      }

      setMessage(
        `${data.items.length} item${data.items.length === 1 ? "" : "s"} added to your cart`,
      );

      setTimeout(() => {
        router.push("/cart");
      }, 1800);
    } catch (error) {
      console.error(error);

      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={buyAgain}
        disabled={loading}
        className="
          rounded-full
          bg-black
          px-7
          py-3
          text-sm
          font-semibold
          text-white
          disabled:opacity-50
        "
      >
        {loading ? "Rebuilding order..." : "Buy Again"}
      </button>

      {message && (
        <div className="mt-4 rounded-2xl bg-white p-4 text-sm">
          <p className="font-semibold">{message}</p>

          {unavailable.length > 0 && (
            <div className="mt-3 text-black/60">
              <p className="font-semibold">Some items are unavailable:</p>

              {unavailable.map((item) => (
                <p key={item.name}>
                  • {item.name} — {item.reason}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
