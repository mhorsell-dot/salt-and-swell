import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { redirectTo } from "@/lib/publicOrigin";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

const maximumFileSize = 8 * 1024 * 1024;

function getExtension(file: File): string {
  switch (file.type) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      return "";
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { id: productId } = await context.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!product) {
      return redirectTo(request, "/admin/products?error=product-not-found");
    }

    const formData = await request.formData();
    const uploadedFiles = formData.getAll("images");

    const files = uploadedFiles.filter(
      (entry): entry is File => entry instanceof File && entry.size > 0,
    );

    if (files.length === 0) {
      return redirectTo(
        request,
        `/admin/products/${productId}/images?error=no-files`,
      );
    }

    const invalidFile = files.find(
      (file) => !allowedMimeTypes.has(file.type) || file.size > maximumFileSize,
    );

    if (invalidFile) {
      return redirectTo(
        request,
        `/admin/products/${productId}/images?error=invalid-file`,
      );
    }

    const currentImageCount = await prisma.productImage.count({
      where: {
        productId,
      },
    });

    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "uploads",
      "products",
      productId,
    );

    await mkdir(uploadDirectory, {
      recursive: true,
    });

    for (const [index, file] of files.entries()) {
      const extension = getExtension(file);
      const filename = `${randomUUID()}.${extension}`;
      const absolutePath = path.join(uploadDirectory, filename);

      const bytes = await file.arrayBuffer();

      await writeFile(absolutePath, Buffer.from(bytes));

      const publicUrl = `/uploads/products/${productId}/${filename}`;

      await prisma.productImage.create({
        data: {
          productId,
          url: publicUrl,
          alt: product.name,
          sortOrder: currentImageCount + index,
        },
      });
    }

    return redirectTo(
      request,
      `/admin/products/${productId}/images?uploaded=1`,
    );
  } catch (error: unknown) {
    console.error("Image upload failed:", error);

    return redirectTo(
      request,
      `/admin/products/${productId}/images?error=server`,
    );
  }
}
