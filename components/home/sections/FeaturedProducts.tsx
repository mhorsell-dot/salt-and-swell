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
    <section className="bg-white py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className={`${body.className} text-xs uppercase tracking-[0.35em] text-neutral-500`}>
              New Arrivals
            </p>

            <h2
              className={`${heading.className} mt-4 text-5xl leading-[1.05] text-neutral-900 md:text-6xl`}
            >
              Designed for
              <br />
              life by the coast.
            </h2>

            <p className={`${body.className} mt-6 text-lg leading-8 text-neutral-600`}>
              Timeless essentials inspired by slow mornings, salt air and everyday Australian
              living.
            </p>
          </div>

          <Button href="/shop">Shop All</Button>
        </div>

        <div className="mt-16">
          <LiveProductGrid featured limit={8} />
        </div>
      </Container>
    </section>
  );
}
