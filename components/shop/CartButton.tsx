"use client";

import { useState } from "react";
import CartDrawer from "./CartDrawer";

export default function CartButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border px-5 py-2 text-sm font-semibold transition hover:bg-black hover:text-white"
      >
        Cart (2)
      </button>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
