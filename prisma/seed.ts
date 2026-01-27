import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User',
    },
  });

  console.log('Created user:', user);

  // Create some sample posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Welcome to Port New',
      content: 'This is a sample blog post created during database seeding.',
      published: true,
      authorId: user.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Getting Started with Next.js',
      content: 'Next.js is a powerful React framework for building web applications.',
      published: true,
      authorId: user.id,
    },
  });

  console.log('Created posts:', { post1, post2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
