'use client';

import { useEffect } from 'react';

/**
 * Site Error Boundary for the (site) route group
 * 
 * This component catches unhandled JavaScript errors within the site pages.
 * It inherits the layout from src/app/(site)/layout.tsx.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for monitoring and debugging
    console.error('Site error caught by error boundary:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            className="w-10 h-10 text-red-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We're sorry, but something unexpected happened. Your booking progress has been saved and you can continue where you left off.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button 
            onClick={reset}
            className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Try to reload the page"
          >
            Try Again
          </button>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href="/book"
              className="flex-1 bg-white text-primary-600 border border-primary-600 py-3 px-6 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-center"
              aria-label="Go to booking page"
            >
              Continue Booking
            </a>
            <a 
              href="/"
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-center"
              aria-label="Go to home page"
            >
              Go Home
            </a>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{' '}
            <a 
              href="mailto:hello@launchworthy.net" 
              className="text-primary-600 hover:text-primary-700 underline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
            >
              hello@launchworthy.net
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
