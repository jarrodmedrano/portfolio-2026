'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { ThemeToggle } from './ThemeToggle';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
    // Close mobile menu after navigation
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'work', label: 'Work' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'tech', label: 'Tech' },
    { id: 'thoughts', label: 'Thoughts' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
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
            className="text-xl font-bold font-display tracking-tight text-neutral-900 dark:text-white hover:text-accent-primary dark:hover:text-orange-200 transition-colors"
          >
            JM
          </button>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm tracking-wide uppercase transition-all hover:text-accent-primary dark:hover:text-orange-200 relative ${
                    activeSection === item.id
                      ? 'text-neutral-900 dark:text-white after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1px] after:bg-accent-primary/50 dark:after:bg-orange-400/50'
                      : 'text-neutral-500 dark:text-gray-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <div className="pl-4 border-l border-neutral-200 dark:border-neutral-800">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Drawer */}
              <motion.div
                className="fixed top-0 right-0 bottom-0 w-[280px] bg-white dark:bg-[#0a0a0c] shadow-2xl z-[101] md:hidden"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
                    <span className="text-lg font-bold font-display text-neutral-900 dark:text-white">
                      Menu
                    </span>
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Navigation Items */}
                  <nav className="flex-1 overflow-y-auto p-6">
                    <div className="flex flex-col gap-2">
                      {navItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => scrollToSection(item.id)}
                          className={`text-left px-4 py-3 rounded-md text-base tracking-wide uppercase transition-all ${
                            activeSection === item.id
                              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold'
                              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
