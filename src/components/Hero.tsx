import React from 'react';
import Image from 'next/image';
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
    <div className={`relative ${className}`}>
      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
        
        {/* Left Side: Content */}
        <div className="text-left space-y-8 hero-content">
          {/* Badge */}
          {badge && (
            <div className="hero-badge">
              <Badge text={badge.text} icon={badge.icon} />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance hero-title tracking-tight leading-tight">
            {title}
          </h1>
          
          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl text-balance hero-subtitle leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-start hero-ctas">
            {primaryCTA && (
              <CTAButton 
                href={primaryCTA.href} 
                size="lg" 
                className="hero-cta-primary bg-copper-500 hover:bg-copper-600 text-white border-copper-500 hover:border-copper-600 font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl"
              >
                {primaryCTA.text}
              </CTAButton>
            )}
            
            {secondaryCTA && (
              <CTAButton 
                href={secondaryCTA.href} 
                variant="outline" 
                size="lg" 
                className="hero-cta-secondary border-2 border-white text-white hover:bg-white hover:text-navy-900 font-semibold px-8 py-4 text-lg bg-transparent hover:shadow-xl"
              >
                {secondaryCTA.text}
              </CTAButton>
            )}
          </div>

          {/* Trust Indicators */}
          {trustIndicators ? (
            <div className="hero-trust-indicators">
              <TrustIndicators 
                avatarCount={trustIndicators.avatarCount}
                rating={trustIndicators.rating}
                location={trustIndicators.location}
                className="text-gray-300"
              />
            </div>
          ) : (
            /* Fallback to original proofLine */
            proofLine && (
              <p className="text-sm text-gray-300 hero-trust-indicators">
                {proofLine}
              </p>
            )
          )}
        </div>

        {/* Right Side: Visual */}
        <div className="relative hero-visual">
          <div className="relative z-10">
            <Image
              src="/Interview_Success.png"
              alt="Career breakthrough moment - confident professional"
              width={600}
              height={600}
              className="w-full h-auto rounded-2xl shadow-2xl object-cover"
              priority={true}
            />
          </div>
          
          {/* Floating accent elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-copper-400 to-orange-500 rounded-full opacity-20 blur-lg"></div>
          <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-copper-300 to-orange-400 rounded-full opacity-25 blur-md"></div>
          
          {/* Success indicators */}
          <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-navy-900">Interview Success</span>
            </div>
          </div>
          
          <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <div>
                <div className="text-sm font-semibold text-navy-900">Job Offer</div>
                <div className="text-xs text-gray-600">In 2 weeks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
