import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

/**
 * Inintialize roles.
 */
async function createRoles() {
  const payload = await prisma.role.createMany({
    data: [
      { id: nanoid(16), name: 'ADMIN' },
      { id: nanoid(16), name: 'CONTENT_CREATOR' },
    ],
  });

  console.log(`Creating Roles: ${payload.count}`);
}

async function main() {
  try {
    await createRoles();
  } catch (error) {
    console.error(error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
