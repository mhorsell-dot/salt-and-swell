"use client";

import QuickViewModal from "./QuickViewModal";
import { useQuickView } from "./useQuickView";

export default function QuickViewHost() {
  const { open, product, closeQuickView } = useQuickView();

  return <QuickViewModal open={open} onClose={closeQuickView} product={product} />;
}
