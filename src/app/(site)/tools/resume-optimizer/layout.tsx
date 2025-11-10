import React from 'react';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Free ATS Resume Optimizer - Optimize Your Resume for Any Job',
  description:
    'Upload your resume, paste a job description, and get AI-optimized bullets that pass ATS systems. Free first use, instant results.',
  path: '/tools/resume-optimizer',
});

export default function ResumeOptimizerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}











