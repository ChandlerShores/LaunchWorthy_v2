import React from 'react';
import { generatePageMetadata } from '@/lib/metadata';
import Section from '@/components/Section';

export const metadata = generatePageMetadata({
  title: 'Terms of Service - Launchworthy',
  description: 'Read our terms of service for using Launchworthy coaching services.',
  path: '/legal/terms',
});

export default function TermsOfServicePage() {
  return (
    <main>
      <Section padding="lg" className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using Launchworthy's services, you accept and agree to be bound by 
            the terms and provision of this agreement. If you do not agree to abide by the above, 
            please do not use this service.
          </p>

          <h2>Description of Service</h2>
          <p>
            Launchworthy provides interview coaching, resume optimization, LinkedIn profile 
            enhancement, and career development services. Our services include:
          </p>
          <ul>
            <li>30-minute career consultations ($50)</li>
            <li>Resume and LinkedIn profile optimization ($125)</li>
            <li>Comprehensive interview coaching programs ($300)</li>
            <li>Ongoing mentorship and career guidance ($150/month)</li>
          </ul>

          <h2>Payment Terms</h2>
          <p>
            All services must be paid for in advance. We accept payments through Stripe. 
            Payment terms are as follows:
          </p>
          <ul>
            <li>Consult sessions: $50 (one-time payment)</li>
            <li>Resume + LinkedIn: $125 (one-time payment)</li>
            <li>Stop Getting Ghosted program: $300 (one-time payment)</li>
            <li>Monthly mentorship: $150/month (recurring billing)</li>
          </ul>

          <h2>Refund Policy</h2>
          <p>
            We offer a 30-day money-back guarantee for all services. If you are not satisfied 
            with our coaching services, you may request a full refund within 30 days of your 
            initial purchase. Refunds will be processed within 5-7 business days.
          </p>

          <h2>Cancellation Policy</h2>
          <p>
            Monthly mentorship subscriptions can be cancelled at any time. Cancellation will 
            take effect at the end of the current billing period. No partial refunds will be 
            provided for unused portions of the month.
          </p>

          <h2>Client Responsibilities</h2>
          <p>As a client, you agree to:</p>
          <ul>
            <li>Provide accurate and complete information about your career goals and background</li>
            <li>Attend scheduled sessions on time</li>
            <li>Complete assigned exercises and homework</li>
            <li>Communicate openly and honestly during coaching sessions</li>
            <li>Respect the coaching relationship and maintain professional boundaries</li>
            <li>Provide constructive feedback to help improve our services</li>
          </ul>

          <h2>Coach Responsibilities</h2>
          <p>Launchworthy agrees to:</p>
          <ul>
            <li>Provide professional coaching services as described</li>
            <li>Maintain confidentiality of client information</li>
            <li>Deliver services with professionalism and expertise</li>
            <li>Respond to communications within 24 hours</li>
            <li>Maintain professional standards and ethics</li>
            <li>Continuously improve coaching methods and approaches</li>
          </ul>

          <h2>Confidentiality</h2>
          <p>
            All information shared during coaching sessions is confidential and will not be 
            shared with third parties without your explicit consent, except as required by law. 
            We may use anonymized examples for training purposes, but will never identify you 
            personally.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            Launchworthy's liability is limited to the amount paid for services. We do not 
            guarantee specific outcomes or job offers. Coaching is a collaborative process 
            that requires client participation and effort. Results may vary based on individual 
            circumstances, effort, and market conditions.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All coaching materials, frameworks, and methodologies are proprietary to Launchworthy. 
            You may use these materials for your personal career development but may not 
            redistribute or commercialize them without written permission.
          </p>

          <h2>Session Recording</h2>
          <p>
            Coaching sessions may be recorded for quality assurance and training purposes. 
            You will be notified before any recording begins and may opt out. Recordings 
            will be stored securely and deleted after 90 days unless you request earlier 
            deletion.
          </p>

          <h2>Termination</h2>
          <p>
            Either party may terminate the coaching relationship at any time with written notice. 
            Refunds will be handled according to our refund policy. Upon termination, both 
            parties agree to maintain confidentiality of shared information.
          </p>

          <h2>Dispute Resolution</h2>
          <p>
            Any disputes arising from these terms or our services will be resolved through 
            good faith negotiation. If negotiation fails, disputes will be resolved through 
            binding arbitration in accordance with the rules of the American Arbitration 
            Association.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms are governed by the laws of Kentucky, United States. Any disputes 
            will be resolved in the courts of Kentucky.
          </p>

          <h2>Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us:
          </p>
          <p>
            <strong>Email:</strong> hello@launchworthy.net<br />
            <strong>Address:</strong> Lexington, KY
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be posted 
            on this page and will take effect immediately. Continued use of our services 
            constitutes acceptance of the modified terms.
          </p>
        </div>
      </Section>
    </main>
  );
}
