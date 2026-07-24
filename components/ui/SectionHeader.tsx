import { cn } from "@/lib/cn";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Props) {
  const centered = align === "center";

  return (
    <div className={cn(centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      {eyebrow && (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-neutral-500">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl font-black tracking-[-0.05em] leading-tight md:text-6xl">{title}</h2>

      {description && <p className="mt-8 text-lg leading-8 text-neutral-600">{description}</p>}
    </div>
  );
}
