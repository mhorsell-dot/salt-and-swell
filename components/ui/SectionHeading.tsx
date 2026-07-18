type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <div className="mb-16 max-w-3xl">
      {eyebrow && (
        <p className="mb-4 uppercase tracking-[0.4em] text-sm text-slate-500">{eyebrow}</p>
      )}

      <h2 className="text-5xl font-black md:text-6xl">{title}</h2>

      {subtitle && <p className="mt-6 text-xl leading-9 text-slate-600">{subtitle}</p>}
    </div>
  );
}
