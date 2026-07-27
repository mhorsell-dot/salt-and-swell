import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Men",
    image: "/images/collections/mens.png",
    href: "/collections/mens",
  },
  {
    title: "Women",
    image: "/images/collections/womens.png",
    href: "/collections/womens",
  },
  {
    title: "Accessories",
    image: "/images/collections/accessories.png",
    href: "/collections/accessories",
  },
];

export default function Collections() {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto grid max-w-7xl gap-8 px-8 lg:grid-cols-3">
        {collections.map((item) => (
          <Link key={item.title} href={item.href} className="group overflow-hidden bg-neutral-100">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>

            <div className="flex items-center justify-between p-8">
              <h3 className="text-3xl font-light">{item.title}</h3>

              <span className="uppercase tracking-[0.35em] text-xs">Explore →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
