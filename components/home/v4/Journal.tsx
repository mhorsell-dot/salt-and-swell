import Image from "next/image";

const posts = [
  {
    title: "Life By The Sea",
    image: "/images/lifestyle/banner.webp",
  },
  {
    title: "Quiet Luxury",
    image: "/images/collections/mens.webp",
  },
  {
    title: "Australian Coast",
    image: "/images/collections/womens.webp",
  },
];

export default function Journal() {
  return (
    <section className="bg-[#F7F5F0] py-40">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-20 text-center">
          <p className="uppercase tracking-[0.45em] text-xs text-neutral-500">Journal</p>

          <h2 className="mt-6 text-6xl font-extralight">Stories from the coast.</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-8 text-3xl font-light">{post.title}</h3>

              <p className="mt-4 uppercase tracking-[0.35em] text-xs text-neutral-500">
                Read Story →
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
