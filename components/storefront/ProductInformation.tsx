"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const sections = [
  {
    title: "Product details",
    content:
      "Designed in Australia with a relaxed coastal fit. Built as an everyday essential for life beside the ocean.",
  },
  {
    title: "Materials and care",
    content:
      "Cold machine wash with similar colours. Wash inside out and avoid tumble drying to help preserve the garment and print.",
  },
  {
    title: "Delivery",
    content:
      "Complimentary standard delivery on Australian orders over $150. Shipping costs and delivery estimates are confirmed at checkout.",
  },
  {
    title: "Returns",
    content:
      "Unworn products may be returned in their original condition within 30 days of delivery.",
  },
];

export default function ProductInformation() {
  const [openSection, setOpenSection] = useState<string | null>("Product details");

  return (
    <div className="mt-10 border-t border-black/10">
      {sections.map((section) => {
        const isOpen = openSection === section.title;

        return (
          <div key={section.title} className="border-b border-black/10">
            <button
              type="button"
              onClick={() => setOpenSection(isOpen ? null : section.title)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                {section.title}
              </span>

              <ChevronDown
                className={isOpen ? "h-4 w-4 rotate-180 transition" : "h-4 w-4 transition"}
              />
            </button>

            <div
              className={
                isOpen
                  ? "grid grid-rows-[1fr] transition-all duration-300"
                  : "grid grid-rows-[0fr] transition-all duration-300"
              }
            >
              <div className="overflow-hidden">
                <p className="max-w-xl pb-6 text-sm leading-7 text-black/60">{section.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
