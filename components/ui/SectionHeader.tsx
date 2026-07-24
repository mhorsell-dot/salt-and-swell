type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <div className="max-w-3xl">

      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-500">
        {eyebrow}
      </p>

      <h2 className="mt-5 text-5xl font-black tracking-[-0.04em] md:text-6xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-neutral-600">
          {description}
        </p>
      )}

    </div>
  );
}
