"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createProduct(data: {
  name: string;
  slug: string;
  description: string;
  price: number;
}) {
  await prisma.product.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/admin/products");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/admin/products");
}
