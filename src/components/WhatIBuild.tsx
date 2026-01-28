'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import GoldenGrid from './GoldenGrid';

export default function WhatIBuild() {
  const services = [
    {
      title: 'MVP Development',
      tagline: 'Ship your idea in weeks, not months.',
      description:
        'I build functional prototypes and minimum viable products for startups validating ideas. Fast iteration, clean code, production-ready from day one.',
      features: [
        '0-to-1 product development',
        'User authentication & payments',
        'Third-party API integrations',
        'Deployment & hosting setup',
        'Foundation for future scaling',
      ],
      tech: 'Next.js, TypeScript, Prisma, PostgreSQL',
    },
    {
      title: 'Production Applications',
      tagline: 'Robust systems built to scale.',
      description:
        'Full-featured web applications for growing businesses. Database design, API architecture, testing, monitoring, and ongoing maintenance.',
      features: [
        'Complex business logic & workflows',
        'Multi-user systems',
        'Performance optimization',
        'Data migration & modernization',
        'Security best practices',
      ],
      tech: 'React, Node.js, GraphQL, AWS, Docker',
    },
  ];

  return (
    <section id="capabilities" className="py-24 relative bg-[#0f0f11]">
      <div className="golden-container">

        <GoldenGrid
          className="items-start"
          main={(
            <div className="space-y-16">
              {/* Section Header */}
              <div className="space-y-4">
                <span className="text-orange-300/60 uppercase tracking-[0.2em] text-xs font-semibold">
                  Capabilities
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white font-display">
                  What I
                  {' '}
                  <span className="text-gray-600">Build</span>
                </h2>
                <div className="w-16 h-1 bg-orange-500/20" />
              </div>

              <div className="grid gap-12">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="border-l-2 border-white/10 pl-6 group-hover:border-orange-400/50 transition-colors duration-300">
                      <h3 className="text-2xl font-bold text-white mb-2 font-display">
                        {service.title}
                      </h3>
                      <p className="text-lg font-medium text-orange-200/80 mb-4">
                        {service.tagline}
                      </p>
                      <p className="text-gray-400 leading-relaxed max-w-2xl mb-6">
                        {service.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="w-1 h-1 rounded-full bg-orange-400/40" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/5">
                        <p className="text-xs text-gray-600 font-mono uppercase tracking-wide">
                          Stack:
                          {' '}
                          <span className="text-gray-400">{service.tech}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
              )}
          sidebar={(
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="mt-12 lg:mt-0 p-8 rounded-lg bg-white/5 border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <h3 className="text-xl font-bold text-white mb-6 font-display">
                Technical Consulting
              </h3>

              <p className="text-base text-gray-300 mb-6 leading-relaxed">
                Expert guidance when you need it. Code reviews, architecture planning,
                and team mentorship.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Architecture & system design',
                  'Performance & security audits',
                  'Tech migration planning',
                  'Code quality assessment',
                  'Team training',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-400">
                    <span className="text-orange-400 mt-1">→</span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-500 italic border-t border-white/5 pt-4">
                Available for Hourly, Project-based, or Retainer engagements.
              </p>
            </motion.div>
              )}
        />
      </div>
    </section>
  );
}
