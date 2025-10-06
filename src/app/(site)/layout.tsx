import React from 'react';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { defaultMetadata } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomAnalytics from '@/components/Analytics';
import Schema from '@/components/Schema';
import WorkInProgressBanner from '@/components/WorkInProgressBanner';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://js.stripe.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        <Schema type="organization" />
        <CustomAnalytics />
      </head>
      <body className="min-h-screen bg-white">
        <WorkInProgressBanner />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
