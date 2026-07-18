"use client";

import { PaymentElement } from "@stripe/react-stripe-js";

export default function StripePaymentForm() {
  return (
    <div className="space-y-6">
      <PaymentElement />
    </div>
  );
}
