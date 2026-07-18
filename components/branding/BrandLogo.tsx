import Image from "next/image";
import Link from "next/link";

export default function BrandLogo() {
  return (
    <Link href="/" className="flex items-center gap-4">
      <Image
        src="/branding/logo.png"
        alt="Salt & Swell"
        width={56}
        height={56}
        priority
        className="rounded-full"
      />

      <div className="leading-none">
        <p className="font-serif text-2xl font-bold tracking-wide text-white">Salt & Swell</p>

        <p className="text-xs uppercase tracking-[0.35em] text-slate-300">
          Surfwear For Salty Souls
        </p>
      </div>
    </Link>
  );
}
