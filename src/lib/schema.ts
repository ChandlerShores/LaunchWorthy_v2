export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    '@type': string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  contactPoint: {
    '@type': string;
    telephone: string;
    contactType: string;
  };
  sameAs: string[];
}

export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  image: string;
  '@id': string;
  url: string;
  telephone: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification: {
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
  priceRange: string;
}

export interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

export const organizationSchema: OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Launchworthy',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://launchworthy.net',
  logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://launchworthy.net'}/og.jpg`,
  description: 'Practical coaching for early-career professionals. Stop getting ghosted after interviews.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lexington',
    addressRegion: 'KY',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+1-XXX-XXX-XXXX',
    contactType: 'customer service',
  },
  sameAs: [
    'https://linkedin.com/company/launchworthy',
    'https://twitter.com/launchworthy',
  ],
};

export const localBusinessSchema: LocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Launchworthy',
  image: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://launchworthy.net'}/og.jpg`,
  '@id': process.env.NEXT_PUBLIC_BASE_URL || 'https://launchworthy.net',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://launchworthy.net',
  telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+1-XXX-XXX-XXXX',
  address: {
    '@type': 'PostalAddress',
    streetAddress: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || 'Business Address',
    addressLocality: process.env.NEXT_PUBLIC_BUSINESS_CITY || 'City',
    addressRegion: process.env.NEXT_PUBLIC_BUSINESS_STATE || 'State',
    postalCode: process.env.NEXT_PUBLIC_BUSINESS_ZIP || '00000',
    addressCountry: process.env.NEXT_PUBLIC_BUSINESS_COUNTRY || 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: parseFloat(process.env.NEXT_PUBLIC_BUSINESS_LATITUDE || '0'),
    longitude: parseFloat(process.env.NEXT_PUBLIC_BUSINESS_LONGITUDE || '0'),
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
  priceRange: '$50-$300',
};

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
