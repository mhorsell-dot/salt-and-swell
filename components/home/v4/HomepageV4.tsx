import Hero from "./Hero";
import Editorial from "./Editorial";

import Collections from "../sections/Collections";
import FeaturedProducts from "../sections/FeaturedProducts";

import BrandStory from "./BrandStory";
import Journal from "./Journal";
import Newsletter from "./Newsletter";
import Footer from "./Footer";

export default function HomepageV4() {
  return (
    <main className="overflow-x-hidden bg-[#F8F6F2] text-neutral-900">
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
