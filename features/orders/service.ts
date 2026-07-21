import { orderRepository } from "./repository";
import { validatePaymentIntentId } from "./validation";
import { sendNotification } from "@/features/notifications";

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

  await sendNotification("ORDER_PAID", {
    customerEmail: order.emailSnapshot,
    customerName: "Customer",
    orderNumber: order.orderNumber,
  });

  await sendNotification("ORDER_PAID", {
    customerEmail: order.emailSnapshot,
    customerName: "Customer",
    orderNumber: order.orderNumber,
  });

  return order;
}
