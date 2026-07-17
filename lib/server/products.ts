import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProducts() {
  return prisma.product.findMany({
    include: {
      images: true,
      category: true,
      collection: true,
      variants: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
      category: true,
      collection: true,
      variants: true,
      reviews: true,
    },
  });
}

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: {
      featured: true,
      active: true,
    },
    include: {
      images: true,
    },
    take: 8,
  });
}
