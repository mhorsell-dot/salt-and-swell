import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";

import ProductLayout from "@/components/product/ProductLayout";
import ProductGallery from "@/components/storefront/ProductGallery";
import StickyPurchasePanel from "@/components/product/StickyPurchasePanel";
import ProductFeatures from "@/components/product/ProductFeatures";

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

  const uiProduct = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: Number(product.price),
    collection: product.collectionId ?? "",
    description: product.description ?? "",
    images: galleryImages.map((i) => i.url),
    colours: [],
    sizes: ["S", "M", "L", "XL"],
    featured: product.featured ?? false,
    badge: undefined,
  };

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
        purchase={<StickyPurchasePanel product={uiProduct} />}
      />

      <div className="mx-auto max-w-[1600px] px-6 pb-24">
        <ProductFeatures />
      </div>
    </>
  );
}
