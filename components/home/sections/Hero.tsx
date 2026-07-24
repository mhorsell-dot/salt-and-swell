"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 scale-[1.02] bg-cover bg-center transition-transform duration-[15000ms] ease-linear"
        style={{
          backgroundImage: "url('/images/hero/salt-swell-hero.png')",
        }}
      />

      {/* Softer overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Editorial gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/8 to-transparent" />

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

      <div className="relative z-20 flex h-full items-center">

        <div className="mx-auto w-full max-w-7xl px-8">

          {/* Lower position */}
          <div className="max-w-4xl pt-24">

            <p className="mb-10 text-xs uppercase tracking-[0.55em] text-white/80">
              AUSTRALIAN COASTAL APPAREL
            </p>

            <h1
              className="
                font-black
                uppercase
                tracking-[-0.055em]
                leading-[0.92]
                text-white

                text-5xl
                md:text-7xl
                xl:text-[6.4rem]
              "
            >
              SURFWEAR
              <br />
              FOR
              <br />
              SALTY SOULS.
            </h1>

            <p className="mt-12 max-w-2xl text-[22px] leading-10 text-white/90">
              Designed for sunrise sessions,
              ocean air,
              road trips
              and everything in between.
            </p>

            <div className="mt-16">

              <Link
                href="/shop"
                className="
                  inline-flex
                  items-center
                  justify-center

                  rounded-full

                  bg-white

                  px-14
                  py-5

                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.22em]

                  text-black

                  transition-all
                  duration-500

                  hover:-translate-y-1
                  hover:scale-[1.02]
                  hover:shadow-[0_25px_60px_rgba(0,0,0,.35)]
                "
              >
                Shop Collection
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* Scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">

        <div className="flex flex-col items-center">

          <span className="text-[10px] uppercase tracking-[0.45em] text-white/70">
            Scroll
          </span>

          <div className="mt-3 h-12 w-px bg-white/60" />

        </div>

      </div>

    </section>
  );
}
