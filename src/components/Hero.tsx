import React from 'react';
import { CTAButton } from './CTAButton';
import Badge from './Badge';
import TrustIndicators from './TrustIndicators';
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
  // NEW PROPS:
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
  trustIndicators?: {
    avatarCount?: number;
    rating?: number;
    location?: string;
  };
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  proofLine,
  className = '',
  badge,
  trustIndicators,
}) => {
  return (
    <div className={`text-center ${className}`}>
      {/* Badge */}
      {badge && (
        <div className="mb-4">
          <Badge text={badge.text} icon={badge.icon} />
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6 text-balance">
        {title}
      </h1>
      
      {/* Subtitle */}
      {subtitle && (
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto text-balance">
          {subtitle}
        </p>
      )}

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
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

      {/* Trust Indicators */}
      {trustIndicators ? (
        <TrustIndicators 
          avatarCount={trustIndicators.avatarCount}
          rating={trustIndicators.rating}
          location={trustIndicators.location}
        />
      ) : (
        /* Fallback to original proofLine */
        proofLine && (
          <p className="text-sm text-gray-500">
            {proofLine}
          </p>
        )
      )}
    </div>
  );
};

export default Hero;
