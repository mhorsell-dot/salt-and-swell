import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const priceValue = String(formData.get("price") ?? "").trim();
    const categoryId = String(formData.get("categoryId") ?? "").trim();
    const collectionId = String(formData.get("collectionId") ?? "").trim();

    const active = formData.get("active") === "on";
    const featured = formData.get("featured") === "on";

    if (!name) {
      return NextResponse.redirect(new URL("/admin/products/new?error=name", request.url), 303);
    }

    if (!description) {
      return NextResponse.redirect(
        new URL("/admin/products/new?error=description", request.url),
        303,
      );
    }

    const price = Number(priceValue);

    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.redirect(new URL("/admin/products/new?error=price", request.url), 303);
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

    return NextResponse.redirect(
      new URL(`/admin/products/${product.id}?created=1`, request.url),
      303,
    );
  } catch (error: unknown) {
    console.error("Product creation failed:", error);

    return NextResponse.redirect(new URL("/admin/products/new?error=server", request.url), 303);
  }
}
