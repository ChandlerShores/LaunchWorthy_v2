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
