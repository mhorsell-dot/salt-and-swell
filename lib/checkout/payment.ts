export interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
}

export async function createPaymentIntent(
  payload: CreatePaymentIntentRequest,
): Promise<CreatePaymentIntentResponse> {
  const response = await fetch("/api/stripe/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Unable to create payment intent.");
  }

  return response.json();
}
