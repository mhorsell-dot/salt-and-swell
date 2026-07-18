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
};
