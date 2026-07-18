export function validatePaymentIntentId(id: string) {
  if (!id || id.trim().length === 0) {
    throw new Error("Payment Intent ID is required.");
  }
}
