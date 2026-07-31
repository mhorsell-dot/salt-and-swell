import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://saltandswell.com.au"),

  title: {
    default: "Salt & Swell Co | Premium Coastal Apparel",
    template: "%s | Salt & Swell Co",
  },

  description:
    "Premium Australian coastal apparel inspired by life beside the ocean. Timeless hoodies, tees, caps and accessories designed for everyday adventures.",

  keywords: [
    "Salt & Swell",
    "Australian clothing",
    "coastal clothing",
    "surf apparel",
    "premium hoodies",
    "beach clothing",
    "streetwear",
    "caps",
    "coastal lifestyle",
  ],

  authors: [
    {
      name: "Salt & Swell Co",
    },
  ],

  creator: "Salt & Swell Co",

  publisher: "Salt & Swell Co",

  applicationName: "Salt & Swell",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://saltandswell.com.au",
    siteName: "Salt & Swell Co",
    title: "Salt & Swell Co | Premium Coastal Apparel",
    description: "Premium Australian coastal apparel inspired by life beside the ocean.",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Salt & Swell Co",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Salt & Swell Co",
    description: "Premium Australian coastal apparel inspired by life beside the ocean.",
    images: ["/images/og-image.webp"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.webp",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F6F2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartShell>
          <AnnouncementBar />
          <Navbar />

          <main className="min-h-screen">{children}</main>

          <Footer />
        </CartShell>
      </body>
    </html>
  );
}
