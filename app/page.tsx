import Link from "next/link";

import LiveProductGrid from "@/components/storefront/LiveProductGrid";
import { ArrowRight, Camera, Menu, Search, ShoppingBag, UserRound } from "lucide-react";

const journalPosts = [
  {
    title: "The Long Way South",
    category: "Road Journal",
    image:
      "https://images.unsplash.com/photo-1455729552865-3658a5d39692?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Made for Mornings Like These",
    category: "Salt Stories",
    image:
      "https://images.unsplash.com/photo-1455729552865-3658a5d39692?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Chasing Empty Lines",
    category: "Surf Culture",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1400&q=85",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#171715]">
      <Hero />

      <section className="border-b border-black/10 bg-[#f5f3ee]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-black/10 px-6 py-5 text-center text-xs font-semibold uppercase tracking-[0.2em] md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-10">
          <p className="py-3">Free delivery over $150</p>
          <p className="py-3">Designed on the Australian coast</p>
          <p className="py-3">Easy 30-day returns</p>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Latest drop"
            title="New Arrivals"
            description="Purposeful essentials shaped by salt air, endless summers and life lived beside the ocean."
            link="/shop"
            linkText="Shop all"
          />

          <LiveProductGrid limit={4} />
        </div>
      </section>

      <section className="grid min-h-[760px] lg:grid-cols-2">
        <EditorialCard
          href="/collections"
          eyebrow="For the shoreline"
          title="Tide Collection"
          buttonText="Explore the collection"
          image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=90"
        />

        <EditorialCard
          href="/collections"
          eyebrow="Built for the road"
          title="Coastal Utility"
          buttonText="Discover the range"
          image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=90"
        />
      </section>

      <section className="bg-[#182321] px-6 py-24 text-white sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
              Our philosophy
            </p>

            <h2 className="mt-6 max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Inspired by salt.
              <br />
              Built for the swell.
            </h2>

            <p className="mt-8 max-w-lg text-base leading-8 text-white/65">
              Salt &amp; Swell is an independent Australian coastal label creating considered
              apparel for people drawn to the ocean. Every piece is designed to feel effortless,
              honest and lived in.
            </p>

            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-3 border-b border-white pb-2 text-sm font-semibold uppercase tracking-[0.16em]"
            >
              Our story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div
            className="min-h-[600px] bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=90")',
            }}
          />
        </div>
      </section>

      <section
        className="relative flex min-h-[760px] items-end overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=2200&q=90")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 text-white sm:pb-24 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            Chasing the next line
          </p>

          <h2 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-8xl">
            Made for wherever the tide takes you.
          </h2>

          <Link
            href="/shop"
            className="mt-9 inline-flex h-12 items-center justify-center gap-3 bg-white px-7 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-white/85"
          >
            Shop the range
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Field notes"
            title="From the Journal"
            description="Stories from the road, the coast and the spaces in between."
            link="/journal"
            linkText="Read the journal"
          />

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {journalPosts.map((post, index) => (
              <Link key={`${post.title}-${index}`} href="/journal" className="group block">
                <div
                  className="aspect-[4/3] overflow-hidden bg-neutral-200 bg-cover bg-center transition duration-700 group-hover:scale-[0.99]"
                  style={{ backgroundImage: `url("${post.image}")` }}
                />

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">
                  {post.category}
                </p>

                <div className="mt-3 flex items-center justify-between gap-5">
                  <h3 className="text-2xl font-semibold tracking-tight">{post.title}</h3>

                  <ArrowRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section
      className="relative min-h-[92vh] overflow-hidden bg-cover bg-center text-white"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=2400&q=90")',
      }}
    >
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/35" />

      <header className="relative z-10 border-b border-white/20">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <button
            type="button"
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="text-2xl font-semibold tracking-[-0.04em]">
            Salt &amp; Swell
          </Link>

          <nav className="hidden items-center gap-9 text-sm font-medium lg:flex">
            <Link href="/shop" className="transition hover:text-white/65">
              Shop
            </Link>
            <Link href="/collections" className="transition hover:text-white/65">
              Collections
            </Link>
            <Link href="/journal" className="transition hover:text-white/65">
              Journal
            </Link>
            <Link href="/about" className="transition hover:text-white/65">
              Our Story
            </Link>
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Search"
              className="hidden h-10 w-10 items-center justify-center sm:flex"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center sm:flex"
            >
              <UserRound className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Shopping bag"
              className="relative flex h-10 w-10 items-center justify-center"
            >
              <ShoppingBag className="h-5 w-5" />

              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-black">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex min-h-[calc(92vh-80px)] max-w-7xl items-end px-6 pb-16 sm:pb-24 lg:px-10">
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/80">
            Australian coastal apparel
          </p>

          <h1 className="mt-6 text-6xl font-semibold leading-[0.88] tracking-[-0.055em] sm:text-8xl lg:text-[9rem]">
            Made for
            <br />
            salty souls.
          </h1>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/shop"
              className="inline-flex h-12 items-center justify-center gap-3 bg-white px-7 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-white/85"
            >
              Shop new arrivals
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/about"
              className="inline-flex h-12 items-center justify-center border border-white/60 px-7 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-black"
            >
              Discover our story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialCard({
  href,
  eyebrow,
  title,
  buttonText,
  image,
}: {
  href: string;
  eyebrow: string;
  title: string;
  buttonText: string;
  image: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[620px] items-end overflow-hidden bg-cover bg-center text-white"
      style={{ backgroundImage: `url("${image}")` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent transition duration-500 group-hover:bg-black/30" />

      <div className="relative p-8 sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">{eyebrow}</p>

        <h2 className="mt-4 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">{title}</h2>

        <span className="mt-7 inline-flex items-center gap-3 border-b border-white pb-2 text-sm font-semibold uppercase tracking-[0.15em]">
          {buttonText}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  link,
  linkText,
}: {
  eyebrow: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
}) {
  return (
    <div className="flex flex-col gap-7 border-b border-black/10 pb-7 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/45">{eyebrow}</p>

        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{title}</h2>

        <p className="mt-4 max-w-xl text-sm leading-7 text-black/55">{description}</p>
      </div>

      <Link
        href={link}
        className="inline-flex w-fit items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em]"
      >
        {linkText}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function Newsletter() {
  return (
    <section className="bg-[#ded8ca] px-6 py-20 sm:py-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/45">
            Stay salty
          </p>

          <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">
            Join the Salt &amp; Swell community.
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-black/55">
            New releases, coastal stories and members-only offers, delivered occasionally.
          </p>
        </div>

        <form className="border-b border-black">
          <div className="flex items-center">
            <input
              type="email"
              required
              aria-label="Email address"
              placeholder="Enter your email address"
              className="h-16 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-black/45"
            />

            <button
              type="submit"
              aria-label="Join newsletter"
              className="flex h-12 w-12 items-center justify-center"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#111412] px-6 py-16 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/15 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-3xl font-semibold tracking-[-0.045em]">
              Salt &amp; Swell
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/50">
              Independent Australian coastal apparel for salty souls.
            </p>
          </div>

          <FooterColumn
            title="Shop"
            links={[
              ["New Arrivals", "/shop"],
              ["Tees", "/shop"],
              ["Fleece", "/shop"],
              ["Accessories", "/shop"],
            ]}
          />

          <FooterColumn
            title="Information"
            links={[
              ["Our Story", "/about"],
              ["Journal", "/journal"],
              ["Contact", "/contact"],
              ["Shipping & Returns", "/contact"],
            ]}
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
              Follow
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-3 text-sm text-white/70 transition hover:text-white"
            >
              <Camera className="h-5 w-5" />
              Instagram
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Salt &amp; Swell. All rights reserved.</p>

          <p>Surfwear for salty souls.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">{title}</p>

      <div className="mt-5 flex flex-col gap-3">
        {links.map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className="text-sm text-white/65 transition hover:text-white"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
