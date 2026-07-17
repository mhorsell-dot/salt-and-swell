"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminShell({
  children,
}: {
  children: ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f7f8] text-slate-950">
      <AdminSidebar
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="lg:pl-[272px]">
        <AdminHeader onOpenMenu={() => setMobileMenuOpen(true)} />

        <main className="min-h-[calc(100vh-73px)] px-4 py-6 sm:px-6 lg:px-10 lg:py-9">
          <div className="mx-auto max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
