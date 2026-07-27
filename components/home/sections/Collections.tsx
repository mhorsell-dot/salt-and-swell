import Image from "next/image";
import Link from "next/link";

import { Container, SectionHeader } from "@/components/ui";

const collections = [
  {
    title: "Men",
    description: "Built for cool mornings, salt air and everyday adventure.",
    image: "/images/collections/mens.png",
    href: "/shop/gender/mens",
  },
  {
    title: "Women",
    description: "Timeless coastal essentials with effortless style.",
    image: "/images/collections/womens.png",
    href: "/shop/gender/womens",
  },
  {
    title: "Accessories",
    description: "Complete every journey with premium coastal essentials.",
    image: "/images/collections/accessories.png",
    href: "/shop/category/accessories",
  },
];

export default function Collections() {
  return (
    <section className="bg-[#F7F5F0] py-32">
      <Container>
        <SectionHeader
          eyebrow="Collections"
          title="Crafted For Every Coastal Moment."
          description="Designed to move effortlessly from sunrise sessions to slow afternoons by the sea."
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-12">
          {collections.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className={`
                group
                relative
                overflow-hidden
                rounded-[32px]
                ${index === 0 ? "lg:col-span-6" : "lg:col-span-3"}
              `}
            >
              <div className="relative h-[720px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width:1024px)100vw,50vw"
                  className="object-cover transition duration-[1400ms] group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-10">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                    Salt &amp; Swell
                  </p>

                  <h3 className="mt-3 text-4xl font-bold text-white">{item.title}</h3>

                  <p className="mt-4 max-w-sm text-base leading-7 text-white/85">
                    {item.description}
                  </p>

                  <div className="mt-8">
                    <span className="inline-flex rounded-full bg-white px-8 py-3 font-semibold text-black transition-all duration-300 group-hover:bg-black group-hover:text-white">
                      Shop Collection
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
