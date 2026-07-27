import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Manifesto from "./sections/Manifesto";
import Collections from "./sections/Collections";
import FeaturedProducts from "./sections/FeaturedProducts";
import Lifestyle from "./sections/Lifestyle";
import Journal from "./sections/Journal";
import Newsletter from "./Newsletter";

import HomepageV2 from "./v2/HomepageV2";

import FadeUp from "@/components/animations/FadeUp";

/*
|--------------------------------------------------------------------------
| HOMEPAGE VERSION
|--------------------------------------------------------------------------
|
| false = Current homepage (V1)
| true  = New premium homepage (V2)
|
*/

const USE_HOMEPAGE_V2 = true;

export default function Homepage() {
  if (USE_HOMEPAGE_V2) {
    return <HomepageV2 />;
  }

  return (
    <>
      <Hero />

      <FadeUp>
        <Features />
      </FadeUp>

      <FadeUp delay={0.05}>
        <Manifesto />
      </FadeUp>

      <FadeUp delay={0.1}>
        <Collections />
      </FadeUp>

      <FadeUp delay={0.15}>
        <FeaturedProducts />
      </FadeUp>

      <FadeUp delay={0.2}>
        <Lifestyle />
      </FadeUp>

      <FadeUp delay={0.25}>
        <Journal />
      </FadeUp>

      <FadeUp delay={0.3}>
        <Newsletter />
      </FadeUp>
    </>
  );
}
