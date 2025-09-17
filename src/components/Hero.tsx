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
    <div className={`text-center relative ${className}`}>
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-shape floating-shape-1"></div>
        <div className="floating-shape floating-shape-2"></div>
        <div className="floating-shape floating-shape-3"></div>
        <div className="floating-shape floating-shape-4"></div>
        <div className="floating-shape floating-shape-5"></div>
        <div className="floating-shape floating-shape-6"></div>
        <div className="floating-shape floating-shape-7"></div>
        <div className="floating-shape floating-shape-8"></div>
      </div>

      {/* Badge */}
      {badge && (
        <div className="mb-4">
          <Badge text={badge.text} icon={badge.icon} />
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance hero-title tracking-tight hero-title-underline">
        {title}
      </h1>
      
      {/* Subtitle */}
      {subtitle && (
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto text-balance hero-subtitle">
          {subtitle}
        </p>
      )}

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 hero-ctas">
        {primaryCTA && (
          <CTAButton href={primaryCTA.href} size="lg" className="hero-cta-primary">
            {primaryCTA.text}
          </CTAButton>
        )}
        
        {secondaryCTA && (
          <CTAButton href={secondaryCTA.href} variant="secondary" size="lg" className="hero-cta-secondary">
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
          className="text-gray-300 hero-trust-indicators"
        />
      ) : (
        /* Fallback to original proofLine */
        proofLine && (
          <p className="text-sm text-gray-300 hero-trust-indicators">
            {proofLine}
          </p>
        )
      )}
    </div>
  );
};

export default Hero;
