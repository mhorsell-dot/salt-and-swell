import Link from "next/link";
import { AlertTriangle } from "lucide-react";

type StockItem = {
  id: string;
  name: string;
  inventory: number;
  sku: string;
};

export default function LowStock({ items }: { items: StockItem[] }) {
  return (
    <section className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-950">Inventory attention</p>
          <p className="mt-1 text-xs text-slate-400">Products that may need restocking</p>
        </div>

        <div className="rounded-xl bg-amber-50 p-2 text-amber-600">
          <AlertTriangle className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {items.length === 0 ? (
          <div className="rounded-xl bg-emerald-50 px-4 py-5 text-center">
            <p className="text-sm font-semibold text-emerald-800">Inventory looks healthy</p>
            <p className="mt-1 text-xs text-emerald-600">No low-stock variants detected.</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 px-3 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">{item.name}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{item.sku}</p>
              </div>

              <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                {item.inventory} left
              </span>
            </div>
          ))
        )}
      </div>

      <Link
        href="/admin/products"
        className="mt-6 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-center text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
      >
        Manage inventory
      </Link>
    </section>
  );
}
