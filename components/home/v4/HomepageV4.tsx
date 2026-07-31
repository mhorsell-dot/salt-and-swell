import Hero from "./Hero";
import FeaturedProducts from "../sections/FeaturedProducts";
import Collections from "../sections/Collections";
import Newsletter from "./Newsletter";
import Footer from "./Footer";

export default function HomepageV4() {
  return (
    <main className="overflow-x-hidden bg-[#F8F6F2] text-neutral-900">
      {/* Hero */}
      <Hero />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Collections */}
      <Collections />

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </main>
  );
}
