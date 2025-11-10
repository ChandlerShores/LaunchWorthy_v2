'use client';

import React, { useState } from 'react';
import { ParsedJD } from '@/lib/jd-parser';
import { OptimizerSettings } from '@/hooks/useATSOptimizerFlow';
import { canUseOptimizer } from '@/lib/optimizer-usage';

interface OptimizerStep4Props {
  bulletCount: number;
  parsedJD: ParsedJD | null;
  settings: OptimizerSettings;
  onSettingsUpdate: (updates: Partial<OptimizerSettings>) => void;
  onSubmit: () => void;
  onPrev: () => void;
  isProcessing: boolean;
}

export default function OptimizerStep4({
  bulletCount,
  parsedJD,
  settings,
  onSettingsUpdate,
  onSubmit,
  onPrev,
  isProcessing,
}: OptimizerStep4Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const usage = canUseOptimizer();

  const topSkills = parsedJD
    ? [...parsedJD.hardSkills.slice(0, 3), ...parsedJD.tools.slice(0, 2)]
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Optimize</h2>
        <p className="text-gray-600">Review what we'll send and customize your preferences.</p>
      </div>

      {/* Summary Card */}
      <div className="p-6 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl border border-primary-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What We'll Optimize</h3>

        <div className="space-y-3">
          {/* Bullet Count */}
          <div className="flex items-center justify-between py-2 border-b border-primary-200">
            <span className="text-gray-700">Resume Bullets</span>
            <span className="font-semibold text-gray-900">{bulletCount} bullets</span>
          </div>

          {/* Job Title */}
          {parsedJD && (
            <div className="flex items-center justify-between py-2 border-b border-primary-200">
              <span className="text-gray-700">Target Role</span>
              <span className="font-semibold text-gray-900">{parsedJD.jobTitle}</span>
            </div>
          )}

          {/* Seniority */}
          {parsedJD && parsedJD.seniority !== 'unknown' && (
            <div className="flex items-center justify-between py-2 border-b border-primary-200">
              <span className="text-gray-700">Level</span>
              <span className="font-semibold text-gray-900 capitalize">{parsedJD.seniority}</span>
            </div>
          )}

          {/* Top Skills */}
          {topSkills.length > 0 && (
            <div className="py-2">
              <span className="text-gray-700 block mb-2">Targeting Keywords</span>
              <div className="flex flex-wrap gap-2">
                {topSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white text-primary-700 text-sm font-medium rounded-full border border-primary-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Settings (Collapsible) */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
        >
          <span className="font-semibold text-gray-900">Advanced Settings</span>
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showAdvanced && (
          <div className="p-6 space-y-4 bg-white">
            {/* Tone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Writing Tone</label>
              <div className="grid grid-cols-3 gap-2">
                {(['professional', 'concise', 'dynamic'] as const).map((tone) => (
                  <button
                    key={tone}
                    onClick={() => onSettingsUpdate({ tone })}
                    className={`py-2 px-4 rounded-lg border-2 font-medium transition-colors ${
                      settings.tone === tone
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Length */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Length: {settings.maxLen} words
              </label>
              <input
                type="range"
                min="25"
                max="35"
                value={settings.maxLen}
                onChange={(e) => onSettingsUpdate({ maxLen: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Concise (25)</span>
                <span>Detailed (35)</span>
              </div>
            </div>

            {/* Variants */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Variants per Bullet
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => onSettingsUpdate({ variants: num })}
                    className={`py-2 px-4 rounded-lg border-2 font-medium transition-colors ${
                      settings.variants === num
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Usage Status */}
      {!usage.allowed && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> You've used your free optimization. Payment will be required to continue.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={isProcessing}
        className="w-full py-4 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Optimize My Resume'
        )}
      </button>

      {/* Navigation */}
      <div className="flex items-center justify-center pt-4">
        <button
          onClick={onPrev}
          disabled={isProcessing}
          className="px-6 py-2 text-gray-700 font-semibold hover:text-gray-900 transition-colors disabled:opacity-50"
        >
          ← Back
        </button>
      </div>

      {/* Privacy Footer */}
      <div className="pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          By clicking "Optimize," you confirm that the information above will be sent to our secure optimization
          service.
        </p>
        <p className="text-xs text-gray-500 mt-2">Your data is not stored after processing completes.</p>
      </div>
    </div>
  );
}











