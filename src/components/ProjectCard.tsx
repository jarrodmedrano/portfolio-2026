'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      className="grid md:grid-cols-5 gap-8 items-center mb-16"
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Image - 60% width (3 columns) */}
      <div
        className={`md:col-span-3 ${isEven ? 'md:order-1' : 'md:order-2 md:col-start-3'}`}
      >
        <div className="relative aspect-video border border-black overflow-hidden group">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={800}
            height={450}
            className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-102"
          />
        </div>
      </div>

      {/* Content - 40% width (2 columns) */}
      <div
        className={`md:col-span-2 space-y-4 ${isEven ? 'md:order-2' : 'md:order-1 md:col-start-1 md:row-start-1'}`}
      >
        {/* Client/Type Label */}
        <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">
          {project.clientType}
        </p>

        {/* Project Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-black">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-base text-gray-700 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 text-base">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline hover:text-gray-600 transition-colors"
            >
              View Live →
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline hover:text-gray-600 transition-colors"
            >
              View Code →
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
