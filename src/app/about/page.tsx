import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About – Freelance Software Engineer in Austin, TX',
  description:
    'Jarrod Medrano is a freelance software engineer based in Austin, TX with 10+ years of experience building production web applications. React, Next.js, TypeScript, Node.js. Available for hire.',
  keywords: [
    'About Jarrod Medrano',
    'Freelance Software Engineer Austin TX',
    'Austin Web Developer',
    'Senior React Developer Austin',
    'Hire Software Engineer Austin Texas',
  ],
  openGraph: {
    title: 'About Jarrod Medrano | Freelance Software Engineer – Austin, TX',
    description:
      'Freelance software engineer in Austin, TX. 10+ years building production apps with React, Next.js, and TypeScript. Available for startups, businesses, and enterprise.',
    url: 'https://www.jarrodmedrano.com/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>

        {/* Hero section */}
        <section className="min-h-[50vh] flex items-center relative overflow-hidden bg-bg-deep pt-32 pb-24">
          {/* Dot grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, #888888 1.5px, transparent 1.5px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/5 to-transparent dark:from-[#ffffff05] dark:to-transparent pointer-events-none" />

          <div className="golden-container relative z-10">
            <div className="space-y-4 max-w-2xl">
              <span className="text-accent-primary uppercase tracking-[0.2em] text-xs font-semibold">
                About
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary font-display leading-tight">
                Jarrod Medrano
              </h1>
              <p className="text-xl text-text-secondary">
                Freelance Software Engineer · Austin, TX
              </p>
              <div className="w-16 h-1 bg-accent-primary/20" />
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-sm font-medium text-accent-primary">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Currently available for new projects
              </div>
            </div>
          </div>
        </section>

        {/* Bio section */}
        <section className="py-24 relative bg-bg-elevated">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-text-primary/10 to-transparent" />
          <div className="golden-container">
            <div className="max-w-2xl space-y-6 text-text-secondary leading-relaxed text-base">
              <p>
                I&apos;ve been building web apps for over 10 years. These days I work
                freelance out of Austin, taking on projects for startups, local businesses,
                and the occasional larger company that needs an extra set of hands.
              </p>
              <p>
                My stack is React and Next.js on the front end, Node.js and PostgreSQL on
                the back. I write tests, I read the docs, and I push code that the next
                person can actually follow. Fast work and clean work aren&apos;t mutually
                exclusive if you&apos;ve done it enough times.
              </p>
              <p>
                Before going freelance I was a senior engineer at a few different companies,
                startup and enterprise both. That range taught me a lot about what slows
                projects down and how to avoid it.
              </p>
              <p>
                I&apos;m Austin-based and do most of my work remotely, though I&apos;m
                happy to meet in person with local clients.
              </p>
            </div>
          </div>
        </section>

        {/* Skills section */}
        <section className="py-24 relative bg-bg-surface/50 dark:bg-black/40">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-text-primary/10 to-transparent" />
          <div className="golden-container">
            <div className="space-y-4 mb-12">
              <span className="text-accent-primary uppercase tracking-[0.2em] text-xs font-semibold">
                Technical Skills
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary font-display">
                What I Work With
              </h2>
              <div className="w-16 h-1 bg-accent-primary/20" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  category: 'Frontend',
                  items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                },
                {
                  category: 'Backend',
                  items: ['Node.js', 'PostgreSQL', 'Prisma', 'GraphQL', 'REST APIs'],
                },
                {
                  category: 'Infrastructure',
                  items: ['AWS', 'Vercel', 'Docker', 'GitHub Actions', 'Supabase'],
                },
                {
                  category: 'Practices',
                  items: ['TDD', 'CI/CD', 'Performance', 'Accessibility', 'Code Review'],
                },
              ].map((group) => (
                <div
                  key={group.category}
                  className="p-6 rounded-lg bg-bg-elevated border border-text-primary/5"
                >
                  <h3 className="text-xs font-semibold text-accent-primary uppercase tracking-widest mb-4">
                    {group.category}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                        <span className="w-1 h-1 rounded-full bg-accent-primary/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-24 relative bg-bg-elevated">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-text-primary/10 to-transparent" />
          <div className="golden-container">
            <div className="max-w-xl">
              <span className="text-accent-primary uppercase tracking-[0.2em] text-xs font-semibold">
                Hire Me
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary font-display mt-4 mb-4">
                Looking to hire a software engineer in Austin?
              </h2>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Send me a note about what you&apos;re working on. If it sounds like a good
                fit I&apos;ll get back to you within a day.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-white text-sm font-medium rounded-sm hover:bg-accent-primary/90 transition-colors"
                >
                  Get in touch
                  <span>→</span>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-text-primary/10 text-text-secondary text-sm font-medium rounded-sm hover:border-text-primary/30 hover:text-text-primary transition-colors"
                >
                  View services
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
