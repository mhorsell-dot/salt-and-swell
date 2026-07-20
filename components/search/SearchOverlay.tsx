"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2">
        <Search className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-xl"
          >
            <div className="mx-auto mt-24 max-w-3xl rounded-3xl bg-white p-10 shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Search</h2>

                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              <input
                autoFocus
                placeholder="Search products..."
                className="mt-8 w-full rounded-xl border p-5 text-lg outline-none"
              />

              <p className="mt-6 text-sm text-neutral-500">Press ESC to close</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
