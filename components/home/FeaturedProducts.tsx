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
    <section className="mx-auto max-w-7xl px-8 py-24">
      <div className="flex items-center justify-between">
        <div>
          <p className="uppercase tracking-[0.3em] text-neutral-500">Featured</p>

          <h2 className="mt-3 text-5xl font-black">New Arrivals</h2>
        </div>

        <Link href="/shop" className="font-semibold">
          View All →
        </Link>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <Link href="/shop" key={product.title} className="group">
            <div className="overflow-hidden rounded-3xl bg-neutral-100">
              <img
                src={product.image}
                alt={product.title}
                className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110"
              />
            </div>

            <h3 className="mt-6 text-xl font-semibold">{product.title}</h3>

            <p className="mt-2 text-neutral-500">{product.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
