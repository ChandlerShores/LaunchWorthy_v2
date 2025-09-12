import React from 'react';
import Link from 'next/link';
import { CTAButton } from './CTAButton';
import { Badge } from './Badge';

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  href: string;
  ctaText?: string;
  badge?: string;
  popular?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  price,
  description,
  features,
  href,
  ctaText = 'Book Now',
  badge,
  popular = false,
}) => {
  return (
    <div className={`relative bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300 ${popular ? 'ring-2 ring-primary-500' : ''}`}>
      {badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge variant="default">{badge}</Badge>
        </div>
      )}
      
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge variant="success">Most Popular</Badge>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="text-3xl font-bold text-primary-600 mb-4">{price}</div>
        <p className="text-gray-600 mb-6">{description}</p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
              <svg className="w-3 h-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <CTAButton href={href} className="w-full">
        {ctaText}
      </CTAButton>
    </div>
  );
};

export default ServiceCard;
