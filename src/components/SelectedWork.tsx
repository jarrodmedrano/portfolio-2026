'use client';

import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/animations';
import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';

export default function SelectedWork() {
  return (
    <section id="work" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Selected Work
          </h2>
          <div className="h-px bg-black w-full" />
        </div>

        {/* Projects List */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
