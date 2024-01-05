// prisma/seed.ts

import { PrismaClient, ROLE, AUTH_ACTION } from '@prisma/client';
import * as argon from 'argon2';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const user1 = await prisma.user.upsert({
    where: { emailAddress: 'admin@nanoscale.com' },
    update: {},
    create: {
      firstName: 'Jon',
      lastName: 'Snow',
      emailAddress: 'admin@nanoscale.com',
      phoneNumber: '08028818000',
      authentication: {
        create: {
          password: await argon.hash('password'),
          active: true,
          has2fa: false,
          role: ROLE.ADMINISTRATOR,
          userAuthVerification: {
            create: {
              code: '123456',
              expiry: new Date(),
              action: AUTH_ACTION.ACCOUNT_VERIFICATION,
            },
          },
        },
      },
    },
  });

  console.log({ user1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
