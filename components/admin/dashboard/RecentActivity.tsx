import { PackageCheck, ShoppingBag, UserPlus } from "lucide-react";

const activity = [
  {
    title: "New order received",
    detail: "Order #SS-1048 • $129.00",
    time: "8 minutes ago",
    icon: ShoppingBag,
  },
  {
    title: "New customer registered",
    detail: "A new customer joined your store",
    time: "34 minutes ago",
    icon: UserPlus,
  },
  {
    title: "Inventory updated",
    detail: "Coastal Classic Tee stock adjusted",
    time: "1 hour ago",
    icon: PackageCheck,
  },
];

export default function RecentActivity() {
  return (
    <section className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:p-6">
      <div>
        <p className="text-sm font-semibold text-slate-950">Recent activity</p>
        <p className="mt-1 text-xs text-slate-400">Latest changes across your store</p>
      </div>

      <div className="mt-6 space-y-5">
        {activity.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Icon className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                <p className="mt-0.5 truncate text-xs text-slate-500">{item.detail}</p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
      >
        View all activity
      </button>
    </section>
  );
}
