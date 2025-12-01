'use client';

import React from 'react';
import { RewriteApiSuccess } from '@/types/rewrite';

interface Props {
  data: RewriteApiSuccess;
  onStartOver: () => void;
}

export default function OptimizerRewriteResults({ data, onStartOver }: Props) {
  const { bullets, jd_signals, grade } = data;

  const bulletSummaries = bullets.map((b, i) => {
    if (typeof b.score === 'number' && b.letter) {
      return `Bullet ${i + 1}: ${b.letter} (${b.score})`;
    }
    return null;
  }).filter(Boolean) as string[];

  const lowest = bullets
    .map((b, i) => ({ idx: i + 1, score: typeof b.score === 'number' ? b.score : null }))
    .filter(b => b.score !== null) as Array<{ idx: number; score: number }>;
  lowest.sort((a, b) => a.score - b.score);
  const weakest = lowest.length > 0 ? lowest[0] : null;

  const copyAll = async () => {
    const text = bullets.map(b => `• ${b.revised}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied all revised bullets');
    } catch {
      alert('Failed to copy');
    }
  };

  return (
    <div className="space-y-6">
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
        <p className="text-gray-600">
          Review and copy your improved bullets.
          {!!grade && (
            <>
              {' '}Overall: <span className="font-semibold">{grade.letter}</span> ({grade.overall_score}/100)
            </>
          )}
        </p>
        {bulletSummaries.length > 0 && (
          <p className="mt-2 text-sm text-gray-700">
            {bulletSummaries.join(', ')}
            {weakest && weakest.score < 80 && (
              <> — consider improving bullet {weakest.idx}</>
            )}
          </p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={copyAll}
          className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
        >
          Copy All Bullets
        </button>
      </div>

      <div className="grid gap-4">
        {bullets.map((b, i) => (
          <div key={i} className="p-6 bg-white border border-gray-200 rounded-xl">
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Original</p>
              <p className="text-sm text-gray-700">{b.original}</p>
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">Revised</p>
                {(typeof b.score === 'number' && b.letter) && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                    {b.letter} ({b.score})
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-900 font-medium">{b.revised}</p>
            </div>
            {!!b.warnings?.length && (
              <p className="text-xs text-amber-700">Warnings: {b.warnings.join(', ')}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">JD Signals</p>
          <div className="text-sm">
            <p><span className="font-semibold">Matched:</span> {jd_signals.matched.join(', ') || '—'}</p>
            <p><span className="font-semibold">Missing:</span> {jd_signals.missing_but_relevant.join(', ') || '—'}</p>
          </div>
        </div>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Grade</p>
          <div className="text-sm">
            <p><span className="font-semibold">Overall:</span> {grade.overall_score} ({grade.letter})</p>
            <p className="mt-1"><span className="font-semibold">Rationale:</span> {grade.rationale}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <button
          onClick={onStartOver}
          className="px-8 py-3 bg-white border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
        >
          Optimize Another Resume
        </button>
      </div>
    </div>
  );
}


