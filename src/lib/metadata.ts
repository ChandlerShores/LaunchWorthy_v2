import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: {
    template: '%s | Launchworthy',
    default: 'Launchworthy - Stop Getting Ghosted After Interviews',
  },
  description: '21 days from "decent" to "obvious hire." Practical coaching for early-career professionals in Lexington.',
  keywords: [
    'interview coaching',
    'career coaching',
    'job interview prep',
    'resume optimization',
    'LinkedIn profile',
    'interview skills',
    'Lexington career coach',
    'early career coaching',
  ],
  authors: [{ name: 'Launchworthy' }],
  creator: 'Launchworthy',
  publisher: 'Launchworthy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://launchworthy.net'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon-180x180.png', sizes: '180x180', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/favicon-180x180.png',
    shortcut: '/favicon.ico'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://launchworthy.net',
    siteName: 'Launchworthy',
    title: 'Launchworthy - Stop Getting Ghosted After Interviews',
    description: '21 days from "decent" to "obvious hire." Practical coaching for early-career professionals.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Launchworthy - Interview Coaching',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Launchworthy - Stop Getting Ghosted After Interviews',
    description: '21 days from "decent" to "obvious hire." Practical coaching for early-career professionals.',
    images: ['/og.jpg'],
  },
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
};

export function generatePageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `https://launchworthy.net${path}`,
    },
    openGraph: {
      title,
      description,
      url: `https://launchworthy.net${path}`,
    },
    twitter: {
      title,
      description,
    },
  };
}
