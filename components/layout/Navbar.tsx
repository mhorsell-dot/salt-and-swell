import Link from "next/link";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-black/20 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <Link href="/" className="text-3xl font-bold text-white">
          Salt & Swell
        </Link>

        <div className="hidden gap-10 text-white md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-slate-300">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
