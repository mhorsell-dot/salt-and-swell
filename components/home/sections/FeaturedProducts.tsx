import Link from "next/link";

import {
  Button,
  Container,
  SectionHeader,
} from "@/components/ui";

import LiveProductGrid from "@/components/storefront/LiveProductGrid";

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-32">

      <Container>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

          <SectionHeader
            eyebrow="Best Sellers"
            title="Designed To Be Worn Every Day."
            description="Our favourite pieces, crafted for life beside the ocean."
          />

          <Button href="/shop">
            View All Products
          </Button>

        </div>

        <div className="mt-20">

          <LiveProductGrid
            featured
            limit={8}
          />

        </div>

      </Container>

    </section>
  );
}
