"use client";

import { useRouter } from "next/navigation";

export default function BuyAgainButton({ orderId }: { orderId: string }) {
  const router = useRouter();

  async function buyAgain() {
    const response = await fetch(`/api/account/orders/${orderId}/reorder`, {
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      return;
    }

    // store reorder items temporarily
    localStorage.setItem("salt_swell_reorder", JSON.stringify(data.items));

    router.push("/cart");
  }

  return (
    <button
      onClick={buyAgain}
      className="rounded-full bg-black px-7 py-3 text-sm font-semibold text-white"
    >
      Buy Again
    </button>
  );
}
