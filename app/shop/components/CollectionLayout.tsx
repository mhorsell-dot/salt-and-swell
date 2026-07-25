"use client";

import { ReactNode } from "react";
import ProductFilters from "@/components/storefront/ProductFilters";

interface Props {
  title: string;
  description?: string;
  productCount: number;
  sortControl: ReactNode;
  filters?: ReactNode;
  children: ReactNode;
}

export default function CollectionLayout({
  title,
  description,
  productCount,
  sortControl,
  filters,
  children,
}: Props) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-14">
        <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">Salt & Swell Co.</p>

        <h1 className="mt-3 text-5xl font-black tracking-tight">{title}</h1>

        {description && <p className="mt-5 max-w-2xl text-lg text-neutral-600">{description}</p>}
      </header>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-neutral-500">{productCount} Products</p>

        {sortControl}
      </div>

      <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
        <aside>{filters ?? <ProductFilters />}</aside>

        <main>{children}</main>
      </div>
    </section>
  );
}
