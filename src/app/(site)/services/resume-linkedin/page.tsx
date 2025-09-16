import React from 'react';
import { generatePageMetadata } from '@/lib/metadata';
import Section from '@/components/Section';
import Hero from '@/components/Hero';
import TestimonialCard from '@/components/TestimonialCard';
import FAQ from '@/components/FAQ';
import { CTAButton } from '@/components/CTAButton';
import { routes } from '@/lib/routes';

export const metadata = generatePageMetadata({
  title: 'Resume + LinkedIn Polish - Professional Profile Optimization',
  description: 'Get your resume and LinkedIn profile aligned with your story. Includes optimization and a walkthrough call.',
  path: '/services/resume-linkedin',
});

export default function ResumeLinkedInPage() {
  const testimonials = [
    {
      quote: "Chandler completely transformed my LinkedIn profile. The alignment with my resume made my story so much clearer to recruiters.",
      name: "Jessica L.",
      role: "Marketing Manager",
      rating: 5,
    },
  ];

  const faqItems = [
    {
      question: "What exactly gets optimized?",
      answer: "I'll review and rewrite your resume for clarity and impact, optimize your LinkedIn headline and summary, align your experience descriptions, and ensure both tell a consistent story about your professional value.",
    },
    {
      question: "How long does the walkthrough call take?",
      answer: "The walkthrough call is 15-20 minutes where I explain all the changes I made and why, plus answer any questions you have about the new versions.",
    },
    {
      question: "Do I need to provide anything upfront?",
      answer: "Yes, I'll need your current resume, LinkedIn profile URL, and a brief description of your target roles. The more context you provide, the better the optimization.",
    },
    {
      question: "What if I don't like the changes?",
      answer: "I include one round of revisions in the service. We'll discuss any concerns during the walkthrough call and I'll make adjustments as needed.",
    },
    {
      question: "How quickly will I see results?",
      answer: "Most clients see improved recruiter outreach within 2-3 weeks. The key is having a consistent, compelling story across both platforms.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section padding="xl" className="bg-gradient-to-br from-primary-50 to-white">
        <Hero
          title="Resume + LinkedIn Polish"
          subtitle="Align your story across resume and profile for maximum impact"
          primaryCTA={{
            text: "Book Service - $125",
            href: routes.book,
          }}
          secondaryCTA={{
            text: "Learn More",
            href: "#details",
          }}
        />
      </Section>

      {/* Who It's For */}
      <Section id="details">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
            Perfect For
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Anyone whose resume and LinkedIn tell different stories, or whose profiles don't showcase their true value.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Story Inconsistency</h3>
              <p className="text-gray-600">Resume and LinkedIn tell different versions of your career</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Weak Impact</h3>
              <p className="text-gray-600">Profiles don't clearly communicate your value proposition</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Poor Visibility</h3>
              <p className="text-gray-600">Not getting found by the right recruiters and opportunities</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-navy-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">Submit Materials</h3>
              <p className="text-gray-600">
                Send your current resume and LinkedIn profile URL. Include target roles and any specific concerns.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">Optimization</h3>
              <p className="text-gray-600">
                I'll rewrite both documents for clarity, impact, and consistency. Focus on your unique value proposition.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">Walkthrough Call</h3>
              <p className="text-gray-600">
                Quick call to explain all changes, answer questions, and ensure you're confident with the new versions.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* What's Included */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            What You Get
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Resume Optimization</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Complete rewrite for clarity and impact</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">ATS-friendly formatting</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Quantified achievements and results</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Professional summary that sells</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">LinkedIn Optimization</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Compelling headline with keywords</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">About section that tells your story</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Experience descriptions aligned with resume</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Skills and endorsements strategy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonial */}
      <Section className="bg-navy-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            What Clients Say
          </h2>
          <TestimonialCard
            quote={testimonials[0].quote}
            name={testimonials[0].name}
            role={testimonials[0].role}
            rating={testimonials[0].rating}
          />
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <FAQ items={faqItems} />
        </div>
      </Section>

      {/* CTA */}
      <Section padding="xl" className="bg-primary-600 text-white">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Align Your Story?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get your resume and LinkedIn working together to tell a compelling, consistent story about your value.
          </p>
          <CTAButton
            href={routes.book}
            className="bg-white text-primary-600 hover:bg-gray-100"
          >
            Book Resume + LinkedIn Polish - $125
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
