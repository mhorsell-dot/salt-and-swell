"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function MobileMenu({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed left-0 top-0 z-50 h-full w-80 bg-white shadow-2xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
          >
            <div className="flex items-center justify-between border-b p-6">
              <h2 className="text-lg font-black tracking-[0.3em] uppercase">Salt & Swell</h2>

              <button onClick={onClose} className="rounded-full p-2 hover:bg-neutral-100">
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="border-b px-6 py-5 text-lg font-semibold transition hover:bg-neutral-50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-0 w-full border-t p-6 text-sm text-neutral-500">
              Surfwear For Salty Souls
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
