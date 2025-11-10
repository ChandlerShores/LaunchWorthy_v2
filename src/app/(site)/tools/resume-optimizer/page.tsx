import React from 'react';
import Section from '@/components/Section';
import Hero from '@/components/Hero';
import ATSOptimizerFlow from '@/components/optimizer/ATSOptimizerFlow';
import { routes } from '@/lib/routes';

export default function ResumeOptimizerPage() {
  return (
    <>
      {/* Hero Section */}
      <Section padding="lg" className="bg-gradient-to-br from-primary-900/95 to-primary-800/95">
        <Hero
          title="ATS Resume Optimizer"
          subtitle="Upload your resume, paste a job description, get ATS-friendly bullets instantly."
        />
        
        {/* Trust Indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/90">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Free first use</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            <span>Under 2 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>No signup required</span>
          </div>
        </div>
      </Section>

      {/* Optimizer Flow */}
      <Section padding="xl">
        <ATSOptimizerFlow />
      </Section>

      {/* How It Works */}
      <Section className="bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Resume</h3>
              <p className="text-sm text-gray-600">
                We extract your experience bullets from PDF or DOCX files
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Review</h3>
              <p className="text-sm text-gray-600">
                Edit any bullets if needed — or just keep going
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Paste Job</h3>
              <p className="text-sm text-gray-600">
                We analyze the job description for key skills and requirements
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Results</h3>
              <p className="text-sm text-gray-600">
                AI-optimized bullets ready to copy into your resume
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How does this work?</h3>
              <p className="text-gray-600">
                Our AI analyzes your resume bullets and the job description, then rewrites your bullets to highlight
                relevant skills, quantify impact, and use keywords that ATS systems look for.
              </p>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my resume data private?</h3>
              <p className="text-gray-600">
                Yes. Your resume is processed in memory and only sent to our optimization service when you explicitly
                click "Optimize." We don't store your resume or job description permanently after processing completes.
              </p>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What file formats are supported?</h3>
              <p className="text-gray-600">
                We support PDF and DOCX files up to 10MB. For best results, use a text-based resume rather than a
                scanned image.
              </p>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is this really free?</h3>
              <p className="text-gray-600">
                Your first optimization is completely free. If you want to optimize more resumes, you can purchase
                additional credits for $10 (5 optimizations) or upgrade to our full{' '}
                <a href={routes.resumeLinkedin} className="text-primary-600 hover:text-primary-700 font-medium">
                  Resume + LinkedIn service
                </a>{' '}
                for comprehensive professional review.
              </p>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take?</h3>
              <p className="text-gray-600">
                The entire process takes under 2 minutes. After you submit, the AI optimization typically completes in
                30-60 seconds.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="xl" className="bg-primary-600 text-white">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Want Expert Help?</h2>
          <p className="text-xl mb-8 opacity-90">
            While this tool is great for quick optimizations, our professional service includes expert review, strategy
            sessions, and LinkedIn optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={routes.resumeLinkedin}
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              View Full Service
            </a>
            <a
              href={routes.contact}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}











