import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mockups = [
  {
    url: "/mockups/products/essential-tee-front.svg",
    alt: "Salt & Swell Essential Tee front mockup",
  },
  {
    url: "/mockups/products/essential-tee-back.svg",
    alt: "Salt & Swell Essential Tee back mockup",
  },
  {
    url: "/mockups/products/essential-tee-detail.svg",
    alt: "Salt & Swell Essential Tee fabric detail mockup",
  },
  {
    url: "/mockups/products/essential-tee-lifestyle.svg",
    alt: "Salt & Swell Essential Tee coastal lifestyle mockup",
  },
];

async function main() {
  const product = await prisma.product.findFirst({
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!product) {
    throw new Error(
      "No product was found. Create a product before attaching mockups.",
    );
  }

  for (const [index, mockup] of mockups.entries()) {
    const existing = await prisma.productImage.findFirst({
      where: {
        productId: product.id,
        url: mockup.url,
      },
    });

    if (!existing) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: mockup.url,
          alt: mockup.alt,
          sortOrder: index,
        },
      });
    }
  }

  console.log(`Mockups attached to ${product.name}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
