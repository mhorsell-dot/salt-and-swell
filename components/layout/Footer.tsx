import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-stone-50">
      <div className="mx-auto max-w-[1500px] px-8 py-24 lg:px-16">
        <div className="grid gap-20 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}

          <div>
            <h2 className="text-5xl font-black uppercase tracking-[0.35em] text-neutral-900">
              SALT & SWELL
            </h2>

            <p className="mt-8 max-w-md text-lg leading-8 text-neutral-600">
              Surfwear for salty souls. Inspired by Australia&apos;s coastline and built for
              everyday adventure.
            </p>

            <div className="mt-10 flex gap-8">
              <Link
                href="#"
                className="text-sm font-semibold uppercase tracking-[0.25em] hover:text-black"
              >
                Instagram
              </Link>

              <Link
                href="#"
                className="text-sm font-semibold uppercase tracking-[0.25em] hover:text-black"
              >
                Facebook
              </Link>

              <Link
                href="#"
                className="text-sm font-semibold uppercase tracking-[0.25em] hover:text-black"
              >
                TikTok
              </Link>
            </div>
          </div>

          {/* Shop */}

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.3em]">Shop</h3>

            <ul className="space-y-4 text-neutral-600">
              <li>
                <Link href="/shop">All Products</Link>
              </li>
              <li>
                <Link href="/shop?category=mens">Mens</Link>
              </li>
              <li>
                <Link href="/shop?category=womens">Womens</Link>
              </li>
              <li>
                <Link href="/shop?category=accessories">Accessories</Link>
              </li>
            </ul>
          </div>

          {/* Company */}

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.3em]">Company</h3>

            <ul className="space-y-4 text-neutral-600">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/journal">Journal</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/shipping">Shipping</Link>
              </li>
            </ul>
          </div>

          {/* Support */}

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.3em]">Support</h3>

            <ul className="space-y-4 text-neutral-600">
              <li>
                <Link href="/returns">Returns</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-neutral-200 pt-10 text-sm text-neutral-500 lg:flex-row">
          <p>© {new Date().getFullYear()} Salt & Swell Co. All rights reserved.</p>

          <p>Inspired by Salt. Built for the Swell.</p>
        </div>
      </div>
    </footer>
  );
}
