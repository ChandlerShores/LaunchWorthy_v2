import React from 'react';
import { organizationSchema, localBusinessSchema, generateFAQSchema } from '@/lib/schema';

interface SchemaProps {
  type: 'organization' | 'localBusiness' | 'faq';
  faqs?: Array<{ question: string; answer: string }>;
}

const Schema: React.FC<SchemaProps> = ({ type, faqs }) => {
  let schema;

  switch (type) {
    case 'organization':
      schema = organizationSchema;
      break;
    case 'localBusiness':
      schema = localBusinessSchema;
      break;
    case 'faq':
      if (!faqs) {
        console.warn('FAQ schema requires faqs prop');
        return null;
      }
      schema = generateFAQSchema(faqs);
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
};

export default Schema;
