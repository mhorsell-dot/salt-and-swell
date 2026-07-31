export default function Footer() {
  return (
    <footer className="bg-black py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 md:grid-cols-4">
        <div>
          <h3 className="text-3xl font-black">Salt & Swell</h3>

          <p className="mt-6 text-white/70">Premium Australian coastal apparel.</p>
        </div>

        <div>
          <h4 className="font-semibold">Shop</h4>

          <ul className="mt-5 space-y-3 text-white/70">
            <li>Men</li>
            <li>Women</li>
            <li>Accessories</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Support</h4>

          <ul className="mt-5 space-y-3 text-white/70">
            <li>Shipping</li>
            <li>Returns</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Follow</h4>

          <ul className="mt-5 space-y-3 text-white/70">
            <li>Instagram</li>
            <li>TikTok</li>
            <li>Facebook</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
