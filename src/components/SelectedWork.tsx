'use client';

import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';
import GoldenGrid from './GoldenGrid';

export default function SelectedWork() {
  return (
    <section id="work" className="py-32 relative bg-bg-surface/50 dark:bg-black/40">
      {/* Subtle Background Highlight */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-text-primary/10 to-transparent" />

      <div className="golden-container">
        <GoldenGrid
          main={(
            <div className="space-y-24">
              {/* Section Title */}
              <div className="space-y-4">
                <span className="text-accent-gold dark:text-orange-300/60 uppercase tracking-[0.2em] text-xs font-semibold">
                  Selected Projects
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary font-display">
                  Crafting Digital
                  {' '}
                  <br />
                  <span className="text-text-secondary">Experiences</span>
                </h2>
                <div className="w-16 h-1 bg-accent-gold/20 dark:bg-orange-500/20" />
              </div>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {projects.map((project, index) => (
                  <div key={project.id} className={`${index % 2 === 1 ? 'md:translate-y-16' : ''}`}>
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
             )}
        />
      </div>
    </section>
  );
}
