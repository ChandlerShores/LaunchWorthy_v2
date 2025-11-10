'use client';

import React from 'react';

interface ProgressSpinnerProps {
  message?: string;
  subMessage?: string;
}

export default function ProgressSpinner({
  message = 'Processing...',
  subMessage,
}: ProgressSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Spinner */}
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
      </div>

      {/* Message */}
      <p className="text-lg font-semibold text-gray-900 mb-1">{message}</p>
      {subMessage && <p className="text-sm text-gray-600">{subMessage}</p>}

      {/* Pulse indicator */}
      <div className="flex gap-1 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}











