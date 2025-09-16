import React from 'react';
import { generatePageMetadata } from '@/lib/metadata';
import Section from '@/components/Section';
import Hero from '@/components/Hero';
import TestimonialCard from '@/components/TestimonialCard';
import FAQ from '@/components/FAQ';
import { CTAButton } from '@/components/CTAButton';
import { routes } from '@/lib/routes';

export const metadata = generatePageMetadata({
  title: 'Monthly Mentorship - Ongoing Career Coaching & Interview Prep',
  description: 'Two 30-min sessions per month for ongoing interview prep, negotiations, and career growth. Flexible, ongoing support.',
  path: '/services/mentorship',
});

export default function MentorshipPage() {
  const testimonials = [
    {
      quote: "The ongoing mentorship has been invaluable. Having regular check-ins keeps me accountable and prepared for opportunities as they come up.",
      name: "Ryan T.",
      role: "Product Manager",
      rating: 5,
    },
  ];

  const faqItems = [
    {
      question: "How does the monthly structure work?",
      answer: "You get two 30-minute sessions per month, scheduled flexibly around your availability. We can focus on whatever you need most - interview prep, negotiation practice, career planning, etc.",
    },
    {
      question: "What if I need more sessions in a month?",
      answer: "Additional sessions can be booked at a discounted rate. Many clients start with monthly mentorship and add sessions when they're actively job searching.",
    },
    {
      question: "Can I pause or cancel anytime?",
      answer: "Yes, you can pause your membership with 30 days notice or cancel anytime. No long-term commitments required.",
    },
    {
      question: "What's included beyond the sessions?",
      answer: "You get email support between sessions, access to practice materials, and priority booking for additional sessions when needed.",
    },
    {
      question: "Is this just for people actively job searching?",
      answer: "Not at all. Many clients use this for career growth, negotiation practice, skill development, and staying prepared for opportunities.",
    },
    {
      question: "How is this different from the one-time services?",
      answer: "This is ongoing support rather than a one-time program. Perfect for professionals who want consistent guidance and accountability over time.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section padding="xl" className="bg-gradient-to-br from-primary-50 to-white">
        <Hero
          title="Monthly Mentorship"
          subtitle="Two 30-min sessions/month. Ongoing prep for interviews, negotiations, and growth."
          primaryCTA={{
            text: "Start Mentorship - $150/mo",
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
            Professionals who want ongoing support and accountability for their career growth.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Ongoing Preparation</h3>
              <p className="text-gray-600">Stay interview-ready for opportunities as they arise</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Career Growth</h3>
              <p className="text-gray-600">Regular guidance for promotions and skill development</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Negotiation Prep</h3>
              <p className="text-gray-600">Practice and confidence for salary and promotion talks</p>
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
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Monthly Sessions</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Two 30-minute sessions per month</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Flexible scheduling around your availability</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Focused on your current priorities</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Interview prep, negotiations, career planning</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Ongoing Support</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Email support between sessions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Access to practice materials and resources</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Priority booking for additional sessions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-navy-700">Accountability and progress tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Start Monthly</h3>
              <p className="text-gray-600">
                Begin your membership and schedule your first two sessions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Set Goals</h3>
              <p className="text-gray-600">
                We'll identify your priorities and create a plan for ongoing growth.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Regular Sessions</h3>
              <p className="text-gray-600">
                Two focused sessions per month on whatever you need most.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Ongoing Support</h3>
              <p className="text-gray-600">
                Email support and resources between sessions keep you moving forward.
              </p>
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
            Ready for Ongoing Support?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Stay prepared and accountable with regular coaching sessions. Perfect for career growth and staying interview-ready.
          </p>
          <CTAButton
            href={routes.book}
            className="bg-white text-primary-600 hover:bg-gray-100"
          >
            Start Monthly Mentorship - $150/mo
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
