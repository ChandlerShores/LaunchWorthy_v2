import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'success';
  children?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ 
  text, 
  icon, 
  className = "", 
  variant = 'default',
  children
}) => {
  const displayText = text || children;
  if (!displayText) return null;

  const baseClasses = "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium max-w-fit";
  
  const variantClasses = {
    default: "bg-white/70 ring-1 ring-primary-200 text-primary-700",
    primary: "bg-primary-600 text-white",
    success: "bg-success-600 text-white"
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {icon || (
        <span 
          className="inline-block h-2 w-2 rounded-full bg-primary-600" 
          aria-hidden="true" 
        />
      )}
      <span className="truncate">{displayText}</span>
    </div>
  );
};

export default Badge;
