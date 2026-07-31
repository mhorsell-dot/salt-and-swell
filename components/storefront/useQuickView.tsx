"use client";

import { createContext, useContext, useMemo, useState } from "react";

export interface QuickViewProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

interface QuickViewContextType {
  product: QuickViewProduct | null;
  open: boolean;
  openQuickView: (product: QuickViewProduct) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextType | null>(null);

export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [product, setProduct] = useState<QuickViewProduct | null>(null);
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      product,
      open,
      openQuickView(product: QuickViewProduct) {
        setProduct(product);
        setOpen(true);
      },
      closeQuickView() {
        setOpen(false);
      },
    }),
    [product, open],
  );

  return <QuickViewContext.Provider value={value}>{children}</QuickViewContext.Provider>;
}

export function useQuickView() {
  const context = useContext(QuickViewContext);

  if (!context) {
    throw new Error("useQuickView must be used inside QuickViewProvider");
  }

  return context;
}
