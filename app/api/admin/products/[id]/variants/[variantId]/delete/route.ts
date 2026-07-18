import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { redirectTo } from "@/lib/publicOrigin";

type RouteContext = {
  params: Promise<{
    id: string;
    variantId: string;
  }>;
};

export async function POST(request: NextRequest, context: RouteContext) {
  const { id: productId, variantId } = await context.params;

  try {
    const variant = await prisma.productVariant.findFirst({
      where: {
        id: variantId,
        productId,
      },
      select: {
        id: true,
      },
    });

    if (!variant) {
      return redirectTo(
        request,
        `/admin/products/${productId}/variants?error=variant-not-found`,
      );
    }

    await prisma.productVariant.delete({
      where: {
        id: variantId,
      },
    });

    return redirectTo(
      request,
      `/admin/products/${productId}/variants?deleted=1`,
    );
  } catch (error: unknown) {
    console.error("Variant deletion failed:", error);

    return redirectTo(
      request,
      `/admin/products/${productId}/variants?error=server`,
    );
  }
}
