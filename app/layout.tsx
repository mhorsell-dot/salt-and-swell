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
