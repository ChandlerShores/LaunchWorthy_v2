import React from 'react';
import Image from 'next/image';
import { generatePageMetadata } from '@/lib/metadata';
import Section from '@/components/Section';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import FAQ from '@/components/FAQ';
import { services, routes } from '@/lib/routes';

export const metadata = generatePageMetadata({
  title: 'Launchworthy - Stop Getting Ghosted After Interviews',
  description: '21 days from "decent" to "obvious hire." Practical coaching for early-career professionals in Lexington.',
  path: '/',
});

export default function HomePage() {
  const testimonials = [
    {
      quote: "Chandler helped me completely transform my interview approach. I went from getting ghosted to getting offers within 3 weeks.",
      name: "Alex M.",
      role: "Software Engineer",
      company: "Tech Startup",
      rating: 5,
    },
    {
      quote: "The mock interviews were game-changing. I finally understood what I was doing wrong and how to fix it.",
      name: "Jordan K.",
      role: "Marketing Coordinator",
      rating: 5,
    },
    {
      quote: "Worth every penny. I landed my dream job after just one session. The resume feedback was spot-on.",
      name: "Taylor R.",
      role: "Product Manager",
      company: "Fortune 500",
      rating: 5,
    },
  ];

  const faqItems = [
    {
      question: "Do you guarantee I'll get a job?",
      answer: "No job guarantees; we focus on preparation and performance. Our coaching improves your interview skills and confidence, but employment outcomes depend on many factors beyond our control.",
    },
    {
      question: "What's the time commitment?",
      answer: "30–90 mins per session depending on the service. The Stop Getting Ghosted program runs about 3 weeks with scheduled sessions and practice time.",
    },
    {
      question: "Do you offer refunds?",
      answer: "100% refund before the first session; partial refunds available thereafter based on services already provided. See our refund policy for details.",
    },
  ];

  const howItWorks = [
    {
      title: "Baseline mock",
      description: "Safe practice with detailed notes",
    },
    {
      title: "Coaching",
      description: "Storytelling frameworks, STAR answers, confidence",
    },
    {
      title: "Final mock",
      description: "Measurable improvement before the real thing",
    },
  ];

  const valueBullets = [
    "Fix your story",
    "Nail the interview", 
    "Show real progress"
  ];

  return (
    <>
      {/* Hero Section */}
      <Section padding="xl" className="bg-gradient-to-br from-primary-50 to-white">
        <Hero
          title="Stop Getting Ghosted After Interviews"
          subtitle="21 days from 'decent' to 'obvious hire.'"
          primaryCTA={{
            text: "Book a Session",
            href: routes.book,
          }}
          secondaryCTA={{
            text: "Try a $50 Consult",
            href: routes.consult,
          }}
          trustIndicators={{
            avatarCount: 3,
            rating: 5,
            location: "Lexington"
          }}
        />
      </Section>

      {/* Value Proposition */}
      <Section variant="default" showSeparator={true}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            What You'll Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {valueBullets.map((bullet, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-gray-900">{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section variant="alt" showSeparator={true}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section variant="default" showSeparator={true}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Service
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From quick consults to comprehensive coaching programs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.name}
              price={service.price}
              description={service.description}
              features={service.features}
              learnMoreHref={service.learnMoreHref}
              bookHref={service.bookHref}
              popular={service.id === 'accelerator'}
            />
          ))}
        </div>
      </Section>

      {/* Results Preview */}
      <Section variant="alt" showSeparator={true}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Results
          </h2>
          <p className="text-xl text-gray-600">
            See what our clients are saying
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        
      </Section>

      {/* About Snapshot */}
      <Section variant="default" showSeparator={true}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Practical, Peer-Level Coaching
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              No fluff — just progress. I've helped friends land better jobs and promotions; now I offer it under Launchworthy.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Based in Lexington, I work with early-career professionals who are tired of getting ghosted after interviews. Let's fix that.
            </p>
            <a
              href={routes.about}
              className="text-primary-600 hover:text-primary-700 font-semibold underline"
            >
              Learn More About My Approach →
            </a>
          </div>
          <div className="flex justify-center">
            <Image
              src="/chandler_headshot.webp"
              alt="Chandler, Career Coach"
              width={320}
              height={320}
              className="w-80 h-80 rounded-full object-cover shadow-lg"
              priority={false}
            />
          </div>
        </div>
      </Section>

      {/* FAQ Preview */}
      <Section variant="alt" showSeparator={true}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Common Questions
          </h2>
          <p className="text-xl text-gray-600">
            Quick answers to get you started
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <FAQ items={faqItems} />
        </div>
        
        <div className="text-center mt-12">
          <a
            href={routes.faq}
            className="text-primary-600 hover:text-primary-700 font-semibold underline"
          >
            View All FAQ →
          </a>
        </div>
      </Section>

      {/* Final CTA */}
      <Section variant="default" padding="xl" className="bg-primary-600 text-white">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Stop Getting Ghosted?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join the professionals who've transformed their interview game and landed better jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={routes.book}
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Book a Session
            </a>
            <a
              href={routes.consult}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Try a $50 Consult
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
