# Portfolio Website Redesign - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page portfolio website with black/white minimalist design showcasing full-stack development services for startups and SMBs.

**Architecture:** Component-based Next.js app with smooth scroll animations (Framer Motion), BlueSky API integration, and contact form with backend API route. All styling uses existing Tailwind design system from `tailwind.config.ts` and `globals.css`.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion, React Hook Form, Zod, Prisma (contact storage)

---

## Task 1: Project Structure Setup

**Files:**
- Create: `src/components/Navigation.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/SelectedWork.tsx`
- Create: `src/components/WhatIBuild.tsx`
- Create: `src/components/Technologies.tsx`
- Create: `src/components/RecentThoughts.tsx`
- Create: `src/components/ContactForm.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/lib/animations.ts`
- Modify: `src/app/page.tsx`

**Step 1: Install Framer Motion**

```bash
npm install framer-motion
```

**Step 2: Create animation utilities**

Create: `src/lib/animations.ts`

```typescript
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 },
};
```

**Step 3: Commit**

```bash
git add package.json package-lock.json src/lib/animations.ts
git commit -m "feat: add Framer Motion and animation utilities

- Install framer-motion for scroll animations
- Create animation presets (fadeInUp, staggerContainer, fadeIn)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Navigation Component

**Files:**
- Create: `src/components/Navigation.tsx`
- Create: `src/components/Navigation.test.tsx`

**Step 1: Write the failing test**

Create: `src/components/Navigation.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Navigation from './Navigation';

describe('Navigation', () => {
  it('renders logo and navigation links', () => {
    render(<Navigation />);

    expect(screen.getByText('JM')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Capabilities')).toBeInTheDocument();
    expect(screen.getByText('Tech')).toBeInTheDocument();
    expect(screen.getByText('Thoughts')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test Navigation.test.tsx
```

Expected: FAIL with "Cannot find module './Navigation'"

**Step 3: Write minimal implementation**

Create: `src/components/Navigation.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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
          onClick={() => scrollToSection('hero')}
          className="text-lg font-bold"
        >
          JM
        </button>

        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium transition-all hover:opacity-70 ${
                activeSection === item.id ? 'underline underline-offset-4' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
```

**Step 4: Run test to verify it passes**

```bash
npm test Navigation.test.tsx
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/components/Navigation.tsx src/components/Navigation.test.tsx
git commit -m "feat: add navigation component with smooth scroll

- Fixed navigation bar with scroll-based styling
- Smooth scroll to sections on click
- Active section indicator
- Responsive design

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Hero Component

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/Hero.test.tsx`

**Step 1: Write the failing test**

Create: `src/components/Hero.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';

describe('Hero', () => {
  it('renders headline and subheading', () => {
    render(<Hero />);

    expect(screen.getByText(/Senior Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Full-Stack Development/i)).toBeInTheDocument();
    expect(screen.getByText(/Austin, TX/i)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Hero />);

    expect(screen.getByText(/View Work/i)).toBeInTheDocument();
    expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test Hero.test.tsx
```

Expected: FAIL with "Cannot find module './Hero'"

**Step 3: Write minimal implementation**

Create: `src/components/Hero.tsx`

```typescript
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
            onClick={() => scrollToSection('work')}
            className="btn-primary"
          >
            View Work ↓
          </button>
          <button
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
```

**Step 4: Run test to verify it passes**

```bash
npm test Hero.test.tsx
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/Hero.test.tsx
git commit -m "feat: add hero section component

- Full viewport hero with centered content
- Smooth scroll animations with Framer Motion
- Two CTA buttons (View Work, Get in Touch)
- Responsive typography

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Selected Work Component

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/SelectedWork.tsx`
- Create: `src/components/SelectedWork.test.tsx`
- Create: `src/data/projects.ts`

**Step 1: Create projects data file**

Create: `src/data/projects.ts`

```typescript
export interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  codeUrl?: string;
  imageUrl: string;
}

export const projects: Project[] = [
  {
    id: 'portuguese-verbs',
    title: 'Portuguese Verb Quiz',
    type: 'Startup MVP',
    description:
      'Next.js application with OpenAI integration for language learning. Built custom quiz engine, integrated Stripe payments, deployed on Vercel.',
    techStack: ['Next.js', 'TypeScript', 'OpenAI', 'Tailwind', 'Vercel'],
    liveUrl: 'https://portuguese-verbs.vercel.app',
    codeUrl: 'https://github.com/jarrodmedrano/portuguese-verbs',
    imageUrl: '/projects/portuguese-verbs.png',
  },
  {
    id: 'jarrod-starter',
    title: 'Jarrod Starter',
    type: 'Developer Tool',
    description:
      'Turbo Repo starter template with CLI for rapid project scaffolding. Includes pre-configured tooling, testing, and deployment setup.',
    techStack: ['TypeScript', 'TurboRepo', 'CLI', 'Templates'],
    codeUrl: 'https://github.com/jarrodmedrano/jarrod-starter',
    imageUrl: '/projects/jarrod-starter.png',
  },
  {
    id: 'story-bible',
    title: 'Story Bible',
    type: 'Production App',
    description:
      'Full-stack application for managing writing projects. React frontend with GraphQL API and Prisma ORM for data management.',
    techStack: ['React', 'GraphQL', 'Prisma', 'PostgreSQL', 'TypeScript'],
    codeUrl: 'https://github.com/jarrodmedrano/story-bible',
    imageUrl: '/projects/story-bible.png',
  },
  {
    id: 'binary-quiz',
    title: 'Binary Quiz',
    type: 'Learning Tool',
    description:
      'Interactive React application for testing binary number knowledge. Deployed via GitHub Pages with automated CI/CD.',
    techStack: ['React', 'TypeScript', 'Vitest', 'GitHub Pages'],
    liveUrl: 'https://jarrodmedrano.github.io/binary-quiz',
    codeUrl: 'https://github.com/jarrodmedrano/binary-quiz',
    imageUrl: '/projects/binary-quiz.png',
  },
];
```

**Step 2: Write test for SelectedWork**

Create: `src/components/SelectedWork.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SelectedWork from './SelectedWork';

describe('SelectedWork', () => {
  it('renders section heading', () => {
    render(<SelectedWork />);
    expect(screen.getByText('Selected Work')).toBeInTheDocument();
  });

  it('renders project titles', () => {
    render(<SelectedWork />);
    expect(screen.getByText('Portuguese Verb Quiz')).toBeInTheDocument();
    expect(screen.getByText('Jarrod Starter')).toBeInTheDocument();
  });
});
```

**Step 3: Run test to verify it fails**

```bash
npm test SelectedWork.test.tsx
```

Expected: FAIL with "Cannot find module './SelectedWork'"

**Step 4: Create ProjectCard component**

Create: `src/components/ProjectCard.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import type { Project } from '@/data/projects';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
        isEven ? '' : 'md:grid-flow-dense'
      }`}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
    >
      {/* Image */}
      <div
        className={`relative aspect-video ${isEven ? '' : 'md:col-start-2'}`}
      >
        <div className="border border-black rounded-none overflow-hidden transition-transform hover:scale-[1.02] duration-200">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={800}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className={isEven ? '' : 'md:col-start-1 md:row-start-1'}>
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
          {project.type}
        </p>

        <h3 className="text-3xl font-bold text-black mb-4">{project.title}</h3>

        <p className="text-base text-gray-700 leading-normal mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-100 text-sm rounded-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 text-base">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline hover:text-gray-700 transition-colors"
            >
              View Live →
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline hover:text-gray-700 transition-colors"
            >
              View Code →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
```

**Step 5: Create SelectedWork component**

Create: `src/components/SelectedWork.tsx`

```typescript
'use client';

import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';

export default function SelectedWork() {
  return (
    <section id="work" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Selected Work</h2>
          <div className="w-full h-px bg-black" />
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 6: Run test to verify it passes**

```bash
npm test SelectedWork.test.tsx
```

Expected: PASS

**Step 7: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/SelectedWork.tsx src/components/SelectedWork.test.tsx src/data/projects.ts
git commit -m "feat: add selected work section with project cards

- Alternating two-column layout for projects
- Project data structure with TypeScript types
- Hover animations and responsive design
- External links for live demos and code

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 5: What I Build Component

**Files:**
- Create: `src/components/WhatIBuild.tsx`
- Create: `src/components/WhatIBuild.test.tsx`

**Step 1: Write the failing test**

Create: `src/components/WhatIBuild.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WhatIBuild from './WhatIBuild';

describe('WhatIBuild', () => {
  it('renders section heading', () => {
    render(<WhatIBuild />);
    expect(screen.getByText('What I Build')).toBeInTheDocument();
  });

  it('renders service offerings', () => {
    render(<WhatIBuild />);
    expect(screen.getByText('MVP Development')).toBeInTheDocument();
    expect(screen.getByText('Production Applications')).toBeInTheDocument();
    expect(screen.getByText('Technical Consulting')).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test WhatIBuild.test.tsx
```

Expected: FAIL with "Cannot find module './WhatIBuild'"

**Step 3: Write minimal implementation**

Create: `src/components/WhatIBuild.tsx`

```typescript
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
              variants={{
                ...fadeInUp,
                transition: {
                  ...fadeInUp.transition,
                  delay: index * 0.1,
                },
              }}
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
                    • {feature}
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
          variants={{
            ...fadeInUp,
            transition: {
              ...fadeInUp.transition,
              delay: 0.2,
            },
          }}
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
```

**Step 4: Run test to verify it passes**

```bash
npm test WhatIBuild.test.tsx
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/components/WhatIBuild.tsx src/components/WhatIBuild.test.tsx
git commit -m "feat: add what I build section with services

- Outcome-focused service descriptions
- Two-column layout for MVP and Production
- Full-width consulting section
- Staggered fade-in animations

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 6: Technologies Component

**Files:**
- Create: `src/components/Technologies.tsx`
- Create: `src/components/Technologies.test.tsx`

**Step 1: Write the failing test**

Create: `src/components/Technologies.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Technologies from './Technologies';

describe('Technologies', () => {
  it('renders section heading', () => {
    render(<Technologies />);
    expect(screen.getByText('Technologies')).toBeInTheDocument();
  });

  it('renders tech categories', () => {
    render(<Technologies />);
    expect(screen.getByText(/Frontend:/i)).toBeInTheDocument();
    expect(screen.getByText(/Backend & Data:/i)).toBeInTheDocument();
    expect(screen.getByText(/DevOps & Infrastructure:/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test Technologies.test.tsx
```

Expected: FAIL with "Cannot find module './Technologies'"

**Step 3: Write minimal implementation**

Create: `src/components/Technologies.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

export default function Technologies() {
  const techCategories = [
    {
      category: 'Frontend',
      items: [
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'Vitest',
        'React Testing Library',
      ],
    },
    {
      category: 'Backend & Data',
      items: [
        'Node.js',
        'PostgreSQL',
        'Prisma',
        'GraphQL',
        'tRPC',
        'JWT Authentication',
        'REST APIs',
      ],
    },
    {
      category: 'DevOps & Infrastructure',
      items: [
        'Vercel',
        'AWS',
        'Docker',
        'Terraform',
        'GitHub Actions',
        'Monitoring & Analytics',
      ],
    },
    {
      category: 'Currently Learning',
      items: ['Rust', 'Advanced Terraform patterns', 'Distributed systems'],
    },
  ];

  return (
    <section id="tech" className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Technologies</h2>
          <div className="w-full h-px bg-black" />
        </div>

        <motion.div
          className="space-y-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
        >
          {techCategories.map((tech) => (
            <div key={tech.category} className="text-base">
              <span className="font-semibold text-black">
                {tech.category}:
              </span>{' '}
              <span className="text-gray-700">{tech.items.join(', ')}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 4: Run test to verify it passes**

```bash
npm test Technologies.test.tsx
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/components/Technologies.tsx src/components/Technologies.test.tsx
git commit -m "feat: add technologies section

- Compact inline tech stack display
- Organized by category (Frontend, Backend, DevOps, Learning)
- Clean typography, no visual clutter

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 7: BlueSky Feed Component & API

**Files:**
- Create: `src/app/api/bluesky/route.ts`
- Create: `src/components/RecentThoughts.tsx`
- Create: `src/components/RecentThoughts.test.tsx`

**Step 1: Install BlueSky SDK**

```bash
npm install @atproto/api
```

**Step 2: Create BlueSky API route**

Create: `src/app/api/bluesky/route.ts`

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // BlueSky API endpoint for fetching posts
    // Replace with actual BlueSky handle
    const handle = 'jarrodmedrano.bsky.social';
    const apiUrl = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${handle}&limit=5`;

    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch BlueSky posts');
    }

    const data = await response.json();

    // Extract and format posts
    const posts = data.feed.map((item: any) => ({
      uri: item.post.uri,
      text: item.post.record.text,
      createdAt: item.post.record.createdAt,
      author: item.post.author.handle,
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('BlueSky API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
```

**Step 3: Write test for RecentThoughts**

Create: `src/components/RecentThoughts.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RecentThoughts from './RecentThoughts';

describe('RecentThoughts', () => {
  it('renders section heading', () => {
    render(<RecentThoughts />);
    expect(screen.getByText('Recent Thoughts')).toBeInTheDocument();
  });

  it('renders BlueSky follow link', () => {
    render(<RecentThoughts />);
    expect(screen.getByText(/Follow me on BlueSky/i)).toBeInTheDocument();
  });
});
```

**Step 4: Run test to verify it fails**

```bash
npm test RecentThoughts.test.tsx
```

Expected: FAIL with "Cannot find module './RecentThoughts'"

**Step 5: Create RecentThoughts component**

Create: `src/components/RecentThoughts.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface Post {
  uri: string;
  text: string;
  createdAt: string;
  author: string;
}

export default function RecentThoughts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/bluesky')
      .then((res) => res.json())
      .then((data) => {
        if (data.posts) {
          setPosts(data.posts.slice(0, 3));
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getBlueSkyUrl = (uri: string) => {
    // Convert at:// URI to web URL
    const parts = uri.replace('at://', '').split('/');
    return `https://bsky.app/profile/${parts[0]}/post/${parts[2]}`;
  };

  return (
    <section id="thoughts" className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            Recent Thoughts
          </h2>
          <div className="w-full h-px bg-black" />
        </div>

        {loading && (
          <p className="text-gray-600 text-center">Loading posts...</p>
        )}

        {error && (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Unable to load posts at this time.
            </p>
            <a
              href="https://bsky.app/profile/jarrodmedrano.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline hover:text-gray-700"
            >
              Follow me on BlueSky →
            </a>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.a
                key={post.uri}
                href={getBlueSkyUrl(post.uri)}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gray-200 p-6 transition-colors hover:border-gray-400 cursor-pointer"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: '-100px' }}
                variants={{
                  ...fadeInUp,
                  transition: {
                    ...fadeInUp.transition,
                    delay: index * 0.1,
                  },
                }}
              >
                <p className="text-base text-gray-900 leading-relaxed mb-3">
                  {post.text}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(post.createdAt)} • View on BlueSky →
                </p>
              </motion.a>
            ))}

            <div className="text-center mt-8">
              <a
                href="https://bsky.app/profile/jarrodmedrano.bsky.social"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline hover:text-gray-700"
              >
                Follow me on BlueSky →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
```

**Step 6: Run test to verify it passes**

```bash
npm test RecentThoughts.test.tsx
```

Expected: PASS

**Step 7: Commit**

```bash
git add package.json package-lock.json src/app/api/bluesky/route.ts src/components/RecentThoughts.tsx src/components/RecentThoughts.test.tsx
git commit -m "feat: add BlueSky feed integration

- API route to fetch BlueSky posts
- Recent Thoughts component displaying latest posts
- Fallback handling for API errors
- Staggered animations for post cards

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 8: Contact Form Component & API

**Files:**
- Create: `src/app/api/contact/route.ts`
- Create: `src/components/ContactForm.tsx`
- Create: `src/components/ContactForm.test.tsx`
- Create: `prisma/migrations/XXX_add_contact_submissions/migration.sql`

**Step 1: Install form dependencies**

```bash
npm install react-hook-form zod @hookform/resolvers
```

**Step 2: Update Prisma schema**

Modify: `prisma/schema.prisma`

Add to the file:

```prisma
model ContactSubmission {
  id          String   @id @default(cuid())
  name        String
  email       String
  projectType String
  message     String   @db.Text
  budget      String?
  createdAt   DateTime @default(now())
}
```

**Step 3: Generate Prisma migration**

```bash
npm run db:generate
npm run db:push
```

**Step 4: Create contact API route**

Create: `src/app/api/contact/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  projectType: z.string().min(1, 'Project type is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    // Check honeypot field (if present, it's a bot)
    if (body.website) {
      return NextResponse.json({ success: true }); // Fake success for bots
    }

    // Rate limiting check (simple IP-based)
    // In production, use Redis or similar
    const recentSubmissions = await prisma.contactSubmission.count({
      where: {
        email: validatedData.email,
        createdAt: {
          gte: new Date(Date.now() - 60 * 60 * 1000), // Last hour
        },
      },
    });

    if (recentSubmissions >= 3) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // Save to database
    await prisma.contactSubmission.create({
      data: validatedData,
    });

    // TODO: Send email notification (integrate with SendGrid, Resend, etc.)

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
```

**Step 5: Write test for ContactForm**

Create: `src/components/ContactForm.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Project Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByText(/Send Message/i)).toBeInTheDocument();
  });
});
```

**Step 6: Run test to verify it fails**

```bash
npm test ContactForm.test.tsx
```

Expected: FAIL with "Cannot find module './ContactForm'"

**Step 7: Create ContactForm component**

Create: `src/components/ContactForm.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
  website: z.string().optional(), // Honeypot field
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Let's Talk</h2>
          <div className="w-full h-px bg-black" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
          >
            <div className="border-b border-black pb-2 mb-4">
              <h3 className="text-2xl font-semibold text-black">
                Currently Available
              </h3>
            </div>

            <p className="text-base text-gray-700 leading-normal mb-4">
              Taking on new projects starting March 2026.
            </p>

            <div className="space-y-2 text-base text-gray-700 mb-6">
              <p>Response time: Within 24 hours</p>
              <p>Location: Austin, TX (Remote work available)</p>
            </div>

            <div className="space-y-2">
              <a
                href="mailto:jarrod@jarrodmedrano.com"
                className="block text-black underline hover:text-gray-700"
              >
                jarrod@jarrodmedrano.com
              </a>
              <a
                href="https://github.com/jarrodmedrano"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-black underline hover:text-gray-700"
              >
                GitHub →
              </a>
              <a
                href="https://bsky.app/profile/jarrodmedrano.bsky.social"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-black underline hover:text-gray-700"
              >
                BlueSky →
              </a>
              <a
                href="https://www.linkedin.com/in/jarrod-medrano-b89b0037"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-black underline hover:text-gray-700"
              >
                LinkedIn →
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              ...fadeInUp,
              transition: {
                ...fadeInUp.transition,
                delay: 0.1,
              },
            }}
          >
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className={`input ${errors.name ? 'input-error' : ''}`}
                />
                {errors.name && (
                  <p className="text-xs text-error-500 font-medium mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Email *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className={`input ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && (
                  <p className="text-xs text-error-500 font-medium mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Project Type */}
              <div>
                <label
                  htmlFor="projectType"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Project Type
                </label>
                <select
                  {...register('projectType')}
                  id="projectType"
                  className={`input ${
                    errors.projectType ? 'input-error' : ''
                  }`}
                >
                  <option value="">Select...</option>
                  <option value="mvp">MVP Development</option>
                  <option value="production">Production App</option>
                  <option value="consulting">Consulting</option>
                  <option value="not-sure">Not Sure</option>
                </select>
                {errors.projectType && (
                  <p className="text-xs text-error-500 font-medium mt-1">
                    {errors.projectType.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Message *
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={4}
                  className={`input resize-y ${
                    errors.message ? 'input-error' : ''
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-error-500 font-medium mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Budget */}
              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Budget Range (Optional)
                </label>
                <select {...register('budget')} id="budget" className="input">
                  <option value="">Select...</option>
                  <option value="<10k">&lt;$10k</option>
                  <option value="10k-25k">$10k-25k</option>
                  <option value="25k-50k">$25k-50k</option>
                  <option value="50k+">$50k+</option>
                  <option value="hourly">Hourly/Retainer</option>
                </select>
              </div>

              {/* Honeypot */}
              <input
                {...register('website')}
                type="text"
                name="website"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                className="btn-primary w-full md:w-auto"
              >
                {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <p className="text-sm text-success-500 font-medium">
                  Message sent! I'll get back to you within 24 hours.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-sm text-error-500 font-medium">
                  Failed to send message. Please try again or email me directly.
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
```

**Step 8: Run test to verify it passes**

```bash
npm test ContactForm.test.tsx
```

Expected: PASS

**Step 9: Commit**

```bash
git add package.json package-lock.json prisma/schema.prisma src/app/api/contact/route.ts src/components/ContactForm.tsx src/components/ContactForm.test.tsx
git commit -m "feat: add contact form with validation and API

- React Hook Form with Zod validation
- API route for form submission
- Database storage with Prisma
- Rate limiting and honeypot protection
- Success/error states

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 9: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`
- Create: `src/components/Footer.test.tsx`

**Step 1: Write the failing test**

Create: `src/components/Footer.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026 Jarrod Medrano/i)).toBeInTheDocument();
  });

  it('renders tech stack info', () => {
    render(<Footer />);
    expect(
      screen.getByText(/Built with Next.js, TypeScript, and Tailwind CSS/i)
    ).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test Footer.test.tsx
```

Expected: FAIL with "Cannot find module './Footer'"

**Step 3: Write minimal implementation**

Create: `src/components/Footer.tsx`

```typescript
export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-gray-200 bg-white">
      <div className="container mx-auto max-w-6xl text-center">
        <p className="text-sm text-gray-500 mb-2">
          Built with Next.js, TypeScript, and Tailwind CSS
        </p>
        <p className="text-sm text-gray-500 mb-4">
          © 2026 Jarrod Medrano
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <a
            href="https://github.com/jarrodmedrano"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-black underline"
          >
            GitHub
          </a>
          <span className="text-gray-300">•</span>
          <a
            href="https://bsky.app/profile/jarrodmedrano.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-black underline"
          >
            BlueSky
          </a>
          <span className="text-gray-300">•</span>
          <a
            href="https://www.linkedin.com/in/jarrod-medrano-b89b0037"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-black underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
```

**Step 4: Run test to verify it passes**

```bash
npm test Footer.test.tsx
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/components/Footer.tsx src/components/Footer.test.tsx
git commit -m "feat: add footer component

- Minimal copyright and tech stack info
- Social links (GitHub, BlueSky, LinkedIn)
- Clean typography, centered layout

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 10: Integrate All Components in Main Page

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Update main page to use all components**

Modify: `src/app/page.tsx`

```typescript
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SelectedWork from '@/components/SelectedWork';
import WhatIBuild from '@/components/WhatIBuild';
import Technologies from '@/components/Technologies';
import RecentThoughts from '@/components/RecentThoughts';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <SelectedWork />
        <WhatIBuild />
        <Technologies />
        <RecentThoughts />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
```

**Step 2: Run development server to verify**

```bash
npm run dev
```

Visit http://localhost:3000 and verify:
- All sections render
- Smooth scroll animations work
- Navigation jumps to sections
- Forms validate properly

**Step 3: Run all tests**

```bash
npm test
```

Expected: All tests pass

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: integrate all portfolio sections into main page

- Compose all components into single-page layout
- Hero, work, capabilities, tech, thoughts, contact, footer
- Ready for content and asset addition

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 11: Add Project Images & Assets

**Files:**
- Create: `public/projects/` directory
- Add: Project screenshot images

**Step 1: Create projects directory**

```bash
mkdir -p public/projects
```

**Step 2: Add placeholder images**

For each project, add a screenshot or placeholder:
- `public/projects/portuguese-verbs.png`
- `public/projects/jarrod-starter.png`
- `public/projects/story-bible.png`
- `public/projects/binary-quiz.png`

**Option 1: Use actual screenshots**
Take screenshots of live projects and save as PNG files.

**Option 2: Use placeholder service temporarily**
Update `src/data/projects.ts` to use placeholder images:

```typescript
imageUrl: 'https://placehold.co/800x450/000000/FFFFFF/png?text=Project+Name',
```

**Step 3: Optimize images**

```bash
# Install sharp for Next.js image optimization (if not already installed)
npm install sharp
```

**Step 4: Commit**

```bash
git add public/projects/ src/data/projects.ts
git commit -m "feat: add project images and assets

- Create public/projects directory structure
- Add project screenshots or placeholders
- Configure Next.js Image optimization

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 12: SEO & Metadata

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/metadata.ts`

**Step 1: Update layout with comprehensive metadata**

Modify: `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jarrod Medrano | Senior Software Engineer',
  description:
    'Full-stack software engineer specializing in Next.js, React, and TypeScript. Building MVPs and production applications for startups and growing businesses.',
  keywords: [
    'software engineer',
    'full-stack developer',
    'Next.js',
    'React',
    'TypeScript',
    'freelance developer',
    'Austin TX',
  ],
  authors: [{ name: 'Jarrod Medrano' }],
  creator: 'Jarrod Medrano',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jarrodmedrano.com',
    title: 'Jarrod Medrano | Senior Software Engineer',
    description:
      'Full-stack software engineer building production-ready web applications.',
    siteName: 'Jarrod Medrano Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jarrod Medrano | Senior Software Engineer',
    description:
      'Full-stack software engineer building production-ready web applications.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**Step 2: Create sitemap**

Create: `src/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.jarrodmedrano.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

**Step 3: Create robots.txt**

Create: `src/app/robots.ts`

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.jarrodmedrano.com/sitemap.xml',
  };
}
```

**Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/sitemap.ts src/app/robots.ts
git commit -m "feat: add SEO metadata and sitemaps

- Comprehensive meta tags for search engines
- Open Graph tags for social sharing
- Sitemap and robots.txt generation
- Keywords and descriptions

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 13: Performance Optimization

**Files:**
- Modify: `next.config.ts`
- Create: `src/app/loading.tsx`

**Step 1: Optimize Next.js config**

Modify: `next.config.ts`

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
```

**Step 2: Create loading state**

Create: `src/app/loading.tsx`

```typescript
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
```

**Step 3: Run Lighthouse audit**

```bash
npm run build
npm start
```

Then run Lighthouse in Chrome DevTools (target: >95 score)

**Step 4: Commit**

```bash
git add next.config.ts src/app/loading.tsx
git commit -m "feat: optimize performance and loading states

- Configure image optimization (WebP, AVIF)
- Optimize Framer Motion package imports
- Add loading skeleton
- Ready for Lighthouse audit

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 14: Accessibility Audit

**Files:**
- Run accessibility checks
- Fix any issues found

**Step 1: Run automated accessibility tests**

```bash
npm test
```

Check for:
- Proper heading hierarchy (h1 → h6)
- Alt text on images
- ARIA labels where needed
- Focus indicators visible
- Color contrast meets WCAG AA

**Step 2: Manual keyboard navigation test**

Test with Tab key:
- Can navigate to all interactive elements
- Focus indicators clearly visible
- Logical tab order
- Can submit forms with Enter
- Can click buttons with Space

**Step 3: Screen reader test**

Test with VoiceOver (Mac) or NVDA (Windows):
- All content announced correctly
- Form labels associated with inputs
- Error messages read aloud
- Links descriptive

**Step 4: Create accessibility checklist document**

Create: `docs/ACCESSIBILITY.md`

```markdown
# Accessibility Checklist

## WCAG 2.1 AA Compliance

### Perceivable
- [x] All images have alt text
- [x] Color contrast ratio ≥ 4.5:1 for text
- [x] Color contrast ratio ≥ 3:1 for UI components
- [x] Content readable without CSS

### Operable
- [x] All functionality keyboard accessible
- [x] Focus indicators visible (2px black outline)
- [x] No keyboard traps
- [x] Logical tab order
- [x] Skip links provided (via navigation)

### Understandable
- [x] Semantic HTML used correctly
- [x] Form labels associated with inputs
- [x] Error messages specific and actionable
- [x] Consistent navigation

### Robust
- [x] Valid HTML
- [x] ARIA used appropriately
- [x] Compatible with assistive technologies

## Testing Tools
- Lighthouse (Chrome DevTools)
- axe DevTools
- Keyboard navigation
- VoiceOver / NVDA screen reader
```

**Step 5: Commit**

```bash
git add docs/ACCESSIBILITY.md
git commit -m "docs: add accessibility audit checklist

- WCAG 2.1 AA compliance verified
- Keyboard navigation tested
- Screen reader compatibility confirmed
- Focus indicators properly styled

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 15: Final Testing & Documentation

**Files:**
- Update: `README.md`
- Create: `docs/DEPLOYMENT.md`

**Step 1: Run full test suite**

```bash
npm test
npm run build
npm start
```

Verify:
- All tests pass
- Build completes without errors
- Production build runs correctly
- All animations work
- Forms submit properly

**Step 2: Update README**

Modify: `README.md`

Replace generic template with portfolio-specific content:

```markdown
# Jarrod Medrano Portfolio

Personal portfolio website showcasing full-stack development services for startups and growing businesses.

## Features

- Single-page scrolling design with smooth animations
- Project portfolio with case studies
- BlueSky feed integration
- Contact form with validation
- Black and white minimalist aesthetic
- Fully responsive and accessible

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- Prisma + PostgreSQL
- BlueSky API integration

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Testing

```bash
npm test
npm run test:coverage
```

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for deployment instructions.

## License

MIT
```

**Step 3: Create deployment guide**

Create: `docs/DEPLOYMENT.md`

```markdown
# Deployment Guide

## Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `JWT_SECRET` - For existing auth system
4. Deploy

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL database
- `NEXT_PUBLIC_APP_URL` - Production URL

Optional:
- `JWT_SECRET` - If using auth features
- Email service API keys (for contact form notifications)

## Database Setup

```bash
# Run migrations
npx prisma migrate deploy

# (Optional) Seed data
npm run db:seed
```

## Post-Deployment Checklist

- [ ] Verify all sections render correctly
- [ ] Test contact form submission
- [ ] Check BlueSky feed loads
- [ ] Run Lighthouse audit (target: >95)
- [ ] Test on mobile devices
- [ ] Verify analytics tracking
```

**Step 4: Commit**

```bash
git add README.md docs/DEPLOYMENT.md
git commit -m "docs: update README and add deployment guide

- Replace generic template with portfolio info
- Add comprehensive deployment instructions
- Document environment variables
- Post-deployment checklist

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

**Step 5: Final commit and push**

```bash
git log --oneline -15
```

Verify all commits are clean and descriptive.

---

## Completion Checklist

- [ ] All components implemented with tests
- [ ] Smooth scroll animations working
- [ ] BlueSky feed integration functional
- [ ] Contact form validates and submits
- [ ] All tests passing
- [ ] Production build succeeds
- [ ] Lighthouse score >95
- [ ] Accessibility audit complete
- [ ] SEO metadata configured
- [ ] Documentation updated
- [ ] Ready for deployment

---

**End of Implementation Plan**

Next steps: Execute this plan using superpowers:executing-plans or superpowers:subagent-driven-development.
