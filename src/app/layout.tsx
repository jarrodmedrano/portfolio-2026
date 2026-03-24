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

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
