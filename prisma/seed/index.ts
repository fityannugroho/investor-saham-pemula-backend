import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Put seed code here.
  } catch (error) {
    console.error(error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
