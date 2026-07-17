const chartData = [
  { label: "Mon", value: 38 },
  { label: "Tue", value: 54 },
  { label: "Wed", value: 43 },
  { label: "Thu", value: 67 },
  { label: "Fri", value: 76 },
  { label: "Sat", value: 58 },
  { label: "Sun", value: 84 },
];

export default function SalesChart() {
  return (
    <section className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-950">Sales overview</p>
          <p className="mt-1 text-xs text-slate-400">
            Revenue performance over the last seven days
          </p>
        </div>

        <select
          defaultValue="7-days"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 outline-none"
        >
          <option value="7-days">Last 7 days</option>
          <option value="30-days">Last 30 days</option>
          <option value="90-days">Last 90 days</option>
        </select>
      </div>

      <div className="mt-8 flex h-[250px] items-end gap-3 sm:gap-5">
        {chartData.map((item) => (
          <div
            key={item.label}
            className="flex h-full flex-1 flex-col items-center justify-end gap-3"
          >
            <div className="group flex h-full w-full items-end">
              <div
                className="relative w-full rounded-t-xl bg-slate-950 transition hover:bg-slate-700"
                style={{ height: `${item.value}%` }}
              >
                <span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-slate-950 px-2 py-1 text-[10px] text-white group-hover:block">
                  ${item.value * 24}
                </span>
              </div>
            </div>

            <span className="text-[11px] font-medium text-slate-400">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
