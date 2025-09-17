import React from 'react';
import { generatePageMetadata } from '@/lib/metadata';
import Section from '@/components/Section';
import Hero from '@/components/Hero';
import FAQ from '@/components/FAQ';
import Schema from '@/components/Schema';

export const metadata = generatePageMetadata({
  title: 'FAQ - Frequently Asked Questions About Interview Coaching',
  description: 'Get answers to common questions about our interview coaching services, guarantees, time commitments, and refund policies.',
  path: '/faq',
});

export default function FAQPage() {
  const faqItems = [
    {
      question: "Do you guarantee I'll get a job?",
      answer: "No job guarantees; we focus on preparation and performance. Our coaching improves your interview skills and confidence, but employment outcomes depend on many factors beyond our control. We guarantee you'll be better prepared and more confident in interviews.",
    },
    {
      question: "What's the time commitment?",
      answer: "30–90 mins per session depending on the service. The Stop Getting Ghosted program runs about 3 weeks with scheduled sessions and practice time. Monthly mentorship includes two 30-minute sessions per month.",
    },
    {
      question: "Do you offer refunds?",
      answer: "100% refund before the first session; partial refunds available thereafter based on services already provided. See our refund policy for specific details about each service.",
    },
    {
      question: "Can parents or employers pay for sessions?",
      answer: "Yes, Stripe links work for anyone. We've had parents, employers, and even friends purchase sessions for clients. Just make sure the person booking has the correct contact information.",
    },
    {
      question: "Do you offer evening or weekend sessions?",
      answer: "Limited evening slots are available; see the Book page for current availability. Weekend sessions depend on Chandler's schedule and are typically booked 2-3 weeks in advance.",
    },
    {
      question: "What if I need to reschedule?",
      answer: "We understand things come up. Rescheduling is free with 24+ hours notice. Last-minute changes may incur a rescheduling fee to respect Chandler's time.",
    },
    {
      question: "How quickly will I see results?",
      answer: "Most clients see improvement after just one session. For the Stop Getting Ghosted program, measurable improvement is typically visible after the coaching phase (week 2). Results depend on your commitment to practicing the techniques.",
    },
    {
      question: "Do you work with people in any industry?",
      answer: "Yes, the interview frameworks and confidence-building techniques apply across industries. We customize examples and practice questions to your specific field and target roles.",
    },
    {
      question: "What if I'm really nervous about interviews?",
      answer: "That's exactly why this coaching exists. We start with safe, low-pressure mock interviews and build your confidence step by step. Many clients say the coaching sessions alone made a huge difference in their interview anxiety.",
    },
    {
      question: "Is this just for entry-level professionals?",
      answer: "No, we work with professionals at all career stages. The coaching adapts to your experience level and career goals, whether you're a recent graduate or a mid-career professional looking to advance.",
    },
    {
      question: "What's included in the Stop Getting Ghosted program?",
      answer: "Two mock interviews (baseline and final), coaching sessions on storytelling and STAR method, video recordings, detailed written feedback, and before/after comparison analysis. The program runs about 3 weeks total.",
    },
    {
      question: "How is this different from other coaching services?",
      answer: "This is practical, peer-level coaching focused on measurable improvement. No corporate training fluff - just frameworks and techniques that actually work. We practice real interviews and give you real feedback you can use immediately.",
    },
  ];

  return (
    <>
      <Schema type="faq" faqs={faqItems} />
      
      {/* Hero Section */}
      <Section padding="lg" className="bg-gradient-to-br from-navy-900/95 to-navy-800/95">
        <Hero
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our interview coaching services."
        />
      </Section>

      {/* FAQ Section */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <FAQ items={faqItems} />
        </div>
      </Section>

      {/* Still Have Questions */}
      <Section className="bg-navy-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Can't find what you're looking for? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Contact Us
            </a>
            <a
              href="/book"
              className="bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Book a Session
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
