import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://www.jarrodmedrano.com/#person',
      name: 'Jarrod Medrano',
      jobTitle: 'Freelance Software Engineer',
      description: 'Freelance software engineer based in Austin, TX specializing in React, Next.js, TypeScript, and full-stack web development. Available for startups, small businesses, and enterprise contracts.',
      url: 'https://www.jarrodmedrano.com',
      image: 'https://www.jarrodmedrano.com/og-image.jpg',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Austin',
        addressRegion: 'TX',
        addressCountry: 'US',
      },
      sameAs: [
        'https://github.com/jarrodmedrano',
        'https://www.linkedin.com/in/jarrod-medrano-b89b0037',
        'https://bsky.app/profile/jarrodmedrano.bsky.social',
      ],
      knowsAbout: [
        'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js',
        'PostgreSQL', 'GraphQL', 'AWS', 'Docker', 'Tailwind CSS',
        'Web Development', 'Software Engineering', 'MVP Development',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://www.jarrodmedrano.com/#service',
      name: 'Jarrod Medrano – Freelance Software Engineering',
      description: 'Freelance web development and software engineering services in Austin, TX. MVP development, production applications, and technical consulting for startups, small businesses, and enterprise clients.',
      url: 'https://www.jarrodmedrano.com/services',
      provider: { '@id': 'https://www.jarrodmedrano.com/#person' },
      areaServed: [
        { '@type': 'City', name: 'Austin', containedIn: 'Texas, United States' },
        { '@type': 'Country', name: 'United States' },
      ],
      serviceType: [
        'Freelance Web Development',
        'MVP Development',
        'React Development',
        'Next.js Development',
        'Full-Stack Development',
        'Technical Consulting',
      ],
    },
  ],
};

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  title: {
    default: 'Jarrod Medrano | Freelance Software Engineer – Austin, TX',
    template: '%s | Jarrod Medrano',
  },
  description:
    'Freelance software engineer in Austin, TX specializing in React, Next.js, and TypeScript. Available for MVP development, production apps, and technical consulting for startups, businesses, and enterprise.',
  keywords: [
    'Freelance Software Engineer Austin',
    'Freelance Web Developer Austin TX',
    'Austin React Developer',
    'Hire Software Engineer Austin',
    'Austin Next.js Developer',
    'Austin TypeScript Developer',
    'Freelance Frontend Developer Austin',
    'Austin Full Stack Developer',
    'Web Developer Austin Texas',
    'Contract Software Engineer Austin',
    'MVP Development Austin',
    'React Developer for Hire',
    'Software Engineer Texas',
    'Jarrod Medrano',
    'Front End Engineer',
    'TypeScript',
    'Next.js',
    'Node.js',
  ],
  authors: [{ name: 'Jarrod Medrano' }],
  creator: 'Jarrod Medrano',
  publisher: 'Jarrod Medrano',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jarrodmedrano.com',
    siteName: 'Jarrod Medrano',
    title: 'Jarrod Medrano | Freelance Software Engineer – Austin, TX',
    description:
      'Freelance software engineer in Austin, TX. React, Next.js, TypeScript. Available for startups, small businesses, and enterprise contracts.',
    images: [
      {
        url: 'https://www.jarrodmedrano.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jarrod Medrano - Freelance Software Engineer Austin TX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jarrod Medrano | Freelance Software Engineer – Austin, TX',
    description:
      'Freelance software engineer in Austin, TX. React, Next.js, TypeScript. Available for hire.',
    images: ['https://www.jarrodmedrano.com/og-image.jpg'],
    creator: '@jarrodmedrano',
  },
  metadataBase: new URL('https://www.jarrodmedrano.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N5C3Z32');`}
        </Script>
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N5C3Z32"
            height="0"
            width="0"
            title="Google Tag Manager"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
