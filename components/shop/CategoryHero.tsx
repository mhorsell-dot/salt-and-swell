type CategoryHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};

export default function CategoryHero({ eyebrow, title, description, image }: CategoryHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-black/10 bg-[#182321] text-white">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className="h-full w-full object-cover opacity-35" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-40 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">{eyebrow}</p>

        <h1 className="mt-6 max-w-4xl text-6xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-8xl">
          {title}
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-8 text-white/80">{description}</p>
      </div>
    </section>
  );
}
