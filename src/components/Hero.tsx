'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

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
      className="min-h-screen flex items-center justify-center px-6"
    >
      <motion.div
        className="max-w-4xl mx-auto text-center space-y-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-black leading-tight"
          variants={fadeInUp}
        >
          Senior Software Engineer
          <br />
          Full-Stack Development for Startups & Growing Businesses
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
          variants={fadeInUp}
        >
          I build production-ready web applications with Next.js, React, and
          modern backend technologies. Based in Austin, TX. Currently available
          for projects starting March 2026.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeInUp}
        >
          <button
            type="button"
            onClick={() => scrollToSection('work')}
            className="btn-primary"
          >
            View Work ↓
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="btn-secondary"
          >
            Get in Touch
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
