type SummaryRowProps = {
  label: string;
  value: string;
};

export default function SummaryRow({
  label,
  value,
}: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between gap-5">
      <span className="text-black/50">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
