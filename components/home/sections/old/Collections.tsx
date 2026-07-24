import Link from "next/link";

const collections = [
  {
    title: "MEN",
    image: "/images/collections/mens.png",
    href: "/collections/mens",
  },
  {
    title: "WOMEN",
    image: "/images/collections/womens.png",
    href: "/collections/womens",
  },
];

export default function Collections() {
  return (
    <section className="bg-white">

      {collections.map((collection) => (
        <Link
          key={collection.title}
          href={collection.href}
          className="group relative block h-[90vh] overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition duration-[3000ms] group-hover:scale-105"
            style={{
              backgroundImage: `url(${collection.image})`,
            }}
          />

          <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/20" />

          <div className="relative z-10 flex h-full items-end px-10 pb-16 md:px-20">

            <div>

              <p className="mb-4 text-xs uppercase tracking-[0.45em] text-white/70">
                COLLECTION
              </p>

              <h2 className="text-6xl font-black tracking-[-0.05em] text-white md:text-8xl">
                {collection.title}
              </h2>

              <span className="mt-8 inline-block border-b border-white pb-2 text-sm uppercase tracking-[0.25em] text-white">
                Explore Collection
              </span>

            </div>

          </div>

        </Link>
      ))}

    </section>
  );
}
