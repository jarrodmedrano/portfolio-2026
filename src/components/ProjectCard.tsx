'use client';

import Image from 'next/image';
import { Project } from '@/data/projects';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      className="group relative rounded-lg bg-bg-surface dark:bg-white/5 overflow-hidden shadow-sm dark:shadow-none border border-border-subtle dark:border-transparent"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Laser Border Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'var(--laser-beam)',
          animation: 'spin 4s linear infinite',
        }}
      />

      <div
        className="absolute inset-[-50%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-[spin_3s_linear_infinite]"
        style={{
          background: 'var(--laser-beam)',
        }}
      />

      {/* Inner Content Mask (The "Card" Background) */}
      <div className="absolute inset-[1px] bg-white dark:bg-[#121214] rounded-lg z-0" />

      {/* Actual Content */}
      <div className="relative z-10 p-4 space-y-4 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full cursor-pointer"
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={800}
                height={450}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0 grayscale"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
            </a>
          ) : (
            <>
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={800}
                height={450}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0 grayscale"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
            </>
          )}
        </div>

        {/* Content Stack */}
        <div className="flex-1 flex flex-col space-y-3">
          {/* Client/Type Label */}
          <p className="text-xs uppercase tracking-[0.2em] text-accent-primary font-medium">
            {project.clientType}
          </p>

          {/* Project Title */}
          <h3 className="text-2xl font-bold text-text-primary font-display">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex-1" />

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-[10px] uppercase tracking-wider border border-border-subtle dark:border-white/10 text-text-tertiary dark:text-gray-400 rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 text-sm pt-2 border-t border-border-subtle dark:border-white/5 mt-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-primary hover:text-text-primary dark:hover:text-white transition-colors flex items-center gap-1 group/link"
              >
                View Live
                <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary dark:text-gray-500 dark:hover:text-white transition-colors"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
