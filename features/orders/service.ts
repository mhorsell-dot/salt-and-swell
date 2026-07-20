import { orderRepository } from "./repository";
import { validatePaymentIntentId } from "./validation";

export async function processSuccessfulPayment(paymentIntentId: string) {
  validatePaymentIntentId(paymentIntentId);

  const order = await orderRepository.findByPaymentIntent(paymentIntentId);

  if (!order) {
    throw new Error(`Order not found for Payment Intent ${paymentIntentId}`);
  }

  await orderRepository.transaction(async () => {
    await orderRepository.markPaid(order.id);

    await orderRepository.upsertPayment(order, paymentIntentId);

    await orderRepository.createTimeline(order.id);
  });

  return order;
}
