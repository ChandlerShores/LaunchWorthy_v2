import React from 'react';
import { generatePageMetadata } from '@/lib/metadata';
import Section from '@/components/Section';
import Hero from '@/components/Hero';
import TestimonialCard from '@/components/TestimonialCard';
import FAQ from '@/components/FAQ';
import { CTAButton } from '@/components/CTAButton';
import { routes } from '@/lib/routes';

export const metadata = generatePageMetadata({
  title: 'Stop Getting Ghosted - Complete Interview Coaching Program',
  description: 'Baseline mock → coaching → final mock with recordings and notes. Transform from decent to obvious hire in 3 weeks.',
  path: '/services/stop-getting-ghosted',
});

export default function StopGettingGhostedPage() {
  const testimonials = [
    {
      quote: "This program was a game-changer. I went from getting zero callbacks to multiple offers. The mock interviews were incredibly valuable.",
      name: "David K.",
      role: "Software Developer",
      company: "Tech Company",
      rating: 5,
    },
    {
      quote: "The coaching gave me frameworks I actually use. My confidence in interviews is completely different now.",
      name: "Maria S.",
      role: "Project Manager",
      rating: 5,
    },
  ];

  const faqItems = [
    {
      question: "How long does the program take?",
      answer: "The program runs about 3 weeks total. You'll have your baseline mock in week 1, coaching sessions in week 2, and final mock in week 3. We'll work around your schedule.",
    },
    {
      question: "What exactly happens in each phase?",
      answer: "Baseline mock: I evaluate your current interview skills with detailed notes. Coaching: We work on storytelling, STAR method, and confidence. Final mock: We measure improvement and polish your approach.",
    },
    {
      question: "Do I get the recordings?",
      answer: "Yes, you'll receive recordings of both mock interviews plus detailed written notes. This helps you see your progress and continue practicing on your own.",
    },
    {
      question: "What if I'm really nervous about interviews?",
      answer: "That's exactly why this program exists. We start with a safe, low-pressure mock interview and build your confidence step by step. Many clients say the coaching sessions alone made a huge difference.",
    },
    {
      question: "Can this help with any type of interview?",
      answer: "Yes, the frameworks and confidence-building apply to all interview types. We'll customize the examples and practice questions to your specific industry and target roles.",
    },
    {
      question: "What if I still don't get offers after the program?",
      answer: "The program focuses on preparation and performance - what you can control. We don't guarantee job offers, but we do guarantee you'll be better prepared and more confident in interviews.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section padding="lg" className="bg-gradient-to-br from-navy-900/95 to-navy-800/95">
        <Hero
          title="Stop Getting Ghosted"
          subtitle="Baseline mock → coaching → final mock. Walk in confident."
          primaryCTA={{
            text: "Book Program - $300",
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
            Anyone who's getting interviews but not getting offers. Time to fix what's happening in that crucial conversation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Getting Interviews</h3>
              <p className="text-gray-600">But not converting them into offers or callbacks</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Unclear Answers</h3>
              <p className="text-gray-600">Struggling to tell compelling stories about your experience</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Lack Confidence</h3>
              <p className="text-gray-600">Feeling nervous or unprepared going into interviews</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-navy-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            The 3-Phase Process
          </h2>
          
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/3 text-center lg:text-left">
                <div className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto lg:mx-0 mb-4">
                  1
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-3">Baseline Mock</h3>
                <p className="text-gray-600">
                  Safe practice with detailed notes. We'll identify exactly what's holding you back.
                </p>
              </div>
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h4 className="font-semibold text-navy-900 mb-3">What happens:</h4>
                  <ul className="space-y-2 text-navy-700">
                    <li>• 45-60 minute mock interview with real questions</li>
                    <li>• Detailed recording and written feedback</li>
                    <li>• Assessment of communication, confidence, and content</li>
                    <li>• Identification of specific improvement areas</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
              <div className="lg:w-1/3 text-center lg:text-left">
                <div className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto lg:mx-0 mb-4">
                  2
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-3">Coaching</h3>
                <p className="text-gray-600">
                  Storytelling frameworks, STAR answers, and confidence building.
                </p>
              </div>
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h4 className="font-semibold text-navy-900 mb-3">What happens:</h4>
                  <ul className="space-y-2 text-navy-700">
                    <li>• Storytelling frameworks that actually work</li>
                    <li>• STAR method mastery with your real examples</li>
                    <li>• Confidence-building techniques and practice</li>
                    <li>• Industry-specific question preparation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/3 text-center lg:text-left">
                <div className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto lg:mx-0 mb-4">
                  3
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-3">Final Mock</h3>
                <p className="text-gray-600">
                  Measurable improvement before the real thing.
                </p>
              </div>
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h4 className="font-semibold text-navy-900 mb-3">What happens:</h4>
                  <ul className="space-y-2 text-navy-700">
                    <li>• Second mock interview to measure progress</li>
                    <li>• Side-by-side comparison with baseline</li>
                    <li>• Final polish and confidence boost</li>
                    <li>• Ready-to-use materials and recordings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* What's Included */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            What's Included
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Mock Interviews</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">2 full mock interviews (45-60 mins each)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Video recordings of both sessions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Detailed written feedback and notes</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Before/after comparison analysis</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Coaching Sessions</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Storytelling framework mastery</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">STAR method with your examples</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Confidence-building techniques</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Industry-specific question prep</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-navy-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            What Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                company={testimonial.company}
                rating={testimonial.rating}
              />
            ))}
          </div>
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
            Ready to Stop Getting Ghosted?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Transform from decent to obvious hire in 3 weeks. Walk into your next interview with confidence.
          </p>
          <CTAButton
            href={routes.book}
            className="bg-white text-primary-600 hover:bg-gray-100"
          >
            Book Stop Getting Ghosted Program - $300
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
