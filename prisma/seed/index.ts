import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { stdin as input, stdout as output } from 'process';
import { createInterface } from 'readline';

const prisma = new PrismaClient();

/**
 * Delete all data in a table.
 */
const emptyTable = async (tableName: string) => {
  console.time(`delete-${tableName}`);

  const res = await prisma.$executeRawUnsafe(`DELETE FROM ${tableName};`);

  console.timeEnd(`delete-${tableName}`);
  return res;
};

/**
 * Seed an admin.
 */
const addAdmin = async () => {
  console.time(`add-admin`);

  const password =
    process.env.SEEDER_ADMIN_PASSWORD ?? faker.internet.password();

  if (!process.env.SEEDER_ADMIN_PASSWORD) {
    console.info(`\nGenerated password: ${password}\n`);
  }

  await prisma.admin.create({
    data: {
      id: process.env.SEEDER_ADMIN_ID ?? nanoid(16),
      name: process.env.SEEDER_ADMIN_NAME ?? faker.person.fullName(),
      email: process.env.SEEDER_ADMIN_EMAIL ?? faker.internet.exampleEmail(),
      password: await bcrypt.hash(password, 10),
    },
  });

  console.timeEnd(`add-admin`);
};

const addCategories = async (amount = 1) => {
  console.time(`add-categories`);

  const categories = await Promise.all(
    Array.from({ length: amount }).map(async () => {
      return await prisma.category.create({
        data: {
          id: nanoid(16),
          name: faker.commerce.department(),
        },
      });
    }),
  );

  console.timeEnd(`add-categories`);
  return categories;
};

async function main() {
  // Confirmation prompt
  const rl = createInterface({ input, output });
  const answer: string = await new Promise((resolve) =>
    rl.question(
      'All data will be deleted. Are you sure to continue? (y/N) ',
      resolve,
    ),
  );

  if (answer.toLowerCase() !== 'y') {
    console.info('Aborted.');
    process.exit();
  }

  // Seeder
  await emptyTable('admins');
  await addAdmin();
  await emptyTable('categories');
  await addCategories(10);

  console.info('Done.');
  process.exit();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
