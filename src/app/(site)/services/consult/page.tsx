import React from 'react';
import { generatePageMetadata } from '@/lib/metadata';
import Section from '@/components/Section';
import Hero from '@/components/Hero';
import TestimonialCard from '@/components/TestimonialCard';
import FAQ from '@/components/FAQ';
import { CTAButton } from '@/components/CTAButton';
import { routes } from '@/lib/routes';

export const metadata = generatePageMetadata({
  title: '30-min Career Consult - Quick Interview & Resume Review',
  description: 'Get 2-3 actionable fixes for your resume, LinkedIn, and interview style in just 30 minutes. Perfect for getting started.',
  path: '/services/consult',
});

export default function ConsultPage() {
  const testimonials = [
    {
      quote: "The 30-minute consult was exactly what I needed. Chandler identified 3 key issues with my resume that I never noticed.",
      name: "Mike T.",
      role: "Recent Graduate",
      rating: 5,
    },
  ];

  const faqItems = [
    {
      question: "What exactly do you review in 30 minutes?",
      answer: "I'll quickly scan your resume for formatting issues, review your LinkedIn profile for consistency, and assess your interview communication style. You'll leave with 2-3 specific, actionable improvements.",
    },
    {
      question: "Do I need to prepare anything?",
      answer: "Just have your current resume ready and be prepared to discuss your interview experiences. The more context you can provide, the better the feedback.",
    },
    {
      question: "Is this just for entry-level professionals?",
      answer: "No, this consult works for anyone at any career stage who wants quick, targeted feedback on their job search materials.",
    },
    {
      question: "What if I need more help after the consult?",
      answer: "Many clients use the consult as a starting point and then book additional services. We can discuss next steps during our session.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section padding="xl" className="bg-gradient-to-br from-primary-50 to-white">
        <Hero
          title="30-min Career Consult"
          subtitle="Quick, targeted feedback on your resume, LinkedIn, and interview style"
          primaryCTA={{
            text: "Book Consult - $50",
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
            Who This Is For
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Perfect for anyone who wants quick, actionable feedback without committing to a full coaching program.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Resume Issues</h3>
              <p className="text-gray-600">Formatting, content gaps, or unclear descriptions</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">LinkedIn Profile</h3>
              <p className="text-gray-600">Inconsistency with resume or weak professional presence</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Interview Style</h3>
              <p className="text-gray-600">Communication issues or unclear answers</p>
            </div>
          </div>
        </div>
      </Section>

      {/* What's Included */}
      <Section className="bg-navy-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            What's Included
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">During the Session</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Resume review and formatting check</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">LinkedIn profile assessment</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Interview style evaluation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Quick mock interview questions</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">You'll Leave With</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">2-3 specific, actionable fixes</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Priority areas to focus on</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Recommendations for next steps</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Confidence in your approach</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonial */}
      <Section>
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
      <Section className="bg-navy-50">
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
            Ready for Quick, Actionable Feedback?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get 2-3 specific fixes in just 30 minutes. Perfect way to start improving your job search.
          </p>
          <CTAButton
            href={routes.book}
            className="bg-white text-primary-600 hover:bg-gray-100"
          >
            Book 30-min Consult - $50
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
