import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  showSeparator?: boolean;
  variant?: 'default' | 'alt';
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id,
  padding = 'lg',
  showSeparator = false,
  variant = 'default'
}) => {
  const paddingClasses = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
    xl: 'py-24 md:py-32',
  };

  // Only apply background class if no explicit background is provided in className
  const hasExplicitBackground = className.includes('bg-');
  const backgroundClass = !hasExplicitBackground 
    ? (variant === 'alt' ? 'bg-navy-50' : 'bg-white')
    : '';

  return (
    <section 
      id={id}
      className={cn(
        'relative w-full',
        paddingClasses[padding],
        backgroundClass,
        className
      )}
    >
      {showSeparator && (
        <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent" />
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;
