import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Port New - Full Stack App',
  description: 'A modern full-stack application with Next.js, Prisma, and PostgreSQL',
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
