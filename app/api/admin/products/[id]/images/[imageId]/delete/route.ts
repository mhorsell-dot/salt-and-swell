import { unlink } from "fs/promises";
import path from "path";
import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { redirectTo } from "@/lib/publicOrigin";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
    imageId: string;
  }>;
};

export async function POST(request: NextRequest, context: RouteContext) {
  const { id: productId, imageId } = await context.params;

  try {
    const image = await prisma.productImage.findFirst({
      where: {
        id: imageId,
        productId,
      },
    });

    if (!image) {
      return redirectTo(request, `/admin/products/${productId}/images?error=image-not-found`);
    }

    await prisma.productImage.delete({
      where: {
        id: image.id,
      },
    });

    if (image.url.startsWith("/uploads/")) {
      const relativePath = image.url.replace(/^\/+/, "");
      const absolutePath = path.join(process.cwd(), "public", relativePath);

      try {
        await unlink(absolutePath);
      } catch {
        console.warn(`Image file could not be removed: ${absolutePath}`);
      }
    }

    const remainingImages = await prisma.productImage.findMany({
      where: {
        productId,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    await prisma.$transaction(
      remainingImages.map((remainingImage, index) =>
        prisma.productImage.update({
          where: {
            id: remainingImage.id,
          },
          data: {
            sortOrder: index,
          },
        }),
      ),
    );

    return redirectTo(request, `/admin/products/${productId}/images?deleted=1`);
  } catch (error: unknown) {
    console.error("Image deletion failed:", error);

    return redirectTo(request, `/admin/products/${productId}/images?error=server`);
  }
}
