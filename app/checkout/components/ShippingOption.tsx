import { Check } from "lucide-react";
import type { ReactNode } from "react";

type ShippingOptionProps = {
  selected: boolean;
  name: string;
  value: string;
  title: string;
  description: string;
  price: string;
  icon: ReactNode;
  onChange: () => void;
};

export default function ShippingOption({
  selected,
  name,
  value,
  title,
  description,
  price,
  icon,
  onChange,
}: ShippingOptionProps) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
        selected
          ? "border-black bg-black/[0.025] ring-1 ring-black"
          : "border-black/10 hover:border-black/25"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={onChange}
        className="sr-only"
      />

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1eee7]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs text-black/45">{description}</p>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-sm font-semibold">{price}</p>

        <div
          className={`flex h-5 w-5 items-center justify-center rounded-full border ${
            selected ? "border-black bg-black text-white" : "border-black/20 bg-white"
          }`}
        >
          {selected && <Check className="h-3 w-3" />}
        </div>
      </div>
    </label>
  );
}
