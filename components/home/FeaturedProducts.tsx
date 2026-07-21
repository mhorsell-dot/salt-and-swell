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
    <section className="mx-auto max-w-7xl px-8 py-32">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p
            className="
text-xs
uppercase
tracking-[0.45em]
text-neutral-500
"
          >
            The Essential Collection
          </p>

          <h2
            className="
mt-5
max-w-3xl
text-5xl
font-black
leading-tight
tracking-[-0.04em]
"
          >
            Designed for salt air, slow mornings and endless summers.
          </h2>

          <p
            className="
mt-6
max-w-xl
text-lg
leading-relaxed
text-neutral-500
"
          >
            Premium everyday pieces inspired by the Australian coastline and built for wherever the
            journey takes you.
          </p>
        </div>

        <Link
          href="/shop"
          className="
rounded-full
border
border-black
px-8
py-4
text-sm
font-semibold
transition
hover:bg-black
hover:text-white
"
        >
          Explore Collection →
        </Link>
      </div>

      <div
        className="
mt-16
grid
gap-10
sm:grid-cols-2
xl:grid-cols-4
"
      >
        {products.map((product) => (
          <Link href="/shop" key={product.title} className="group">
            <div
              className="
overflow-hidden
rounded-[2rem]
bg-neutral-100
"
            >
              <img
                src={product.image}

                alt={product.title}

                className="
aspect-[4/5]
w-full
object-cover
transition
duration-700
group-hover:scale-105
"
              />
            </div>

            <div className="mt-6">
              <h3
                className="
text-xl
font-semibold
tracking-tight
"
              >
                {product.title}
              </h3>

              <p
                className="
mt-2
text-neutral-500
"
              >
                {product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
