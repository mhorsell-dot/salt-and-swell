"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Search, User, Heart, ShoppingBag } from "lucide-react";

import MobileMenu from "./MobileMenu";
import SearchDrawer from "./SearchDrawer";
import MegaMenu from "./MegaMenu";
import SearchResults from "@/components/search/SearchResults";
import { useCart } from "@/components/cart/CartProvider";
import AnnouncementBar from "./AnnouncementBar";

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
      <AnnouncementBar />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`fixed inset-x-0 top-10 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-black/5 bg-white/75 backdrop-blur-2xl shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-24 max-w-[1600px] items-center justify-between px-8 lg:px-20">
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-full p-2 transition hover:bg-black/5"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          <Link href="/" className="transition-opacity duration-300 hover:opacity-90">
            <Image
              src={
                scrolled
                  ? "/images/branding/salt-swell-logo-black.webp"
                  : "/images/branding/salt-swell-logo-white.webp"
              }
              alt="Salt & Swell Co."
              width={220}
              height={60}
              priority
              className="h-auto w-52 lg:w-64"
            />
          </Link>

          <nav className="hidden items-center gap-10 xl:gap-12 lg:flex">
            {links.map((link) => {
              if (link.href === "/shop") {
                return <MegaMenu key="shop" />;
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative text-[13px] font-semibold uppercase tracking-[0.18em] transition ${
                    pathname === link.href
                      ? scrolled
                        ? "text-black"
                        : "text-white"
                      : scrolled
                        ? "text-black/70 hover:text-black"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute -bottom-2 left-0 h-[1px] transition-all duration-500 ${
                      scrolled ? "bg-black" : "bg-white"
                    } ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className={`rounded-full p-2 transition-colors duration-500 ${scrolled ? "text-black hover:bg-black/5" : "text-white hover:bg-white/10"}`}
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              className={`rounded-full p-2 transition-colors duration-500 ${scrolled ? "text-black hover:bg-black/5" : "text-white hover:bg-white/10"}`}
            >
              <User className="h-5 w-5" />
            </button>

            <Link
              href="/account/wishlist"
              className={`group relative rounded-full p-2 transition-colors duration-500 ${
                scrolled ? "text-black hover:bg-black/5" : "text-white hover:bg-white/10"
              }`}
            >
              <Heart className="h-5 w-5" />
            </Link>

            <button
              onClick={openCart}
              className={`group relative rounded-full p-2 transition-colors duration-500 ${
                scrolled ? "text-black hover:bg-black/5" : "text-white hover:bg-white/10"
              }`}
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
