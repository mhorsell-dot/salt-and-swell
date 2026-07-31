"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";

type SearchDrawerProps = {
  open: boolean;
  value: string;
  loading?: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  onChange: (value: string) => void;
};

export default function SearchDrawer({
  open,
  value,
  loading = false,
  children,
  onClose,
  onChange,
}: SearchDrawerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-x-0 top-0 z-[100] bg-white shadow-2xl"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mx-auto max-w-5xl p-8">
              <div className="flex items-center gap-4 rounded-full border border-neutral-300 px-6 py-4">
                <Search className="h-5 w-5 text-neutral-400" />

                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="Search Salt & Swell..."
                  className="flex-1 bg-transparent text-lg outline-none"
                />

                {loading && (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-black" />
                )}

                <button
                  onClick={onClose}
                  className="rounded-full p-2 transition hover:bg-neutral-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-8 min-h-[350px]">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
