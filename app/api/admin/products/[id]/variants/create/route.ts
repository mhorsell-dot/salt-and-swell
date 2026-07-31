import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { redirectTo } from "@/lib/publicOrigin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function cleanSku(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, "-");
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { id: productId } = await context.params;

  try {
    const formData = await request.formData();

    const size = String(formData.get("size") ?? "").trim();
    const colour = String(formData.get("colour") ?? "").trim();
    const sku = cleanSku(String(formData.get("sku") ?? ""));
    const inventoryValue = String(formData.get("inventory") ?? "").trim();

    const inventory = Number(inventoryValue);

    if (!size) {
      return redirectTo(request, `/admin/products/${productId}/variants?error=size`);
    }

    if (!colour) {
      return redirectTo(request, `/admin/products/${productId}/variants?error=colour`);
    }

    if (!sku) {
      return redirectTo(request, `/admin/products/${productId}/variants?error=sku`);
    }

    if (!Number.isInteger(inventory) || inventory < 0) {
      return redirectTo(request, `/admin/products/${productId}/variants?error=inventory`);
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
      },
    });

    if (!product) {
      return redirectTo(request, "/admin/products?error=product-not-found");
    }

    const existingSku = await prisma.productVariant.findUnique({
      where: {
        sku,
      },
      select: {
        id: true,
      },
    });

    if (existingSku) {
      return redirectTo(request, `/admin/products/${productId}/variants?error=sku-exists`);
    }

    await prisma.productVariant.create({
      data: {
        productId,
        size,
        colour,
        sku,
        inventory,
      },
    });

    return redirectTo(request, `/admin/products/${productId}/variants?created=1`);
  } catch (error: unknown) {
    console.error("Variant creation failed:", error);

    return redirectTo(request, `/admin/products/${productId}/variants?error=server`);
  }
}
