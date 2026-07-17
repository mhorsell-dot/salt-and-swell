import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: "Heritage Tee",
        slug: "heritage-tee",
        description: "Premium heavyweight cotton tee inspired by Australia's coastline.",
        price: new Prisma.Decimal(59.95),
        featured: true,
        active: true,
      },
      {
        name: "Coastal Hoodie",
        slug: "coastal-hoodie",
        description: "Mid-weight fleece hoodie built for cool mornings after a surf.",
        price: new Prisma.Decimal(99.95),
        featured: true,
        active: true,
      },
      {
        name: "Drifter Cap",
        slug: "drifter-cap",
        description: "Classic six-panel cap with embroidered Salt & Swell branding.",
        price: new Prisma.Decimal(39.95),
        featured: false,
        active: true,
      },
      {
        name: "Breaker Boardshort",
        slug: "breaker-boardshort",
        description: "Lightweight stretch boardshorts designed for all-day comfort.",
        price: new Prisma.Decimal(79.95),
        featured: true,
        active: true,
      }
    ]
  });

  console.log("✅ Salt & Swell products seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
