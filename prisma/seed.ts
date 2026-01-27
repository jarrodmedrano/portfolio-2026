import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample contact submissions for testing
  const submission1 = await prisma.contactSubmission.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      projectType: 'Web Development',
      message: 'I need a new website for my business.',
      budget: '$5,000 - $10,000',
    },
  });

  const submission2 = await prisma.contactSubmission.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      projectType: 'UI/UX Design',
      message: 'Looking for a UI designer for a mobile app project.',
      budget: '$10,000 - $25,000',
    },
  });

  console.log('Created contact submissions:', { submission1, submission2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
