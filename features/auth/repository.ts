import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const authRepository = {
  findByEmail(email: string) {
    return prisma.customer.findUnique({
      where: {
        email,
      },
    });
  },

  createCustomer(data: Prisma.CustomerCreateInput) {
    return prisma.customer.create({
      data,
    });
  },

  updateLastLogin(id: string) {
    return prisma.customer.update({
      where: {
        id,
      },
      data: {
        lastLoginAt: new Date(),
      },
    });
  },
};
