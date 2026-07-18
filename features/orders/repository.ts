import { prisma } from "@/lib/prisma";

export const orderRepository = {
  findByPaymentIntent(paymentIntentId: string) {
    return prisma.order.findFirst({
      where: {
        paymentIntentId,
      },
      include: {
        items: true,
      },
    });
  },

  markPaid(orderId: string) {
    return prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "PAID",
        paymentStatus: "PAID",
        paidAt: new Date(),
      },
    });
  },

  createOrderEvent(orderId: string) {
    return prisma.orderEvent.create({
      data: {
        orderId,
        event: "PAYMENT_RECEIVED",
        message: "Payment successfully received.",
      },
    });
  },
};
