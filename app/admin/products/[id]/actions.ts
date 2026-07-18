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

async function createUniqueSlug(name: string, currentProductId: string): Promise<string> {
  const baseSlug = createBaseSlug(name) || `product-${Date.now()}`;

  let slug = baseSlug;
  let suffix = 2;

  while (true) {
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existingProduct || existingProduct.id === currentProductId) {
      return slug;
    }

    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

export async function updateProductAction(formData: FormData) {
  const productId = String(formData.get("productId") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const priceValue = String(formData.get("price") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const collectionId = String(formData.get("collectionId") ?? "").trim();

  const active = formData.get("active") === "on";
  const featured = formData.get("featured") === "on";

  if (!productId) {
    throw new Error("Product ID is missing.");
  }

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

  const existingProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
    },
  });

  if (!existingProduct) {
    throw new Error("Product could not be found.");
  }

  const slug = await createUniqueSlug(name, productId);

  await prisma.product.update({
    where: {
      id: productId,
    },
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

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath(`/shop/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);

  redirect(`/admin/products/${productId}?saved=1`);
}

export async function deleteProductAction(formData: FormData) {
  const productId = String(formData.get("productId") ?? "").trim();

  if (!productId) {
    throw new Error("Product ID is missing.");
  }

  const orderItemCount = await prisma.orderItem.count({
    where: {
      productId,
    },
  });

  if (orderItemCount > 0) {
    throw new Error("This product has existing order history and cannot be deleted.");
  }

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin");
  revalidatePath("/admin/products");

  redirect("/admin/products?deleted=1");
}
