'use client';

import React, { useState } from 'react';
import { parseJobDescription, ParsedJD } from '@/lib/jd-parser';
import SkillChip from './SkillChip';

interface OptimizerStep3Props {
  jdText: string;
  parsedJD: ParsedJD | null;
  onJDChange: (text: string) => void;
  onParsedJDUpdate: (parsed: ParsedJD) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function OptimizerStep3({
  jdText,
  parsedJD,
  onJDChange,
  onParsedJDUpdate,
  onNext,
  onPrev,
}: OptimizerStep3Props) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Parse the JD
    const parsed = parseJobDescription(jdText);
    onParsedJDUpdate(parsed);
    
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 500);
  };

  const removeSkill = (category: keyof Pick<ParsedJD, 'hardSkills' | 'tools' | 'softSkills'>, skill: string) => {
    if (!parsedJD) return;
    
    const updated = {
      ...parsedJD,
      [category]: parsedJD[category].filter(s => s !== skill),
    };
    onParsedJDUpdate(updated);
  };

  const canProceed = jdText.trim().length >= 50;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Paste the Job Description</h2>
        <p className="text-gray-600">
          We'll analyze what skills and requirements matter most.
        </p>
      </div>

      {/* Text Area */}
      <div>
        <label htmlFor="jd-text" className="block text-sm font-medium text-gray-700 mb-2">
          Job Description
        </label>
        <textarea
          id="jd-text"
          value={jdText}
          onChange={(e) => onJDChange(e.target.value)}
          placeholder="Paste the full job description here..."
          rows={12}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        />
        <p className="mt-2 text-sm text-gray-500">
          {jdText.length} characters • {jdText.trim().length >= 50 ? '✓ Ready' : 'Minimum 50 characters'}
        </p>
      </div>

      {/* Analyze Button */}
      {canProceed && !parsedJD && (
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Job Description'}
        </button>
      )}

      {/* Parsed Results */}
      {parsedJD && (
        <div className="space-y-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
          {/* Job Title & Seniority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                value={parsedJD.jobTitle}
                onChange={(e) =>
                  onParsedJDUpdate({ ...parsedJD, jobTitle: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seniority Level</label>
              <select
                value={parsedJD.seniority}
                onChange={(e) =>
                  onParsedJDUpdate({
                    ...parsedJD,
                    seniority: e.target.value as ParsedJD['seniority'],
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead/Principal</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>

          {/* Hard Skills */}
          {parsedJD.hardSkills.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technical Skills ({parsedJD.hardSkills.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {parsedJD.hardSkills.map((skill) => (
                  <SkillChip
                    key={skill}
                    skill={skill}
                    category="hard"
                    onRemove={() => removeSkill('hardSkills', skill)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tools */}
          {parsedJD.tools.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tools & Technologies ({parsedJD.tools.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {parsedJD.tools.map((tool) => (
                  <SkillChip
                    key={tool}
                    skill={tool}
                    category="tool"
                    onRemove={() => removeSkill('tools', tool)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Soft Skills */}
          {parsedJD.softSkills.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soft Skills ({parsedJD.softSkills.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {parsedJD.softSkills.map((skill) => (
                  <SkillChip
                    key={skill}
                    skill={skill}
                    category="soft"
                    onRemove={() => removeSkill('softSkills', skill)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Helper Text */}
          <p className="text-xs text-gray-500 italic pt-2 border-t border-gray-300">
            Tap any skill to adjust — or keep going! We'll optimize your bullets to match these keywords.
          </p>
        </div>
      )}

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
          disabled={!canProceed}
          className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>

      {/* Privacy Note */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Your data is processed securely and only sent once you confirm in the next step.
        </p>
      </div>
    </div>
  );
}











