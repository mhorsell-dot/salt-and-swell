import Image from "next/image";
import Link from "next/link";
import { SectionHeader, Container } from "@/components/ui";

const articles = [
  {
    title: "The Perfect Coastal Weekend",
    category: "Lifestyle",
    read: "5 min read",
    image: "/images/journal/coastal-weekend.webp",
    href: "/journal/perfect-coastal-weekend",
  },
  {
    title: "Why Heavyweight Hoodies Last Longer",
    category: "Product",
    read: "3 min read",
    image: "/images/journal/heavyweight-hoodie.webp",
    href: "/journal/heavyweight-hoodies",
  },
  {
    title: "Morning Coffee Before First Light",
    category: "Stories",
    read: "4 min read",
    image: "/images/journal/morning-coffee.webp",
    href: "/journal/morning-coffee",
  },
];

export default function Journal() {
  const [featured, ...secondary] = articles;

  return (
    <section className="bg-[#F7F5F0] py-32">
      <Container>
        <SectionHeader
          eyebrow="Journal"
          title="Stories From The Coast."
          description="A collection of stories, inspiration and behind-the-scenes moments from the Salt & Swell lifestyle."
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-12">
          <Link
            href={featured.href}
            className="group relative overflow-hidden rounded-[32px] lg:col-span-7"
          >
            <div className="relative h-[620px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-10 text-white">
                <p className="text-xs uppercase tracking-[0.3em]">
                  {featured.category} • {featured.read}
                </p>
                <h3 className="mt-4 text-4xl font-black">{featured.title}</h3>
              </div>
            </div>
          </Link>

          <div className="flex flex-col gap-8 lg:col-span-5">
            {secondary.map((article) => (
              <Link
                key={article.title}
                href={article.href}
                className="group overflow-hidden rounded-[32px] bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative h-64">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                    {article.category} • {article.read}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold">{article.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/journal"
            className="inline-flex rounded-full border border-black px-8 py-4 font-semibold transition hover:bg-black hover:text-white"
          >
            View All Stories
          </Link>
        </div>
      </Container>
    </section>
  );
}
