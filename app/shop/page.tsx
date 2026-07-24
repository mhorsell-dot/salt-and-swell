import Link from "next/link";
import { ArrowRight } from "lucide-react";

import LiveProductGrid from "@/components/storefront/LiveProductGrid";

export const dynamic = "force-dynamic";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#171715]">
      <header className="border-b border-black/10 bg-[#182321] text-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="text-2xl font-semibold tracking-[-0.04em]">
            Salt &amp; Swell
          </Link>

          <nav className="flex items-center gap-7 text-sm font-medium">
            <Link href="/shop" className="text-white">
              Shop
            </Link>

            <Link
              href="/collections"
              className="hidden text-white/65 transition hover:text-white sm:block"
            >
              Collections
            </Link>

            <Link
              href="/about"
              className="hidden text-white/65 transition hover:text-white sm:block"
            >
              Our Story
            </Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-black/10 px-6 pt-32 pb-20 sm:pt-40 sm:pb-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
            Salt &amp; Swell catalogue
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <h1 className="max-w-4xl text-6xl font-semibold leading-[0.9] tracking-[-0.055em] sm:text-8xl">
              Made for life
              <br />
              beside the ocean.
            </h1>

            <p className="max-w-md text-sm leading-7 text-black/55">
              Explore considered coastal essentials designed in Australia for long days, open roads
              and wherever the tide takes you.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/45">
                Current range
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Shop all</h2>
            </div>

            <Link
              href="/collections"
              className="inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em]"
            >
              Browse collections
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <LiveProductGrid />
        </div>
      </section>

      <footer className="mt-20 bg-[#111412] px-6 py-12 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-2xl font-semibold tracking-[-0.04em]">
            Salt &amp; Swell
          </Link>

          <p className="text-xs uppercase tracking-[0.2em] text-white/45">
            Surfwear for salty souls
          </p>
        </div>
      </footer>
    </main>
  );
}
