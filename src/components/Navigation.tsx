'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

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
      className={`fixed top-0 left-0 right-0 z-50 h-16 px-6 transition-colors duration-200 ${
        scrolled ? 'bg-black text-white' : 'bg-transparent text-black'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto h-full flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="text-lg font-bold"
        >
          JM
        </button>

        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium transition-all hover:opacity-70"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
