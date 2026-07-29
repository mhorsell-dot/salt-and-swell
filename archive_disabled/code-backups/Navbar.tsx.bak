"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Search, User, Heart, ShoppingBag } from "lucide-react";

import MobileMenu from "./MobileMenu";
import SearchDrawer from "./SearchDrawer";
import SearchResults from "@/components/search/SearchResults";
import { useCart } from "@/components/cart/CartProvider";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-black/10 bg-white/95 shadow-md backdrop-blur-xl"
            : "bg-white/70 backdrop-blur-lg"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-full p-2 transition hover:bg-black/5"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          <Link href="/" className="text-xl font-black uppercase tracking-[0.35em] lg:text-2xl">
            Salt & Swell
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-semibold uppercase tracking-[0.18em] transition ${
                  pathname === link.href ? "text-black" : "text-black/70 hover:text-black"
                }`}
              >
                {link.label}

                <span
                  className={`absolute -bottom-2 left-0 h-[2px] bg-black transition-all duration-300 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="rounded-full p-2 hover:bg-black/5"
            >
              <Search className="h-5 w-5" />
            </button>

            <button className="rounded-full p-2 hover:bg-black/5">
              <User className="h-5 w-5" />
            </button>

            <Link href="/account/wishlist" className="relative rounded-full p-2 hover:bg-black/5">
              <Heart className="h-5 w-5" />

              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                1
              </span>
            </Link>

            <button
              onClick={openCart}
              className="relative rounded-full p-2 hover:bg-black/5"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="h-5 w-5" />

              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <SearchDrawer
        open={searchOpen}
        value={query}
        onChange={setQuery}
        onClose={() => {
          setSearchOpen(false);
          setQuery("");
        }}
      >
        <SearchResults query={query} />
      </SearchDrawer>
    </>
  );
}
