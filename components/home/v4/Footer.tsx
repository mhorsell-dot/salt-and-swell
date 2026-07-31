import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F7F5F0] py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-8">
        <h2 className="text-5xl font-semibold tracking-[0.25em]">SALT & SWELL</h2>

        <nav className="mt-12 flex flex-wrap justify-center gap-10 uppercase tracking-[0.3em] text-xs">
          <Link href="/shop">Shop</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/about">About</Link>
        </nav>

        <div className="mt-16 h-px w-full bg-neutral-200" />

        <p className="mt-10 text-sm text-neutral-500">© 2026 Salt & Swell. All rights reserved.</p>
      </div>
    </footer>
  );
}
