type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <>
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.32em] text-black/45">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-2 text-3xl font-semibold tracking-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-3 text-black/60 leading-7">
          {description}
        </p>
      )}
    </>
  );
}
