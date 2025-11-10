'use client';

import React, { useEffect, useState } from 'react';
import ProgressSpinner from './ProgressSpinner';

interface OptimizerResultsProps {
  jobId: string;
  onStartOver: () => void;
}

interface OptimizedBullet {
  original: string;
  revised: string[];
  scores?: {
    relevance?: number;
    impact?: number;
    clarity?: number;
  };
}

export default function OptimizerResults({ jobId, onStartOver }: OptimizerResultsProps) {
  const [status, setStatus] = useState<'processing' | 'completed' | 'error'>('processing');
  const [results, setResults] = useState<OptimizedBullet[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Poll for results
  useEffect(() => {
    let pollInterval: NodeJS.Timeout;
    let attempts = 0;
    const maxAttempts = 60; // 60 attempts = 60 seconds

    const checkStatus = async () => {
      attempts++;

      try {
        // First check status
        const statusRes = await fetch(`/api/ats/check-status/${jobId}`);

        if (!statusRes.ok) {
          throw new Error('Failed to check status');
        }

        const statusData = await statusRes.json();

        if (statusData.status === 'completed') {
          // Fetch results
          const resultsRes = await fetch(`/api/ats/get-results/${jobId}`);

          if (!resultsRes.ok) {
            throw new Error('Failed to fetch results');
          }

          const resultsData = await resultsRes.json();

          // Extract bullets from first candidate
          if (resultsData.candidates && resultsData.candidates.length > 0) {
            const candidate = resultsData.candidates[0];
            const bullets: OptimizedBullet[] = [];

            if (candidate.original_bullets && candidate.revised_bullets) {
              for (let i = 0; i < candidate.original_bullets.length; i++) {
                bullets.push({
                  original: candidate.original_bullets[i],
                  revised: Array.isArray(candidate.revised_bullets[i])
                    ? candidate.revised_bullets[i]
                    : [candidate.revised_bullets[i]],
                  scores: candidate.scores?.[i],
                });
              }
            }

            setResults(bullets);
            setStatus('completed');
            clearInterval(pollInterval);
          }
        } else if (statusData.status === 'failed') {
          setError('Optimization failed. Please try again.');
          setStatus('error');
          clearInterval(pollInterval);
        } else if (attempts >= maxAttempts) {
          setError('Optimization timed out. Please try again.');
          setStatus('error');
          clearInterval(pollInterval);
        }
      } catch (err) {
        console.error('Polling error:', err);
        if (attempts >= maxAttempts) {
          setError('Unable to retrieve results. Please try again.');
          setStatus('error');
          clearInterval(pollInterval);
        }
      }
    };

    // Start polling immediately and then every second
    checkStatus();
    pollInterval = setInterval(checkStatus, 1000);

    return () => clearInterval(pollInterval);
  }, [jobId]);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyAllBullets = async (variant: number = 0) => {
    if (!results) return;

    const allText = results.map((bullet) => `• ${bullet.revised[variant] || bullet.revised[0]}`).join('\n');

    try {
      await navigator.clipboard.writeText(allText);
      setCopiedIndex(-1);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy all:', err);
    }
  };

  // Processing state
  if (status === 'processing') {
    return (
      <div className="space-y-6">
        <ProgressSpinner
          message="Optimizing your resume..."
          subMessage="This usually takes 30-60 seconds. Please don't close this page."
        />

        <div className="max-w-md mx-auto p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            <strong>What we're doing:</strong> Our AI is analyzing your bullets against the job description and
            crafting optimized versions that highlight relevant skills and impact.
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'error') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={onStartOver}
            className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Success state with results
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Resume is Optimized!</h2>
        <p className="text-gray-600">Review the improvements and copy what you like.</p>
      </div>

      {/* Copy All Button */}
      <div className="flex justify-center">
        <button
          onClick={() => copyAllBullets()}
          className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          {copiedIndex === -1 ? 'Copied!' : 'Copy All Bullets'}
        </button>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results?.map((bullet, index) => (
          <div
            key={index}
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-primary-300 transition-colors"
          >
            {/* Original */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Original</p>
              <p className="text-sm text-gray-700">{bullet.original}</p>
            </div>

            {/* Optimized Versions */}
            <div className="space-y-3">
              {bullet.revised.map((revised, variantIndex) => (
                <div key={variantIndex} className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">
                        Optimized {bullet.revised.length > 1 ? `Version ${variantIndex + 1}` : ''}
                      </p>
                      <p className="text-sm text-gray-900 font-medium">{revised}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(revised, index * 10 + variantIndex)}
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-primary-600 transition-colors"
                      title="Copy"
                    >
                      {copiedIndex === index * 10 + variantIndex ? (
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-gray-200">
        <button
          onClick={onStartOver}
          className="px-8 py-3 bg-white border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
        >
          Optimize Another Resume
        </button>
      </div>

      {/* Feedback */}
      <div className="text-center pt-4">
        <p className="text-sm text-gray-600">
          Found this helpful?{' '}
          <a href="/services/resume-linkedin" className="text-primary-600 hover:text-primary-700 font-medium">
            Get professional resume review
          </a>
        </p>
      </div>
    </div>
  );
}











