import Link from "next/link";
import LiveProductGrid from "@/components/storefront/LiveProductGrid";

export default async function FeaturedProducts() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-[1800px] px-6">
        <div className="mb-14 flex items-end justify-between gap-8">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.45em] text-neutral-500">
              New Arrivals
            </p>

            <h2 className="text-5xl font-extralight tracking-tight md:text-6xl">
              Discover the Collection
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
              Premium coastal essentials designed to be worn every day, season after season.
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden border-b border-black pb-2 text-xs uppercase tracking-[0.35em] lg:block"
          >
            View All →
          </Link>
        </div>

        <LiveProductGrid limit={4} featured={true} showEmptyState={false} />
      </div>
    </section>
  );
}
