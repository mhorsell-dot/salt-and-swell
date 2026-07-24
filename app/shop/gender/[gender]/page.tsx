import { notFound } from "next/navigation";

import CategoryHero from "@/components/shop/CategoryHero";
import CategoryToolbar from "@/components/shop/CategoryToolbar";
import CategoryFilters from "@/components/shop/CategoryFilters";
import LiveProductGrid from "@/components/storefront/LiveProductGrid";

const pages = {
  mens: {
    title: "Men",
    gender: "MENS",
    description:
      "Premium coastal apparel built for everyday adventures and life beside the ocean.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=80",
  },
  womens: {
    title: "Women",
    gender: "WOMENS",
    description:
      "Timeless coastal essentials inspired by salt, sun and endless summer.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=80",
  },
  unisex: {
    title: "Unisex",
    gender: "UNISEX",
    description:
      "Versatile pieces designed for everyone.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1800&q=80",
  },
} as const;

export default async function Page({
  params,
}: {
  params: Promise<{ gender: string }>;
}) {
  const { gender } = await params;

  const page = pages[gender as keyof typeof pages];

  if (!page) notFound();

  return (
    <main className="min-h-screen bg-[#f5f3ee]">
      <CategoryHero
        eyebrow="Salt & Swell"
        title={page.title}
        description={page.description}
        image={page.image}
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <CategoryToolbar
          title={page.title}
          productCount={0}
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-[280px_1fr]">
          <CategoryFilters />

          <LiveProductGrid
            gender={page.gender}
          />
        </div>
      </section>
    </main>
  );
}
