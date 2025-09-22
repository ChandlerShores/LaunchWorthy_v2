import React from 'react';
import { generatePageMetadata } from '@/lib/metadata';
import Section from '@/components/Section';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import ServiceQuiz from '@/components/ServiceQuiz';
import { services, routes } from '@/lib/routes';

export const metadata = generatePageMetadata({
  title: 'Services - Interview Coaching & Career Development',
  description: 'Choose from our range of coaching services: career consults, resume optimization, interview prep, and ongoing mentorship.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Section padding="lg" className="bg-gradient-to-br from-navy-900/95 to-navy-800/95">
        <Hero
          title="Our Services"
          subtitle="From quick consults to comprehensive coaching programs, we have the right solution for your career goals."
        />
      </Section>

      {/* Service Quiz */}
      <Section>
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-2">Find your best fit</h2>
        </div>
        <ServiceQuiz />
      </Section>

      {/* Process Overview */}
      <Section className="bg-navy-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8">
            How We Work Together
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold text-navy-900 mb-2">Discovery</h3>
            <p className="text-gray-600">
              We start by understanding your current situation, goals, and challenges.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold text-navy-900 mb-2">Strategy</h3>
            <p className="text-gray-600">
              We develop a personalized approach based on your specific needs and industry.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold text-navy-900 mb-2">Execution</h3>
            <p className="text-gray-600">
              We implement the plan with hands-on coaching and practice sessions.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="xl" className="bg-primary-600 text-white">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Book a consultation to discuss which service is right for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={routes.book}
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Book a Session
            </a>
            <a
              href={routes.contact}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Ask Questions
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
