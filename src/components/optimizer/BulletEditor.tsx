'use client';

import React, { useState } from 'react';

interface BulletEditorProps {
  bullets: string[];
  editedBullets: string[];
  onUpdate: (index: number, text: string) => void;
  onRemove: (index: number) => void;
  onAdd: (text: string) => void;
}

export default function BulletEditor({
  bullets,
  editedBullets,
  onUpdate,
  onRemove,
  onAdd,
}: BulletEditorProps) {
  const [newBullet, setNewBullet] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddBullet = () => {
    if (newBullet.trim()) {
      onAdd(newBullet.trim());
      setNewBullet('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Existing Bullets */}
      <div className="space-y-3">
        {bullets.map((bullet, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
          >
            {/* Bullet Point */}
            <div className="flex-shrink-0 mt-1">
              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {editingIndex === index ? (
                <textarea
                  value={editedBullets[index]}
                  onChange={(e) => onUpdate(index, e.target.value)}
                  onBlur={() => setEditingIndex(null)}
                  autoFocus
                  rows={3}
                  className="w-full p-2 text-sm border border-primary-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              ) : (
                <p
                  onClick={() => setEditingIndex(index)}
                  className="text-sm text-gray-900 cursor-text hover:text-gray-700"
                >
                  {editedBullets[index]}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex-shrink-0 flex items-center gap-2">
              {editingIndex === index ? (
                <button
                  onClick={() => setEditingIndex(null)}
                  className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                >
                  Done
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setEditingIndex(index)}
                    className="text-gray-400 hover:text-primary-600 transition-colors"
                    title="Edit bullet"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => onRemove(index)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    title="Remove bullet"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Bullet */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={newBullet}
            onChange={(e) => setNewBullet(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddBullet();
              }
            }}
            placeholder="Add a new bullet point..."
            className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            onClick={handleAddBullet}
            disabled={!newBullet.trim()}
            className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-gray-500 text-center">
        Click any bullet to edit. Changes are automatically saved.
      </p>
    </div>
  );
}







