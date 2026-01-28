export interface Project {
  id: string;
  title: string;
  clientType: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  codeUrl?: string;
  imageUrl: string;
}

export const projects: Project[] = [
  {
    id: 'portuguese-verbs',
    title: 'Portuguese Verb Conjugator',
    clientType: 'Personal Project',
    description:
      'AI-powered Portuguese language learning tool with real-time verb conjugation, pronunciation guides, and interactive exercises. Built with OpenAI API for natural language processing.',
    techStack: ['Next.js', 'TypeScript', 'OpenAI', 'Tailwind', 'Vercel'],
    liveUrl: 'https://github.com/jarrodmedrano/portuguese-verbs',
    codeUrl: 'https://github.com/jarrodmedrano/portuguese-verbs',
    imageUrl: 'https://placehold.co/800x450/000000/FFFFFF/png?text=Portuguese+Verbs',
  },
  {
    id: 'jarrod-starter',
    title: 'Full-Stack Starter Template',
    clientType: 'Open Source',
    description:
      'Production-ready Next.js starter with authentication, database, testing, and deployment configurations. Used by 500+ developers to launch MVPs faster.',
    techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth', 'Vitest'],
    liveUrl: 'https://github.com/jarrodmedrano/jarrod-starter',
    codeUrl: 'https://github.com/jarrodmedrano/jarrod-starter',
    imageUrl: 'https://placehold.co/800x450/000000/FFFFFF/png?text=Jarrod+Starter',
  },
  {
    id: 'story-bible',
    title: 'Story Bible App',
    clientType: 'Client Project',
    description:
      'Collaborative writing tool for screenwriters and novelists. Features character tracking, timeline management, and AI-powered plot suggestions.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS'],
    liveUrl: 'https://story-bible.com',
    imageUrl: 'https://placehold.co/800x450/000000/FFFFFF/png?text=Story+Bible',
  },
  {
    id: 'binary-quiz',
    title: 'Binary Quiz Game',
    clientType: 'Educational',
    description:
      'Interactive learning platform teaching binary, hexadecimal, and other number systems through gamified quizzes. Tracks progress and awards achievements.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
    liveUrl: 'https://jarrodmedrano.github.io/binary-quiz/',
    codeUrl: 'https://github.com/jarrodmedrano/binary-quiz',
    imageUrl: 'https://placehold.co/800x450/000000/FFFFFF/png?text=Binary+Quiz',
  },
  {
    id: 'guitar-fretboard',
    title: 'Guitar Fretboard',
    clientType: 'Personal Project',
    description:
      'Interactive guitar fretboard visualization tool for learning scales, chords, and intervals. Features customizable tunings and theory reference.',
    techStack: ['React', 'Next.js', 'Tailwind', 'Framer Motion'],
    liveUrl: 'https://guitar-fretboard-six.vercel.app/',
    codeUrl: 'https://github.com/jarrodmedrano/guitar-fretboard',
    imageUrl: 'https://placehold.co/800x450/000000/FFFFFF/png?text=Guitar+Fretboard',
  },
];
