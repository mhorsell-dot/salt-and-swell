"use client";

import Hero from "./Hero";
import Editorial from "./Editorial";
import Collections from "./Collections";
import FeaturedProducts from "./FeaturedProducts";
import BrandStory from "./BrandStory";
import Journal from "./Journal";
import Newsletter from "./Newsletter";
import Footer from "./Footer";

export default function HomepageV3() {
  return (
    <main className="bg-[#F7F5F0] text-neutral-900 overflow-x-hidden">
      <Hero />
      <Editorial />
      <Collections />
      <FeaturedProducts />
      <BrandStory />
      <Journal />
      <Newsletter />
      <Footer />
    </main>
  );
}
