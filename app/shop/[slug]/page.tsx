import type { Metadata } from "next";
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";

import ProductLayout from "@/components/product/ProductLayout";
import ProductFeatures from "@/components/product/ProductFeatures";
import ProductGallery from "@/components/storefront/ProductGallery";
import ProductPurchasePanel from "@/components/storefront/ProductPurchasePanel";
import ProductInformation from "@/components/storefront/ProductInformation";
import RelatedProducts from "@/components/storefront/RelatedProducts";
import RecentlyViewedProducts from "@/components/storefront/RecentlyViewedProducts";
import TrackRecentlyViewed from "@/components/storefront/TrackRecentlyViewed";

async function getProduct(slug: string) {
  return prisma.product.findUnique({
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
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const image =
    product.images[0]?.url ??
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80";

  const description =
    product.description ?? "Premium Australian coastal apparel designed for everyday adventures.";

  return {
    title: product.name,
    description,

    alternates: {
      canonical: `/shop/${product.slug}`,
    },

    openGraph: {
      title: product.name,
      description,
      type: "website",
      url: `/shop/${product.slug}`,
      images: [
        {
          url: image,
          alt: product.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = await getProduct(slug);

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

  const trackedProduct = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: Number(product.price),
    imageUrl: galleryImages[0].url,
  };

  return (
    <>
      <TrackRecentlyViewed product={trackedProduct} />

      <ProductLayout
        gallery={
          <ProductGallery
            productName={product.name}
            images={galleryImages}
            featured={product.featured ?? false}
          />
        }
        purchase={<ProductPurchasePanel product={trackedProduct} variants={product.variants} />}
      />

      <div className="mx-auto max-w-7xl px-6 pb-12">
        <ProductFeatures />
        <ProductInformation />
      </div>

      <RelatedProducts
        productId={product.id}
        categoryId={product.categoryId}
        collectionId={product.collectionId}
      />

      <div className="mx-auto max-w-7xl px-6 pb-24">
        <RecentlyViewedProducts />
      </div>
    </>
  );
}
