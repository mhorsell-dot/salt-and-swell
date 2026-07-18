type CheckoutFieldProps = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  pattern?: string;
  maxLength?: number;
};

export default function CheckoutField({
  id,
  label,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
  pattern,
  maxLength,
}: CheckoutFieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.13em] text-black/55">
        {label}
        {required ? " *" : ""}
      </span>

      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={maxLength}
        className="mt-2 h-13 w-full rounded-xl border border-black/12 bg-[#faf9f6] px-4 text-sm outline-none transition placeholder:text-black/25 focus:border-black/40 focus:ring-2 focus:ring-black/5"
      />
    </label>
  );
}
