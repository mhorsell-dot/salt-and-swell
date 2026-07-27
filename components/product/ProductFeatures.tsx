const features = [
  {
    title: "Premium Fabric",
    description: "Comfortable, durable materials selected for everyday coastal living.",
  },
  {
    title: "Designed in Australia",
    description: "Inspired by Australian coastlines and made for life outdoors.",
  },
  {
    title: "Easy Returns",
    description: "Straightforward 30-day returns for peace of mind.",
  },
];

export default function ProductFeatures() {
  return (
    <section className="rounded-[32px] bg-[#F7F5F0] p-10">
      <div className="grid gap-10 md:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title}>
            <h3 className="text-xl font-semibold">{feature.title}</h3>

            <p className="mt-4 leading-7 text-neutral-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
