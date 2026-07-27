"use client";

import Hero from "./Hero";
import Manifesto from "./Manifesto";
import Lifestyle from "./Lifestyle";
import Collections from "./Collections";
import FeaturedProducts from "./FeaturedProducts";
import BrandStory from "./BrandStory";
import Journal from "./Journal";
import Newsletter from "./Newsletter";
import FooterCTA from "./FooterCTA";

export default function HomepageV2() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Lifestyle />
      <Collections />
      <FeaturedProducts />
      <BrandStory />
      <Journal />
      <Newsletter />
      <FooterCTA />
    </>
  );
}
