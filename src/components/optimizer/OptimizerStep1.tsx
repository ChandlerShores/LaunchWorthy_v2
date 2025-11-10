'use client';

import React, { useState } from 'react';

interface OptimizerStep1Props {
  onComplete: (bullets: string[]) => void;
}

export default function OptimizerStep1({ onComplete }: OptimizerStep1Props) {
  const [bulletText, setBulletText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);

    // Parse textarea input: split by newlines, filter empty lines, trim each bullet
    const bullets = bulletText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (bullets.length === 0) {
      setError('Please enter at least one bullet point.');
      return;
    }

    onComplete(bullets);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Your Bullet Points</h2>
        <p className="text-gray-600">
          Paste your resume bullets below, one per line. We'll optimize them for you.
        </p>
      </div>

      {/* Textarea Input */}
      <div>
        <label htmlFor="bullet-input" className="block text-sm font-medium text-gray-700 mb-2">
          Resume Bullets
        </label>
        <textarea
          id="bullet-input"
          value={bulletText}
          onChange={(e) => setBulletText(e.target.value)}
          placeholder="• Led a team of 10 engineers to deliver a major product launch&#10;• Increased revenue by 40% through strategic initiatives&#10;• Built and maintained scalable microservices architecture"
          rows={12}
          className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        />
        <p className="mt-2 text-xs text-gray-500">
          Enter one bullet point per line. Empty lines will be ignored.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <p className="font-semibold text-red-900 mb-1">Validation Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          onClick={handleSubmit}
          disabled={bulletText.trim().length === 0}
          className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>

      {/* Trust Indicators */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Private & secure</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Not stored permanently</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            <span>Under 2 minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
