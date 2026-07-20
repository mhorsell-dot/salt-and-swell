#!/bin/bash
set -e

echo "=========================================="
echo "SALT & SWELL BUILD 027A"
echo "PREMIUM HOMEPAGE"
echo "=========================================="

ROOT="/workspaces/salt-and-swell"

cd "$ROOT"

echo ""
echo "Installing dependencies..."
npm install framer-motion

mkdir -p components/home

##############################################
# PREMIUM HERO
##############################################

cat > components/home/PremiumHero.tsx <<'EOF'
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PremiumHero() {
  return (
    <section className="relative h-screen overflow-hidden">

      <motion.img
        src="/images/hero.jpg"
        alt="Salt & Swell"
        initial={{scale:1.15}}
        animate={{scale:1}}
        transition={{duration:12}}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40"/>

      <div className="relative z-10 flex h-full items-center">

        <div className="mx-auto max-w-7xl px-8">

          <motion.p
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{delay:.2}}
            className="uppercase tracking-[0.5em] text-white/80"
          >
            Australian Coastal Apparel
          </motion.p>

          <motion.h1
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{delay:.5}}
            className="mt-6 text-7xl font-black leading-none text-white"
          >
            Live by the tide.
            <br/>
            Dress for the journey.
          </motion.h1>

          <motion.p
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:1}}
            className="mt-8 max-w-xl text-xl text-white/90"
          >
            Premium Australian apparel inspired by
            saltwater, road trips and endless summers.
          </motion.p>

          <div className="mt-12 flex gap-4">

            <Link
              href="/shop"
              className="rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
            >
              Shop Collection
            </Link>

            <Link
              href="/about"
              className="rounded-full border border-white px-8 py-4 text-white backdrop-blur-sm"
            >
              Our Story
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}
EOF

##############################################
# COLLECTIONS
##############################################

cat > components/home/Collections.tsx <<'EOF'
import Link from "next/link";

const cards=[
{
title:"MEN",
image:"/images/collections-men.jpg",
link:"/collections/mens"
},
{
title:"WOMEN",
image:"/images/collections-women.jpg",
link:"/collections/womens"
}
];

export default function Collections(){

return(

<section className="mx-auto max-w-7xl px-8 py-24">

<div className="grid gap-10 md:grid-cols-2">

{cards.map(card=>(

<Link
key={card.title}
href={card.link}
className="group relative overflow-hidden rounded-3xl"
>

<img
src={card.image}
className="h-[650px] w-full object-cover transition duration-700 group-hover:scale-110"
/>

<div className="absolute inset-0 bg-black/30"/>

<div className="absolute bottom-12 left-12">

<h2 className="text-5xl font-black text-white">
{card.title}
</h2>

<p className="mt-4 text-white">
Shop Collection →
</p>

</div>

</Link>

))}

</div>

</section>

)

}
EOF

##############################################
# BRAND STORY
##############################################

cat > components/home/BrandStory.tsx <<'EOF'
export default function BrandStory(){

return(

<section className="mx-auto max-w-5xl px-8 py-32 text-center">

<p className="uppercase tracking-[0.4em] text-neutral-500">
OUR STORY
</p>

<h2 className="mt-8 text-6xl font-black">

Made for mornings
that begin with saltwater.

</h2>

<p className="mx-auto mt-10 max-w-3xl text-xl leading-9 text-neutral-600">

Salt & Swell exists for people who chase coastlines,
live outdoors and appreciate timeless apparel
built for everyday adventures.

</p>

</section>

)

}
EOF

echo ""
echo "=========================================="
echo "PART 1 COMPLETE"
echo "=========================================="
echo ""
echo "Next step:"
echo "Continue with install-027A Part 2."#!/bin/bash
set -e

echo "=========================================="
echo "SALT & SWELL BUILD 027A"
echo "PREMIUM HOMEPAGE"
echo "=========================================="

ROOT="/workspaces/salt-and-swell"

cd "$ROOT"

echo ""
echo "Installing dependencies..."
npm install framer-motion

mkdir -p components/home

##############################################
# PREMIUM HERO
##############################################

cat > components/home/PremiumHero.tsx <<'EOF'
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PremiumHero() {
  return (
    <section className="relative h-screen overflow-hidden">

      <motion.img
        src="/images/hero.jpg"
        alt="Salt & Swell"
        initial={{scale:1.15}}
        animate={{scale:1}}
        transition={{duration:12}}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40"/>

      <div className="relative z-10 flex h-full items-center">

        <div className="mx-auto max-w-7xl px-8">

          <motion.p
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{delay:.2}}
            className="uppercase tracking-[0.5em] text-white/80"
          >
            Australian Coastal Apparel
          </motion.p>

          <motion.h1
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{delay:.5}}
            className="mt-6 text-7xl font-black leading-none text-white"
          >
            Live by the tide.
            <br/>
            Dress for the journey.
          </motion.h1>

          <motion.p
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:1}}
            className="mt-8 max-w-xl text-xl text-white/90"
          >
            Premium Australian apparel inspired by
            saltwater, road trips and endless summers.
          </motion.p>

          <div className="mt-12 flex gap-4">

            <Link
              href="/shop"
              className="rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
            >
              Shop Collection
            </Link>

            <Link
              href="/about"
              className="rounded-full border border-white px-8 py-4 text-white backdrop-blur-sm"
            >
              Our Story
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}
EOF

##############################################
# COLLECTIONS
##############################################

cat > components/home/Collections.tsx <<'EOF'
import Link from "next/link";

const cards=[
{
title:"MEN",
image:"/images/collections-men.jpg",
link:"/collections/mens"
},
{
title:"WOMEN",
image:"/images/collections-women.jpg",
link:"/collections/womens"
}
];

export default function Collections(){

return(

<section className="mx-auto max-w-7xl px-8 py-24">

<div className="grid gap-10 md:grid-cols-2">

{cards.map(card=>(

<Link
key={card.title}
href={card.link}
className="group relative overflow-hidden rounded-3xl"
>

<img
src={card.image}
className="h-[650px] w-full object-cover transition duration-700 group-hover:scale-110"
/>

<div className="absolute inset-0 bg-black/30"/>

<div className="absolute bottom-12 left-12">

<h2 className="text-5xl font-black text-white">
{card.title}
</h2>

<p className="mt-4 text-white">
Shop Collection →
</p>

</div>

</Link>

))}

</div>

</section>

)

}
EOF

##############################################
# BRAND STORY
##############################################

cat > components/home/BrandStory.tsx <<'EOF'
export default function BrandStory(){

return(

<section className="mx-auto max-w-5xl px-8 py-32 text-center">

<p className="uppercase tracking-[0.4em] text-neutral-500">
OUR STORY
</p>

<h2 className="mt-8 text-6xl font-black">

Made for mornings
that begin with saltwater.

</h2>

<p className="mx-auto mt-10 max-w-3xl text-xl leading-9 text-neutral-600">

Salt & Swell exists for people who chase coastlines,
live outdoors and appreciate timeless apparel
built for everyday adventures.

</p>

</section>

)

}
EOF

echo ""
echo "=========================================="
echo "PART 1 COMPLETE"
echo "=========================================="
echo ""
echo "Next step:"
echo "Continue with install-027A Part 2."