import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Jarrod Medrano | Senior Front End Engineer',
    template: '%s | Jarrod Medrano',
  },
  description:
    'Senior Front End Engineer specializing in React, TypeScript, and modern web technologies. Building exceptional user experiences with a focus on performance and accessibility.',
  keywords: [
    'Front End Engineer',
    'React Developer',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'UI/UX',
    'Performance Optimization',
    'Accessibility',
    'Next.js',
    'Software Engineer',
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
    title: 'Jarrod Medrano | Senior Front End Engineer',
    description:
      'Senior Front End Engineer specializing in React, TypeScript, and modern web technologies. Building exceptional user experiences with a focus on performance and accessibility.',
    images: [
      {
        url: 'https://www.jarrodmedrano.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jarrod Medrano - Senior Front End Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jarrod Medrano | Senior Front End Engineer',
    description:
      'Senior Front End Engineer specializing in React, TypeScript, and modern web technologies.',
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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
