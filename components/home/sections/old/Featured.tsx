import Image from "next/image";
import Link from "next/link";

const products = [
  {
    title: "Essential Tee",
    price: "$59",
    image: "/mockups/product1.jpg",
  },
  {
    title: "Coastal Hoodie",
    price: "$99",
    image: "/mockups/product2.jpg",
  },
  {
    title: "Classic Cap",
    price: "$39",
    image: "/mockups/product3.jpg",
  },
  {
    title: "Beach Shorts",
    price: "$79",
    image: "/mockups/product4.jpg",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-8">

        <div className="mb-20 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-neutral-500">
              NEW ARRIVALS
            </p>

            <h2 className="mt-5 max-w-3xl text-5xl font-black tracking-[-0.05em] md:text-6xl">
              Made for mornings by the coast.
            </h2>
          </div>

          <Link
            href="/shop"
            className="hidden border-b border-black pb-2 text-sm uppercase tracking-[0.25em] md:block"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.title}
              href="/shop"
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl bg-neutral-100">

                <Image
                  src={product.image}
                  alt={product.title}
                  width={800}
                  height={1000}
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-end justify-center bg-black/0 transition group-hover:bg-black/15">
                  <span className="mb-8 translate-y-6 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Quick View
                  </span>
                </div>

              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold">
                  {product.title}
                </h3>

                <p className="mt-2 text-neutral-500">
                  {product.price}
                </p>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
