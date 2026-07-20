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

  async markPaid(orderId: string) {
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

  async upsertPayment(order: unknown, paymentIntentId: string) {
    return prisma.payment.upsert({
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
  },

  async createTimeline(orderId: string) {
    return prisma.orderEvent.create({
      data: {
        orderId,
        event: "PAYMENT_RECEIVED",
        message: "Payment successfully received.",
      },
    });
  },

  transaction: prisma.$transaction.bind(prisma),
};
