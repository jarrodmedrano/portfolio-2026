'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { techCategories } from '@/data/technologies';
import GoldenGrid from './GoldenGrid';

export default function Technologies() {
  return (
    <section id="tech" className="py-24 relative bg-bg-deep">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,175,55,0.03),transparent_40%)]" />

      <div className="golden-container">
        <GoldenGrid
          main={(
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-accent-gold dark:text-orange-300/60 uppercase tracking-[0.2em] text-xs font-semibold">
                  Stack
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary font-display">
                  Technologies
                </h2>
                <div className="w-16 h-1 bg-orange-500/20" />
              </div>

              <motion.div
                className="grid gap-x-8 gap-y-12 sm:grid-cols-2"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
              >
                {techCategories.map((tech) => (
                  <div key={tech.category} className="space-y-4">
                    <h3 className="text-lg font-bold text-text-primary font-display border-b border-text-primary/10 pb-2">
                      {tech.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tech.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 text-xs text-text-secondary bg-bg-elevated/50 dark:bg-white/5 border border-text-primary/5 dark:border-white/5 rounded-sm hover:border-orange-500/30 hover:text-orange-600 dark:hover:text-orange-100 transition-colors"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
             )}
        />
      </div>
    </section>
  );
}
