import { Cormorant_Garamond, Inter } from "next/font/google";

import { Button, Container } from "@/components/ui";
import LiveProductGrid from "@/components/storefront/LiveProductGrid";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const body = Inter({
  subsets: ["latin"],
});

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-36">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className={`${body.className} text-xs uppercase tracking-[0.35em] text-neutral-500`}>
              Featured Collection
            </p>

            <h2
              className={`${heading.className} mt-5 text-5xl leading-tight text-neutral-900 md:text-6xl`}
            >
              Designed For
              <br />
              Everyday Coastal Living.
            </h2>

            <p className={`${body.className} mt-8 max-w-2xl text-lg leading-8 text-neutral-600`}>
              Discover our most-loved pieces—premium apparel crafted for slow mornings, ocean air
              and weekends spent exploring the coast.
            </p>
          </div>

          <div>
            <Button href="/shop">Shop All Products</Button>
          </div>
        </div>

        <div className="mt-20">
          <LiveProductGrid featured limit={8} />
        </div>
      </Container>
    </section>
  );
}
