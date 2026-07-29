import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";

import ProductLayout from "@/components/product/ProductLayout";
import ProductFeatures from "@/components/product/ProductFeatures";
import ProductGallery from "@/components/storefront/ProductGallery";
import ProductPurchasePanel from "@/components/storefront/ProductPurchasePanel";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
      variants: {
        orderBy: [{ colour: "asc" }, { size: "asc" }],
      },
    },
  });

  if (!product) notFound();

  const galleryImages =
    product.images.length > 0
      ? product.images.map((image) => ({
          id: image.id,
          url: image.url,
          alt: image.alt ?? product.name,
        }))
      : [
          {
            id: "placeholder",
            url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
            alt: product.name,
          },
        ];

  return (
    <>
      <ProductLayout
        gallery={
          <ProductGallery
            productName={product.name}
            images={galleryImages}
            featured={product.featured ?? false}
          />
        }
        purchase={
          <ProductPurchasePanel
            product={{
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: Number(product.price),
              imageUrl: galleryImages[0].url,
            }}
            variants={product.variants}
          />
        }
      />

      <div className="mx-auto max-w-[1600px] px-6 pb-24">
        <ProductFeatures />
      </div>
    </>
  );
}
