"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Search, User, Heart, ShoppingBag } from "lucide-react";
import dynamic from "next/dynamic";

const MobileMenu = dynamic(() => import("./MobileMenu"));
const SearchDrawer = dynamic(() => import("./SearchDrawer"));
const MegaMenu = dynamic(() => import("./MegaMenu"));

import SearchResults from "@/components/search/SearchResults";
import { useCart } from "@/components/cart/CartProvider";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColour = scrolled ? "text-black" : "text-white";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed inset-x-0 top-10 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/20 bg-white/70 shadow-lg backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-28 max-w-[1700px] items-center justify-between px-8 lg:px-14">
          <button
            onClick={() => setMenuOpen(true)}
            className={`transition-transform duration-300 hover:scale-110 lg:hidden ${textColour}`}
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link href="/" className="shrink-0 transition-transform duration-300 hover:scale-[1.02]">
            <Image
              src={
                scrolled
                  ? "/images/branding/salt-swell-logo-black.webp"
                  : "/images/branding/salt-swell-logo-white.webp"
              }
              alt="Salt & Swell Co"
              width={220}
              height={70}
              priority
              className="h-auto w-56 md:w-64 lg:w-80"
            />
          </Link>

          <nav className="hidden items-center gap-16 xl:gap-20 lg:flex">
            {links.map((link) =>
              link.href === "/shop" ? (
                <MegaMenu key="shop" />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative text-[12px] uppercase tracking-[0.28em] transition-colors duration-300 ${
                    pathname === link.href
                      ? textColour
                      : scrolled
                        ? "text-black/70 hover:text-black"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-current transition-all duration-300 ${
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-1">
            {[
              {
                icon: <Search className="h-5 w-5" />,
                action: () => setSearchOpen(true),
              },
              {
                icon: <User className="h-5 w-5" />,
                hidden: "hidden md:flex",
              },
            ].map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className={`${item.hidden ?? ""} ${textColour} flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 hover:backdrop-blur-lg`}
              >
                {item.icon}
              </button>
            ))}

            <Link
              href="/account/wishlist"
              className={`hidden md:flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 hover:backdrop-blur-lg ${textColour}`}
            >
              <Heart className="h-5 w-5" />
            </Link>

            <button
              onClick={openCart}
              className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 hover:backdrop-blur-lg ${textColour}`}
            >
              <ShoppingBag className="h-5 w-5" />

              {itemCount > 0 && (
                <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
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
