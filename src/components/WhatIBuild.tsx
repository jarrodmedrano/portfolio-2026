'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

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
      tech: 'Built with: Next.js, TypeScript, Prisma, PostgreSQL',
    },
    {
      title: 'Production Applications',
      tagline: 'Robust systems built to scale.',
      description:
        'Full-featured web applications for growing businesses. Database design, API architecture, testing, monitoring, and ongoing maintenance.',
      features: [
        'Complex business logic & workflows',
        'Multi-user systems with role-based access',
        'Performance optimization',
        'Data migration & modernization',
        'Security best practices',
      ],
      tech: 'Built with: React, Node.js, GraphQL, AWS, Docker',
    },
  ];

  return (
    <section id="capabilities" className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">What I Build</h2>
          <div className="w-full h-px bg-black" />
        </div>

        {/* Two column services */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              <div className="border-b border-black pb-2 mb-4">
                <h3 className="text-2xl font-semibold text-black">
                  {service.title}
                </h3>
              </div>

              <p className="text-lg font-medium text-black mb-4">
                {service.tagline}
              </p>

              <p className="text-base text-gray-700 leading-normal mb-4">
                {service.description}
              </p>

              <ul className="space-y-2 mb-4">
                {service.features.map((feature) => (
                  <li key={feature} className="text-base text-gray-700">
                    •
                    {' '}
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-gray-600 italic">{service.tech}</p>
            </motion.div>
          ))}
        </div>

        {/* Full width consulting */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <div className="border-b border-black pb-2 mb-4">
            <h3 className="text-2xl font-semibold text-black">
              Technical Consulting
            </h3>
          </div>

          <p className="text-lg font-medium text-black mb-4">
            Expert guidance when you need it.
          </p>

          <p className="text-base text-gray-700 leading-normal mb-4">
            Code reviews, architecture planning, technical debt assessment,
            performance audits, and team mentorship.
          </p>

          <ul className="grid md:grid-cols-2 gap-2 mb-4">
            <li className="text-base text-gray-700">
              • Architecture & system design reviews
            </li>
            <li className="text-base text-gray-700">
              • Performance & security audits
            </li>
            <li className="text-base text-gray-700">
              • Technology selection & migration planning
            </li>
            <li className="text-base text-gray-700">
              • Code quality assessment
            </li>
            <li className="text-base text-gray-700">
              • Team training & best practices
            </li>
          </ul>

          <p className="text-sm text-gray-600 italic">
            Engagement types: Hourly, project-based, or retainer
          </p>
        </motion.div>
      </div>
    </section>
  );
}
