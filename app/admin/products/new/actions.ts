"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";

function createBaseSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function createUniqueSlug(name: string): Promise<string> {
  const baseSlug = createBaseSlug(name) || `product-${Date.now()}`;

  let slug = baseSlug;
  let suffix = 2;

  while (
    await prisma.product.findUnique({
      where: { slug },
      select: { id: true },
    })
  ) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export async function createProductAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const priceValue = String(formData.get("price") ?? "").trim();

  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const collectionId = String(formData.get("collectionId") ?? "").trim();

  const active = formData.get("active") === "on";
  const featured = formData.get("featured") === "on";

  if (!name) {
    throw new Error("Product name is required.");
  }

  if (!description) {
    throw new Error("Product description is required.");
  }

  const price = Number(priceValue);

  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Enter a valid product price.");
  }

  const slug = await createUniqueSlug(name);

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price: priceValue,
      active,
      featured,
      categoryId: categoryId || null,
      collectionId: collectionId || null,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath("/shop");

  redirect(`/admin/products/${product.id}`);
}
