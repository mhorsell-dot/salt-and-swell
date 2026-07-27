import Image from "next/image";

import { Container, SectionHeader } from "@/components/ui";

const images = [
  "/images/lifestyle/lifestyle-1.jpg",
  "/images/lifestyle/lifestyle-2.jpg",
  "/images/lifestyle/lifestyle-3.jpg",
];

export default function Lifestyle() {
  return (
    <section className="bg-white py-36">
      <Container>
        <SectionHeader
          eyebrow="Lifestyle"
          title="Made For Days That Start Before Sunrise."
          description="Every collection is inspired by Australia's coastline, long weekends and the freedom of life outdoors."
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-[36px] lg:col-span-7 h-[700px]">
            <Image
              src={images[0]}
              alt="Salt & Swell Lifestyle"
              fill
              className="object-cover transition duration-[1500ms] hover:scale-105"
            />
          </div>

          <div className="flex flex-col gap-8 lg:col-span-5">
            <div className="relative overflow-hidden rounded-[36px] h-[336px]">
              <Image
                src={images[1]}
                alt="Salt & Swell Lifestyle"
                fill
                className="object-cover transition duration-[1500ms] hover:scale-105"
              />
            </div>

            <div className="relative overflow-hidden rounded-[36px] h-[336px]">
              <Image
                src={images[2]}
                alt="Salt & Swell Lifestyle"
                fill
                className="object-cover transition duration-[1500ms] hover:scale-105"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
