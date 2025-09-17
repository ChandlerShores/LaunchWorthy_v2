import React from 'react';
import { cn } from '@/lib/utils';

interface TrustIndicatorsProps {
  avatarCount?: number;
  rating?: number;
  location?: string;
  className?: string;
}

const TrustIndicators: React.FC<TrustIndicatorsProps> = ({
  avatarCount = 3,
  rating = 5,
  location = "Lexington",
  className = ""
}) => {
  // Safe validation and clamping
  const safeAvatarCount = Math.max(1, Math.min(5, Math.floor(avatarCount)));
  const safeRating = Math.max(1, Math.min(5, Math.floor(rating)));

  return (
    <div className={cn("flex items-center justify-center gap-3 text-sm text-gray-500 py-2", className)}>
      {/* Avatar Stack */}
      <div className="flex -space-x-1" aria-hidden="true">
        {Array.from({ length: safeAvatarCount }).map((_, index) => (
          <span 
            key={index} 
            className={cn(
              "inline-block h-6 w-6 rounded-full bg-primary-100 ring-2 ring-navy-900",
              index > 0 && "-ml-1"
            )}
          />
        ))}
      </div>
      
      {/* Trust Text */}
      <span>
        Trusted by grads and young pros in {location}
      </span>
      
      {/* Star Rating */}
      <span 
        className="inline-flex items-center gap-1 text-warning-500"
        aria-label={`${safeRating} star rating`}
      >
        {Array.from({ length: safeRating }).map((_, index) => (
          <span key={index} aria-hidden="true">★</span>
        ))}
      </span>
    </div>
  );
};

export default TrustIndicators;
