import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Services – Freelance Web Development in Austin, TX',
  description:
    'Freelance web development services in Austin, TX. MVP development for startups, production apps for businesses, and contract engineering for enterprise. React, Next.js, TypeScript.',
  keywords: [
    'Freelance Web Development Austin TX',
    'Hire Web Developer Austin',
    'MVP Development Austin',
    'React Developer for Hire Austin',
    'Contract Software Engineer Austin Texas',
    'Web App Development Austin',
    'Startup MVP Developer Austin',
    'Technical Consulting Austin',
  ],
  openGraph: {
    title: 'Services | Jarrod Medrano – Freelance Web Developer Austin, TX',
    description:
      'Freelance web development and software engineering services in Austin, TX. MVPs, production apps, and consulting for startups, businesses, and enterprise.',
    url: 'https://www.jarrodmedrano.com/services',
  },
};

const services = [
  {
    id: 'mvp',
    audience: 'For Startups',
    title: 'MVP Development',
    tagline: 'From idea to working product.',
    description:
      'Most MVPs take too long because scope isn\'t locked down early. I help you figure out what to build first, then build it fast. The output is real software on a real domain, not a prototype.',
    features: [
      '0-to-1 product development',
      'User authentication & payments',
      'Third-party API integrations',
      'Deployment on Vercel or AWS',
      'Code you can hand off or build on',
      'Weekly check-ins throughout the build',
    ],
    stack: 'Next.js · TypeScript · Prisma · PostgreSQL · Tailwind CSS',
    cta: 'Most MVPs ship in 4 to 8 weeks.',
  },
  {
    id: 'production',
    audience: 'For Growing Businesses',
    title: 'Production Applications',
    tagline: 'Software your team can actually maintain.',
    description:
      'If your app is held together with workarounds or you\'re afraid to touch certain parts of the codebase, that\'s fixable. I build and refactor web applications to be stable, tested, and easy to extend.',
    features: [
      'Complex business logic & workflows',
      'Multi-user systems with roles & permissions',
      'Performance optimization',
      'Data migration & legacy modernization',
      'Security and dependency audits',
      'Automated testing and CI/CD setup',
    ],
    stack: 'React · Node.js · GraphQL · PostgreSQL · AWS · Docker',
    cta: 'Available to Austin businesses and remote clients.',
  },
  {
    id: 'enterprise',
    audience: 'For Companies',
    title: 'Contract Engineering',
    tagline: 'A senior engineer on your team, short or long term.',
    description:
      'Sometimes you need an extra engineer for a specific project or to cover a gap on the team. I work well with existing teams, pick up codebases quickly, and don\'t need a lot of hand-holding.',
    features: [
      'Embed with existing engineering teams',
      'Frontend, backend, or full-stack',
      'Code reviews and architecture input',
      'React/Next.js modernization',
      'Performance and accessibility audits',
      'Hourly or project-based billing',
    ],
    stack: 'React · TypeScript · Next.js · Node.js · your existing stack',
    cta: 'Short engagements or long ones, both work.',
  },
  {
    id: 'consulting',
    audience: 'For Everyone',
    title: 'Technical Consulting',
    tagline: 'A second opinion before you commit.',
    description:
      'Picking the wrong stack or architecture early can cost months later. I do focused consulting sessions to help you make a call with more confidence, review existing systems, or figure out what\'s actually causing a problem.',
    features: [
      'Architecture and system design review',
      'Tech stack selection',
      'Performance and security audits',
      'Code quality assessment',
      'Migration planning',
      'Team training',
    ],
    stack: 'Not stack-specific. Bring whatever you are working with.',
    cta: 'Hourly sessions or ongoing retainer.',
  },
];

export default function ServicesPage() {
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
                Services
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary font-display leading-tight">
                Freelance Web Development
                {' '}
                <span className="text-text-secondary">in Austin, TX</span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed border-l-2 border-accent-primary/30 pl-6">
                Austin-based, working with clients locally and remotely across the US.
              </p>
              <div className="w-16 h-1 bg-accent-primary/20" />
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-sm font-medium text-accent-primary">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Currently taking on new clients
              </div>
            </div>
          </div>
        </section>

        {/* Services sections */}
        {services.map((service, index) => (
          <section
            key={service.id}
            className={`py-24 relative ${index % 2 === 0 ? 'bg-bg-elevated' : 'bg-bg-surface/50 dark:bg-black/40'}`}
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-text-primary/10 to-transparent" />
            <div className="golden-container">
              <div className="grid lg:grid-cols-2 gap-12 items-start">

                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div>
                    <span className="text-xs font-semibold text-accent-primary uppercase tracking-widest">
                      {service.audience}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary font-display mt-2">
                      {service.title}
                    </h2>
                    <p className="text-lg text-accent-primary font-medium mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-text-secondary leading-relaxed">
                    {service.description}
                  </p>

                  <p className="text-sm text-text-secondary italic border-l-2 border-accent-primary/30 pl-4">
                    {service.cta}
                  </p>
                </div>

                {/* Features card */}
                <div className={`p-8 rounded-lg bg-bg-elevated border border-text-primary/5 shadow-sm dark:shadow-none ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-6">
                    What&apos;s included
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
                        <span className="text-accent-primary mt-0.5 flex-shrink-0">→</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-text-primary/5">
                    <p className="text-xs text-text-secondary font-mono uppercase tracking-wide">
                      {service.stack}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>
        ))}

        {/* CTA section */}
        <section className="py-24 relative bg-bg-deep">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-text-primary/10 to-transparent" />
          <div className="golden-container text-center">
            <div className="max-w-xl mx-auto space-y-4">
              <span className="text-accent-primary uppercase tracking-[0.2em] text-xs font-semibold">
                Hire Me
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary font-display">
                Got a project in Austin?
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Drop me a note with what you&apos;re building. I&apos;ll get back to you
                within a day.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-accent-primary text-white text-sm font-medium rounded-sm hover:bg-accent-primary/90 transition-colors"
                >
                  Start a conversation
                  <span>→</span>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-3 border border-text-primary/10 text-text-secondary text-sm font-medium rounded-sm hover:border-text-primary/30 hover:text-text-primary transition-colors"
                >
                  Learn more about me
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
