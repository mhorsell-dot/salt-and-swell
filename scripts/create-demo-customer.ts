import prisma from "@/lib/prisma";

async function main() {
  const customer = await prisma.customer.upsert({
    where: {
      email: "demo@saltandswell.com",
    },
    update: {},
    create: {
      id: "demo-customer",
      email: "demo@saltandswell.com",
      firstName: "Demo",
      lastName: "Customer",
      status: "ACTIVE",
    },
  });

  console.log("Created demo customer:");
  console.log(customer);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
