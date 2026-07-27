import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌊 Resetting Salt & Swell catalogue...");

  await prisma.orderItem.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.category.deleteMany();

  const mens = await prisma.collection.create({
    data: {
      name: "Men's Coastal Collection",
      slug: "mens-coastal-collection",
      description:
        "Premium coastal essentials designed for ocean mornings, open roads and everyday adventure.",
    },
  });

  const womens = await prisma.collection.create({
    data: {
      name: "Women's Coastal Collection",
      slug: "womens-coastal-collection",
      description: "Relaxed coastal pieces inspired by Australian beaches and slow summer living.",
    },
  });

  const essentials = await prisma.collection.create({
    data: {
      name: "Salt & Swell Essentials",
      slug: "salt-and-swell-essentials",
      description: "Everyday staples built around comfort, quality and timeless coastal style.",
    },
  });

  const tees = await prisma.category.create({
    data: {
      name: "T-Shirts",
      slug: "t-shirts",
    },
  });

  const sweats = await prisma.category.create({
    data: {
      name: "Sweats",
      slug: "sweats",
    },
  });

  const accessories = await prisma.category.create({
    data: {
      name: "Accessories",
      slug: "accessories",
    },
  });

  const products = [
    {
      name: "Salt & Swell Essential Tee",
      slug: "salt-swell-essential-tee",
      description:
        "A premium everyday tee crafted for coastal living. Soft heavyweight cotton with a relaxed Australian fit.",
      price: 49.95,
      featured: true,
      collectionId: essentials.id,
      categoryId: tees.id,
    },
    {
      name: "Coastal Heritage Tee",
      slug: "coastal-heritage-tee",
      description: "Vintage inspired surf culture styling with premium cotton construction.",
      price: 59.95,
      featured: true,
      collectionId: mens.id,
      categoryId: tees.id,
    },
    {
      name: "Salt Washed Hoodie",
      slug: "salt-washed-hoodie",
      description: "A premium fleece hoodie designed for cool mornings by the ocean.",
      price: 119.95,
      featured: true,
      collectionId: mens.id,
      categoryId: sweats.id,
    },
    {
      name: "Coastal Crew Sweat",
      slug: "coastal-crew-sweat",
      description: "Relaxed heavyweight crew built for evenings beside the coast.",
      price: 99.95,
      featured: false,
      collectionId: essentials.id,
      categoryId: sweats.id,
    },
    {
      name: "Classic Salt & Swell Cap",
      slug: "classic-salt-swell-cap",
      description: "Six panel cap featuring embroidered Salt & Swell branding.",
      price: 39.95,
      featured: false,
      collectionId: essentials.id,
      categoryId: accessories.id,
    },
    {
      name: "Women's Coastal Tee",
      slug: "womens-coastal-tee",
      description: "A relaxed fit coastal essential designed for effortless summer days.",
      price: 49.95,
      featured: true,
      collectionId: womens.id,
      categoryId: tees.id,
    },
  ];

  for (const item of products) {
    const product = await prisma.product.create({
      data: {
        ...item,
        price: new Prisma.Decimal(item.price),
        images: {
          create: [
            {
              url: item.name.includes("Women's")
                ? "/images/collections/womens.png"
                : item.name.includes("Essential") || item.name.includes("Classic")
                  ? "/images/collections/mens.png"
                  : "/images/collections/mens.png",
              alt: item.name,
              sortOrder: 0,
            },
            {
              url: item.name.includes("Women's")
                ? "/images/collections/womens.png"
                : "/images/collections/mens.png",
              alt: item.name,
              sortOrder: 1,
            },
          ],
        },
        variants: {
          create: [
            {
              size: "S",
              colour: "Sand",
              sku: `${item.slug}-S-SAND`,
              inventory: 10,
            },
            {
              size: "M",
              colour: "Black",
              sku: `${item.slug}-M-BLACK`,
              inventory: 10,
            },
            {
              size: "L",
              colour: "Ocean",
              sku: `${item.slug}-L-OCEAN`,
              inventory: 10,
            },
          ],
        },
      },
    });

    console.log(`✅ Created ${product.name}`);
  }

  console.log("🌊 Salt & Swell catalogue complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
