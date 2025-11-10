'use client';

import React from 'react';

interface SkillChipProps {
  skill: string;
  category?: 'hard' | 'soft' | 'tool' | 'requirement';
  onRemove?: () => void;
  editable?: boolean;
}

export default function SkillChip({
  skill,
  category = 'hard',
  onRemove,
  editable = true,
}: SkillChipProps) {
  const colors = {
    hard: 'bg-blue-100 text-blue-700 border-blue-200',
    soft: 'bg-purple-100 text-purple-700 border-purple-200',
    tool: 'bg-green-100 text-green-700 border-green-200',
    requirement: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full border ${colors[category]} transition-all`}
    >
      <span>{skill}</span>
      {editable && onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
          aria-label="Remove"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}











