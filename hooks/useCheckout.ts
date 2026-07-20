"use client";

import { useEffect, useState } from "react";
import { createPaymentIntent } from "@/lib/checkout/payment";

export function useCheckout(total: number) {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function initialise() {
      try {
        const result = await createPaymentIntent({
          amount: Math.round(total * 100),
        });

        if (!cancelled) {
          setClientSecret(result.clientSecret);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (total > 0) {
      initialise();
    } else {
      return;
    }

    return () => {
      cancelled = true;
    };
  }, [total]);

  return {
    clientSecret,
    loading,
  };
}
