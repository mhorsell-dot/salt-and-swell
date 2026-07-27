import Image from "next/image";
import Link from "next/link";

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-40">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-20 text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-neutral-500">New Arrival</p>

          <h2 className="text-5xl font-extralight md:text-7xl">The Essential Collection</h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
            Timeless coastal essentials designed to become part of your everyday wardrobe.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/products/product-1.png"
              alt="Essential Collection"
              fill
              className="object-cover transition duration-700 hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="uppercase tracking-[0.45em] text-xs text-neutral-500">Quiet Luxury</p>

            <h3 className="mt-6 text-5xl font-extralight leading-tight">
              Made for life
              <br />
              by the sea.
            </h3>

            <p className="mt-10 max-w-lg text-lg leading-8 text-neutral-600">
              Clean silhouettes, premium fabrics and timeless colours. Clothing you&apos;ll wear for
              years—not just a season.
            </p>

            <Link
              href="/shop"
              className="mt-12 inline-flex w-fit border border-black px-10 py-4 uppercase tracking-[0.3em] text-sm transition hover:bg-black hover:text-white"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
