import { prisma } from "@/lib/prisma";
import { ProductInput } from "@/lib/validators/product";

export async function getProducts() {
  return prisma.product.findMany({
    include: {
      images: true,
      variants: true,
      category: true,
      collection: true,
    },
    orderBy: {
      createdAt: "desc",
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
      variants: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      images: true,
      variants: true,
      category: true,
      collection: true,
      reviews: true,
    },
  });
}

export async function createProduct(data: ProductInput) {
  return prisma.product.create({
    data,
  });
}

export async function updateProduct(id: string, data: Partial<ProductInput>) {
  return prisma.product.update({
    where: { id },
    data,
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id },
  });
}
