'use client';

import { motion } from 'framer-motion';

export default function GoldenSpiral({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full stroke-accent-primary fill-none" strokeWidth="0.5">
        {/* Rough Golden Spiral representation */}
        <motion.path
          d="M50 50 L90 50 A40 40 0 0 1 50 90 A40 40 0 0 1 10 50 A40 40 0 0 1 50 10 A40 40 0 0 1 90 50"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <motion.rect
          x="50"
          y="10"
          width="40"
          height="40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1, duration: 1 }}
        />
        <motion.rect
          x="10"
          y="10"
          width="40"
          height="40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2, duration: 1 }}
        />
        <motion.rect
          x="10"
          y="50"
          width="40"
          height="40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 1.4, duration: 1 }}
        />
      </svg>
    </div>
  );
}
