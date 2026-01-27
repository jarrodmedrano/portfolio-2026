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
    liveUrl: 'https://portuguese-verbs.example.com',
    codeUrl: 'https://github.com/jarrodmedrano/portuguese-verbs',
    imageUrl: '/projects/portuguese-verbs.png',
  },
  {
    id: 'jarrod-starter',
    title: 'Full-Stack Starter Template',
    clientType: 'Open Source',
    description:
      'Production-ready Next.js starter with authentication, database, testing, and deployment configurations. Used by 500+ developers to launch MVPs faster.',
    techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth', 'Vitest'],
    liveUrl: 'https://jarrod-starter.example.com',
    codeUrl: 'https://github.com/jarrodmedrano/jarrod-starter',
    imageUrl: '/projects/jarrod-starter.png',
  },
  {
    id: 'story-bible',
    title: 'Story Bible App',
    clientType: 'Client Project',
    description:
      'Collaborative writing tool for screenwriters and novelists. Features character tracking, timeline management, and AI-powered plot suggestions.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS'],
    liveUrl: 'https://story-bible.example.com',
    imageUrl: '/projects/story-bible.png',
  },
  {
    id: 'binary-quiz',
    title: 'Binary Quiz Game',
    clientType: 'Educational',
    description:
      'Interactive learning platform teaching binary, hexadecimal, and other number systems through gamified quizzes. Tracks progress and awards achievements.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
    liveUrl: 'https://binary-quiz.example.com',
    codeUrl: 'https://github.com/jarrodmedrano/binary-quiz',
    imageUrl: '/projects/binary-quiz.png',
  },
];
