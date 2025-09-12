import React from 'react';
import { CTAButton } from './CTAButton';
import { routes } from '@/lib/routes';

interface HeroProps {
  title: string;
  subtitle?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  proofLine?: string;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  proofLine,
  className = '',
}) => {
  return (
    <div className={`text-center ${className}`}>
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto text-balance">
          {subtitle}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        {primaryCTA && (
          <CTAButton href={primaryCTA.href} size="lg">
            {primaryCTA.text}
          </CTAButton>
        )}
        
        {secondaryCTA && (
          <CTAButton href={secondaryCTA.href} variant="secondary" size="lg">
            {secondaryCTA.text}
          </CTAButton>
        )}
      </div>

      {proofLine && (
        <p className="text-sm text-gray-500">
          {proofLine}
        </p>
      )}
    </div>
  );
};

export default Hero;
