#!/usr/bin/env bash
set -e

echo "==========================================="
echo " BUILD 037A.1 - PREMIUM STOREFRONT SHELL"
echo "==========================================="

mkdir -p components/layout

############################################
# Announcement Bar
############################################

cat > components/layout/AnnouncementBar.tsx <<'BAR'
"use client";

export default function AnnouncementBar() {
  return (
    <div className="bg-black text-white">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-center px-6 text-xs font-medium uppercase tracking-[0.25em]">
        FREE SHIPPING AUSTRALIA WIDE ON ORDERS OVER $150
      </div>
    </div>
  );
}
BAR

############################################
# Premium Navbar
############################################

cat > components/layout/Navbar.tsx <<'NAV'
"use client";

import Link from "next/link";
import { Menu, Search, Heart, ShoppingBag, User } from "lucide-react";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        <div className="flex items-center gap-4 md:hidden">
          <button className="rounded-full p-2 hover:bg-black/5">
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <Link
          href="/"
          className="text-2xl font-black uppercase tracking-[0.35em]"
        >
          Salt & Swell
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-[0.18em] transition hover:opacity-60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">

          <button className="rounded-full p-2 transition hover:bg-black/5">
            <Search className="h-5 w-5" />
          </button>

          <button className="rounded-full p-2 transition hover:bg-black/5">
            <User className="h-5 w-5" />
          </button>

          <button className="rounded-full p-2 transition hover:bg-black/5">
            <Heart className="h-5 w-5" />
          </button>

          <button className="relative rounded-full p-2 transition hover:bg-black/5">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
              0
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}
NAV

############################################
# Update Layout
############################################

cat > app/layout.tsx <<'LAYOUT'
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "../styles/design-system.css";

import CartShell from "@/components/cart/CartShell";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Salt & Swell",
  description: "Surfwear For Salty Souls",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartShell>
          <AnnouncementBar />
          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>

          <Footer />
        </CartShell>
      </body>
    </html>
  );
}
LAYOUT

echo
echo "==========================================="
echo " FOUNDATION INSTALLED"
echo "==========================================="
echo
echo "Run:"
echo
echo "npm run dev"
echo
