import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const firstNames = [
  "James",
  "Emma",
  "Oliver",
  "Charlotte",
  "Jack",
  "Mia",
  "Liam",
  "Sophia",
  "Noah",
  "Grace",
];

const lastNames = [
  "Smith",
  "Brown",
  "Wilson",
  "Taylor",
  "Johnson",
  "Martin",
  "White",
  "Lee",
  "Walker",
  "Thomas",
];

const reviewTitles = [
  "Fantastic quality",
  "Love the fit",
  "Exactly what I wanted",
  "Super comfortable",
  "Premium feel",
  "Highly recommended",
  "Great everyday tee",
  "Will definitely buy again",
];

const reviewComments = [
  "The quality exceeded my expectations. The fabric feels premium and fits perfectly.",
  "Really impressed with the stitching and overall finish.",
  "Exactly what I was hoping for. Comfortable enough to wear all day.",
  "One of the nicest t-shirts I've owned.",
  "Great weight, soft fabric and true to size.",
  "Looks even better in person than online.",
  "Would happily recommend this to friends.",
  "Shipping was quick and the quality is excellent.",
];

async function main() {
  const product = await prisma.product.findFirst();

  if (!product) {
    throw new Error("No products found.");
  }

  for (let i = 0; i < 10; i++) {
    const email = `demo${i}@saltandswell.com`;

    await prisma.customer.upsert({
      where: { email },

      update: {},

      create: {
        email,

        firstName: firstNames[i],

        lastName: lastNames[i],

        passwordHash: "demo",
      },
    });
  }

  const customers = await prisma.customer.findMany();

  const existing = await prisma.review.count({
    where: {
      productId: product.id,
    },
  });

  if (existing > 0) {
    console.log("Reviews already exist.");
    return;
  }

  for (let i = 0; i < 25; i++) {
    const customer = customers[i % customers.length];

    await prisma.review.create({
      data: {
        rating: Math.random() > 0.2 ? 5 : 4,

        title: reviewTitles[Math.floor(Math.random() * reviewTitles.length)],

        comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],

        customerId: customer.id,

        productId: product.id,
      },
    });
  }

  console.log("✅ Demo reviews created.");
}

main().finally(async () => {
  await prisma.$disconnect();
});
