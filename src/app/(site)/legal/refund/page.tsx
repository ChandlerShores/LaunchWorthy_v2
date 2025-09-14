import React from 'react';
import { generatePageMetadata } from '@/lib/metadata';
import Section from '@/components/Section';

export const metadata = generatePageMetadata({
  title: 'Refund Policy - Launchworthy',
  description: 'Learn about our 30-day money-back guarantee and refund policy for coaching services.',
  path: '/legal/refund',
});

export default function RefundPolicyPage() {
  return (
    <main>
      <Section padding="xl" className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Refund Policy
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2>30-Day Money-Back Guarantee</h2>
          <p>
            We stand behind our coaching services and want you to feel confident in your investment. 
            We offer a 30-day money-back guarantee for all our services. If you are not completely 
            satisfied with your coaching experience, you can request a full refund within 30 days 
            of your initial purchase.
          </p>

          <h2>Eligibility for Refunds</h2>
          <p>To be eligible for a refund, you must:</p>
          <ul>
            <li>Request the refund within 30 days of your initial purchase</li>
            <li>Have completed at least one coaching session or consultation</li>
            <li>Provide specific feedback about what didn't meet your expectations</li>
            <li>Not have requested a refund for the same service previously</li>
          </ul>

          <h2>Services Covered</h2>
          <p>Our refund policy applies to all services:</p>
          <ul>
            <li><strong>30-minute Career Consult ($50)</strong> - Full refund if not satisfied with consultation</li>
            <li><strong>Resume + LinkedIn Polish ($125)</strong> - Full refund if deliverables don't meet expectations</li>
            <li><strong>Stop Getting Ghosted Program ($300)</strong> - Full refund if coaching doesn't meet your needs</li>
            <li><strong>Monthly Mentorship ($150/month)</strong> - Full refund for current month if not satisfied</li>
          </ul>

          <h2>How to Request a Refund</h2>
          <p>To request a refund, please:</p>
          <ol>
            <li>Email us at hello@launchworthy.co with "Refund Request" in the subject line</li>
            <li>Include your name, email address, and order details</li>
            <li>Explain what didn't meet your expectations</li>
            <li>Provide any specific feedback that can help us improve</li>
          </ol>

          <h2>Refund Processing</h2>
          <p>
            Once we receive your refund request, we will:
          </p>
          <ul>
            <li>Review your request within 2 business days</li>
            <li>Contact you if we need additional information</li>
            <li>Process approved refunds within 5-7 business days</li>
            <li>Refund the full amount to your original payment method</li>
          </ul>

          <h2>Partial Refunds</h2>
          <p>
            In some cases, we may offer partial refunds:
          </p>
          <ul>
            <li>If you've completed some but not all sessions in a program</li>
            <li>If you've received partial deliverables</li>
            <li>If there are extenuating circumstances</li>
          </ul>

          <h2>Non-Refundable Items</h2>
          <p>The following are not eligible for refunds:</p>
          <ul>
            <li>Services completed more than 30 days ago</li>
            <li>Services where all deliverables have been provided and accepted</li>
            <li>Services where you've explicitly stated satisfaction</li>
            <li>Refunds requested due to external factors (e.g., market conditions, personal circumstances)</li>
          </ul>

          <h2>Monthly Subscription Cancellation</h2>
          <p>
            For monthly mentorship subscriptions:
          </p>
          <ul>
            <li>You can cancel at any time</li>
            <li>Cancellation takes effect at the end of the current billing period</li>
            <li>You'll retain access to services until the end of your paid period</li>
            <li>No refunds for unused portions of the month</li>
            <li>Future billing will be stopped immediately upon cancellation</li>
          </ul>

          <h2>Dispute Resolution</h2>
          <p>
            If you're not satisfied with our refund decision, you can:
          </p>
          <ul>
            <li>Request a review by our management team</li>
            <li>Provide additional documentation or evidence</li>
            <li>Request mediation through a third party</li>
          </ul>

          <h2>Chargebacks</h2>
          <p>
            We encourage you to contact us directly before initiating a chargeback with your 
            bank or credit card company. Chargebacks can affect our ability to process 
            payments and may result in additional fees. We're committed to resolving 
            disputes fairly and quickly.
          </p>

          <h2>Our Commitment</h2>
          <p>
            We're committed to providing exceptional coaching services and standing behind 
            our work. If you're not satisfied, we want to know why so we can improve. 
            Most refund requests are resolved quickly and amicably.
          </p>

          <h2>Contact Us</h2>
          <p>
            For refund requests or questions about this policy:
          </p>
          <p>
            <strong>Email:</strong> hello@launchworthy.co<br />
            <strong>Subject:</strong> Refund Request<br />
            <strong>Response Time:</strong> Within 2 business days
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this refund policy from time to time. Changes will be posted 
            on this page and will take effect immediately. Continued use of our services 
            constitutes acceptance of the updated policy.
          </p>
        </div>
      </Section>
    </main>
  );
}
