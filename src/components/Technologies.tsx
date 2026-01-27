'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { techCategories } from '@/data/technologies';

export default function Technologies() {
  return (
    <section id="tech" className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Technologies</h2>
          <div className="w-full h-px bg-black" aria-hidden="true" />
        </div>

        <motion.ul
          className="space-y-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
        >
          {techCategories.map((tech) => (
            <li key={tech.category} className="text-base">
              <span className="font-bold text-black">
                {tech.category}
                :
              </span>
              {' '}
              <span className="text-gray-700">{tech.items.join(', ')}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
