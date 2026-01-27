export interface TechCategory {
  category: string;
  items: string[];
}

export const techCategories: TechCategory[] = [
  {
    category: 'Frontend',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Vitest',
      'React Testing Library',
    ],
  },
  {
    category: 'Backend & Data',
    items: [
      'Node.js',
      'PostgreSQL',
      'Prisma',
      'GraphQL',
      'tRPC',
      'JWT Authentication',
      'REST APIs',
    ],
  },
  {
    category: 'DevOps & Infrastructure',
    items: [
      'Vercel',
      'AWS',
      'Docker',
      'Terraform',
      'GitHub Actions',
      'Monitoring & Analytics',
    ],
  },
  {
    category: 'Currently Learning',
    items: ['Rust', 'Advanced Terraform patterns', 'Distributed systems'],
  },
];
