export default function AccountCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="rounded-3xl bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-black/50">{description}</p>
    </a>
  );
}
