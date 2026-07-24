"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const announcements = [
  {
    icon: Truck,
    text: "FREE AUSTRALIA-WIDE SHIPPING ON ORDERS OVER $150",
  },
  {
    icon: ShieldCheck,
    text: "PREMIUM COASTAL APPAREL • DESIGNED IN AUSTRALIA",
  },
  {
    icon: Sparkles,
    text: "NEW ARRIVALS AVAILABLE NOW",
  },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % announcements.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const Announcement = announcements[index];
  const Icon = Announcement.icon;

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-10 overflow-hidden bg-black text-white">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.35 }}
        className="mx-auto flex h-10 max-w-[1600px] items-center justify-center gap-3 px-6"
      >
        <Icon className="h-4 w-4" />

        <span className="text-[11px] font-semibold uppercase tracking-[0.35em]">
          {Announcement.text}
        </span>
      </motion.div>
    </div>
  );
}
