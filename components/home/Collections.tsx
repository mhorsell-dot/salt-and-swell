import Link from "next/link";

const cards = [
  {
    title: "MEN",
    image: "/images/collections-men.jpg",
    link: "/collections/mens",
  },
  {
    title: "WOMEN",
    image: "/images/collections-women.jpg",
    link: "/collections/womens",
  },
];

export default function Collections() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-24">
      <div className="grid gap-10 md:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.link}
            className="group relative overflow-hidden rounded-3xl"
          >
            <img
              src={card.image}
              className="h-[650px] w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute bottom-12 left-12">
              <h2 className="text-5xl font-black text-white">{card.title}</h2>

              <p className="mt-4 text-white">Shop Collection →</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
