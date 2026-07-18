import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { redirectTo } from "@/lib/publicOrigin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  try {
    const productCount = await prisma.product.count({
      where: {
        collectionId: id,
      },
    });

    if (productCount > 0) {
      return redirectTo(request, "/admin/collections?error=in-use");
    }

    await prisma.collection.delete({
      where: { id },
    });

    return redirectTo(request, "/admin/collections?deleted=1");
  } catch (error: unknown) {
    console.error("Collection deletion failed:", error);
    return redirectTo(request, "/admin/collections?error=server");
  }
}
