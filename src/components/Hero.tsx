'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import GoldenGrid from './GoldenGrid';
import GoldenSpiral from './GoldenSpiral';
import LiquidButton from './LiquidButton';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-deep transition-colors duration-300"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/5 to-transparent dark:from-[#ffffff05] dark:to-transparent pointer-events-none" />
      <GoldenSpiral className="absolute right-[-10%] top-[-10%] w-[60vh] h-[60vh] md:w-[80vh] md:h-[80vh] opacity-50 dark:opacity-70" />

      <GoldenGrid
        className="w-full golden-container"
        main={(
          <motion.div
            className="space-y-8 relative z-10"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="space-y-2">
              <span className="text-gradient-gold dark:text-orange-300/80 uppercase tracking-[0.2em] text-sm font-medium">
                Portfolio 2026
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter">
                <span className="block text-text-primary">Jarrod</span>
                <span className="block text-text-secondary dark:text-text-tertiary">Medrano</span>
              </h1>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-lg border-l-2 border-accent-primary/30 dark:border-orange-500/20 pl-6"
              variants={fadeInUp}
            >
              Senior Software Engineer crafting
              {' '}
              <span className="text-accent-primary dark:text-orange-200">production-ready</span>
              {' '}
              web applications.
              Specializing in Next.js, React, and modern backend architectures.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center gap-6 pt-4"
              variants={fadeInUp}
            >
              <LiquidButton
                type="button"
                onClick={() => scrollToSection('work')}
              >
                View Work
              </LiquidButton>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="text-text-secondary hover:text-text-primary transition-colors duration-300 flex items-center gap-2 group"
              >
                Get in Touch
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>
          </motion.div>
        )}
        sidebar={(
          <div className="hidden lg:flex items-center justify-center h-full relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="relative w-full aspect-square max-w-md"
            >
              <div className="absolute inset-0 border border-text-primary rounded-full opacity-20 dark:opacity-5" />
              <div className="absolute inset-4 border border-text-primary rounded-full opacity-10 dark:opacity-5" />
              <div className="absolute inset-12 border border-text-primary rounded-full opacity-5" />

              {/* Abstract content or perhaps a profile image later */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-light text-text-primary/20 dark:text-text-primary/5 font-display">
                    1.618
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          )}
      />
    </section>
  );
}
