import type { Metadata } from "next";

import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | Salt & Swell",
  description: "Complete your Salt & Swell delivery details and review your order.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
