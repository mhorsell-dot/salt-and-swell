import { prisma } from "@/lib/prisma";

export async function processSuccessfulPayment(paymentIntentId: string) {
  const order = await prisma.order.findFirst({
    where: {
      paymentIntentId,
    },
    include: {
      items: true,
    },
  });

  if (!order) {
    throw new Error(`Order not found for Payment Intent ${paymentIntentId}`);
  }

  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: "PAID",
        paymentStatus: "PAID",
        paidAt: new Date(),
      },
    });

    await tx.orderEvent.create({
      data: {
        orderId: order.id,
        event: "PAYMENT_RECEIVED",
        message: "Payment successfully received from Stripe.",
      },
    });

    if (order.paymentIntentId) {
      await tx.payment.upsert({
        where: {
          orderId: order.id,
        },
        update: {
          status: "PAID",
          providerReference: paymentIntentId,
          transactionDate: new Date(),
        },
        create: {
          orderId: order.id,
          method: "STRIPE",
          amount: order.total,
          status: "PAID",
          providerReference: paymentIntentId,
          transactionDate: new Date(),
        },
      });
    }
  });

  return order;
}
