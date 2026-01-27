'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

export default function Technologies() {
  const techCategories = [
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

  return (
    <section id="tech" className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Technologies</h2>
          <div className="w-full h-px bg-black" />
        </div>

        <motion.div
          className="space-y-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
        >
          {techCategories.map((tech) => (
            <div key={tech.category} className="text-base">
              <span className="font-bold text-black">
                {tech.category}
                :
              </span>
              {' '}
              <span className="text-gray-700">{tech.items.join(', ')}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
