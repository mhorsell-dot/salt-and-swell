import { prisma } from "@/lib/prisma";

export async function processSuccessfulPayment(
  paymentIntentId: string
) {
  const order = await prisma.order.findFirst({
    where: {
      paymentIntentId,
    },
    include: {
      items: true,
    },
  });

  if (!order) {
    throw new Error(
      `Order not found for Payment Intent ${paymentIntentId}`
    );
  }

  await prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      status: "PAID",
      paymentStatus: "PAID",
      paidAt: new Date(),
    },
  });

  await prisma.orderEvent.create({
    data: {
      orderId: order.id,
      event: "PAYMENT_RECEIVED",
      message: "Payment successfully received from Stripe.",
    },
  });

  return order;
}
