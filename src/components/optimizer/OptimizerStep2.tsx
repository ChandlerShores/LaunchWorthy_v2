'use client';

import React from 'react';
import BulletEditor from './BulletEditor';

interface OptimizerStep2Props {
  bullets: string[];
  editedBullets: string[];
  onUpdate: (index: number, text: string) => void;
  onAdd: (text: string) => void;
  onRemove: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function OptimizerStep2({
  bullets,
  editedBullets,
  onUpdate,
  onAdd,
  onRemove,
  onNext,
  onPrev,
}: OptimizerStep2Props) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Bullets</h2>
        <p className="text-gray-600">
          Take a quick look — we'll handle the rest. Edits are optional.
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary-600">{bullets.length}</p>
          <p className="text-xs text-gray-600">Total Bullets</p>
        </div>
      </div>

      {/* Bullet Editor */}
      <BulletEditor
        bullets={bullets}
        editedBullets={editedBullets}
        onUpdate={onUpdate}
        onAdd={onAdd}
        onRemove={onRemove}
      />

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          onClick={onPrev}
          className="px-6 py-3 text-gray-700 font-semibold hover:text-gray-900 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={editedBullets.length === 0}
          className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Looks Good →
        </button>
      </div>

      {/* Helper Text */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Don't worry about perfection — our AI will optimize these for you in the next steps.
        </p>
      </div>
    </div>
  );
}







