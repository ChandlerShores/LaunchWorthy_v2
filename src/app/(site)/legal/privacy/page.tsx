import React from 'react';
import { generatePageMetadata } from '@/lib/metadata';
import Section from '@/components/Section';

export const metadata = generatePageMetadata({
  title: 'Privacy Policy - Launchworthy',
  description: 'Learn how Launchworthy collects, uses, and protects your personal information.',
  path: '/legal/privacy',
});

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Section padding="lg" className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Last updated: September 16, 2025
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p>
            Launchworthy ("we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our coaching services.
          </p>

          <h2>Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          
          <h3>Information you provide directly</h3>
          <ul>
            <li>Contact details (name, email address, phone number)</li>
            <li>Payment information (processed securely by Stripe; we do not store card details)</li>
            <li>Professional information (resume, LinkedIn profile, career goals, coaching notes)</li>
            <li>Preferences and communication history</li>
            <li>Testimonials or feedback you choose to share</li>
            <li>Recordings of coaching sessions (only with your explicit consent)</li>
          </ul>

          <h3>Information collected automatically</h3>
          <ul>
            <li>Basic site analytics (via Plausible Analytics, which is cookie-free and privacy-focused)</li>
            <li>Essential cookies for site functionality</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Deliver, improve, and personalize coaching services</li>
            <li>Process payments and send confirmations or receipts</li>
            <li>Schedule sessions and send reminders</li>
            <li>Respond to inquiries and provide support</li>
            <li>Share updates, newsletters, or resources (if you opt-in)</li>
            <li>Analyze anonymized usage patterns to improve our services</li>
            <li>Meet legal and regulatory obligations</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>We do not sell or rent your personal information. We may share it only in these situations:</p>
          <ul>
            <li><strong>With your consent</strong> – when you explicitly allow it (e.g., using a testimonial)</li>
            <li><strong>With service providers</strong> – trusted partners who help us operate (e.g., Stripe for payments, Formspree for forms)</li>
            <li><strong>For legal reasons</strong> – if required by law, court order, or to protect rights, safety, or property</li>
            <li><strong>Business transfers</strong> – if Launchworthy undergoes a merger, acquisition, or sale, your data may transfer as part of that transaction</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We take commercially reasonable measures to protect your data against unauthorized access, alteration, disclosure, or destruction. However, no online service can guarantee 100% security.
          </p>

          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Correct or update inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Request data portability (structured, machine-readable copy)</li>
            <li>Withdraw consent for optional uses (like session recordings)</li>
          </ul>
          <p>
            To exercise these rights, contact us at hello@launchworthy.net. We will respond promptly.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain personal data only as long as necessary to provide services or comply with legal requirements. Session recordings, if applicable, are stored only with your consent and can be deleted upon request.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our services are not intended for children under 13. We do not knowingly collect information from children. If you believe a child has provided us with personal data, please contact us immediately.
          </p>

          <h2>International Data Transfers</h2>
          <p>
            Your information may be transferred outside your home country. We ensure these transfers are consistent with applicable data protection laws.
          </p>

          <h2>Policy Updates</h2>
          <p>
            We may revise this Privacy Policy from time to time. Updates will be posted on this page with a new "Last updated" date. We encourage you to review it regularly.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or how your data is handled, please reach us at:
          </p>
          <p>
            📧 hello@launchworthy.net<br />
            📍 Lexington, KY
          </p>
        </div>
      </Section>
    </main>
  );
}
