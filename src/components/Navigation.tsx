'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { ThemeToggle } from './ThemeToggle';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect which section is currently in view
      const sections = ['hero', 'work', 'capabilities', 'tech', 'thoughts', 'contact'];
      const offset = 100; // Offset from top to account for navigation

      const currentSection = sections.find((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport (with offset)
          return rect.top <= offset && rect.bottom > offset;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    handleScroll(); // Call once on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 64; // Navigation height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const navItems = [
    { id: 'work', label: 'Work' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'tech', label: 'Tech' },
    { id: 'thoughts', label: 'Thoughts' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 h-20 px-6 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#0a0a0c]/90 backdrop-blur-md py-4 shadow-sm shadow-zinc-200 dark:shadow-black'
          : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="golden-container h-full flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="text-xl font-bold font-display tracking-tight text-neutral-900 dark:text-white hover:text-accent-gold dark:hover:text-orange-200 transition-colors"
        >
          JM
        </button>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`text-sm tracking-wide uppercase transition-all hover:text-accent-gold dark:hover:text-orange-200 relative ${
                  activeSection === item.id
                    ? 'text-neutral-900 dark:text-white after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1px] after:bg-accent-gold/50 dark:after:bg-orange-400/50'
                    : 'text-neutral-500 dark:text-gray-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pl-4 border-l border-neutral-200 dark:border-neutral-800">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
