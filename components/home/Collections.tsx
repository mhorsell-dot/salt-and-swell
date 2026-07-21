import Link from "next/link";

const cards = [
  {
    title: "MEN",
    eyebrow: "Coastal Essentials",
    description: "Premium pieces designed for salt air, road trips and everyday adventures.",
    image: "/images/collections-men.jpg",
    link: "/collections/mens",
  },
  {
    title: "WOMEN",
    eyebrow: "Ocean Inspired",
    description: "Timeless styles inspired by the Australian coastline and slow living.",
    image: "/images/collections-women.jpg",
    link: "/collections/womens",
  },
];

export default function Collections() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-32">
      <div className="mb-16 max-w-3xl">
        <p
          className="
text-xs
uppercase
tracking-[0.45em]
text-neutral-500
"
        >
          Explore The Collections
        </p>

        <h2
          className="
mt-5
text-5xl
font-black
tracking-[-0.04em]
"
        >
          Designed for coastal living.
        </h2>

        <p
          className="
mt-6
text-lg
leading-relaxed
text-neutral-500
"
        >
          Discover timeless pieces created for mornings by the water, weekend escapes and everyday
          journeys.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.title}

            href={card.link}

            className="
group
relative
overflow-hidden
rounded-[2rem]
"
          >
            <img
              src={card.image}

              alt={card.title}

              className="
h-[700px]
w-full
object-cover
transition
duration-1000
group-hover:scale-105
"
            />

            <div
              className="
absolute
inset-0
bg-gradient-to-t
from-black/70
via-black/20
to-transparent
"
            />

            <div
              className="
absolute
bottom-12
left-12
right-12
text-white
"
            >
              <p
                className="
text-xs
uppercase
tracking-[0.4em]
text-white/70
"
              >
                {card.eyebrow}
              </p>

              <h3
                className="
mt-4
text-6xl
font-black
tracking-[-0.05em]
"
              >
                {card.title}
              </h3>

              <p
                className="
mt-5
max-w-md
text-lg
text-white/90
"
              >
                {card.description}
              </p>

              <span
                className="
mt-8
inline-block
rounded-full
border
border-white/50
px-7
py-3
text-sm
font-semibold
transition
group-hover:bg-white
group-hover:text-black
"
              >
                Discover Collection →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
