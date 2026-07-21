#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 036E"
echo "STRIPE PAYMENT CONFIRMATION"
echo "======================================"


cat > app/checkout/components/StripePaymentForm.tsx <<'TSX'
"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useRouter } from "next/navigation";


export default function StripePaymentForm() {

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState<string | null>(null);


  async function handleSubmit(
    event: React.FormEvent
  ){

    event.preventDefault();


    if(!stripe || !elements){
      return;
    }


    setLoading(true);
    setError(null);



    const result =
      await stripe.confirmPayment({

        elements,

        confirmParams:{
          return_url:
            `${window.location.origin}/account/orders`,
        },

        redirect:"if_required",

      });



    if(result.error){

      setError(
        result.error.message ||
        "Payment failed."
      );

      setLoading(false);

      return;

    }



    router.push("/account/orders");


  }



  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <PaymentElement />


      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}


      <button
        type="submit"
        disabled={!stripe || loading}
        className="flex h-14 w-full items-center justify-center rounded-full bg-[#171715] text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-black/80 disabled:opacity-50"
      >

        {loading
          ? "Processing payment..."
          : "Pay securely"
        }

      </button>


    </form>

  );

}
TSX


echo ""
echo "Stripe confirmation component created"

npm run lint || true


echo ""
echo "======================================"
echo "BUILD 036E COMPLETE"
echo "======================================"

