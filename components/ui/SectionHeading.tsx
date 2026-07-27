interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ eyebrow, title, description, align = "center" }: Props) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className="text-xs uppercase tracking-[0.45em] text-neutral-500">{eyebrow}</p>

      <h2 className="mt-5 text-5xl font-black tracking-tight md:text-6xl">{title}</h2>

      {description && <p className="mt-6 text-lg leading-8 text-neutral-600">{description}</p>}
    </div>
  );
}
