'use client';

import Image from 'next/image';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group">
      {/* Image Container */}
      <div className="relative aspect-video border border-black mb-6 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={800}
          height={450}
          className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      {/* Content Stack */}
      <div className="space-y-4">
        {/* Client/Type Label */}
        <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">
          {project.clientType}
        </p>

        {/* Project Title */}
        <h3 className="text-2xl font-bold text-black">
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
        <div className="flex gap-4 text-sm">
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
    </article>
  );
}
