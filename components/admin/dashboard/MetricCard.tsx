import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function MetricCard({
  label,
  value,
  note,
  trend,
  positive = true,
  icon,
}: {
  label: string;
  value: string;
  note: string;
  trend?: string;
  positive?: boolean;
  icon: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
          {icon}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs">
        {trend && (
          <span
            className={[
              "inline-flex items-center gap-1 rounded-full px-2 py-1 font-semibold",
              positive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700",
            ].join(" ")}
          >
            {positive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {trend}
          </span>
        )}

        <span className="text-slate-400">{note}</span>
      </div>
    </article>
  );
}
