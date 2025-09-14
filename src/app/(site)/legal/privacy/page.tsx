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
      <Section padding="xl" className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2>Introduction</h2>
          <p>
            Launchworthy ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you visit our website 
            or use our coaching services.
          </p>

          <h2>Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you:</p>
          <ul>
            <li>Create an account or book a coaching session</li>
            <li>Make a purchase through our website</li>
            <li>Contact us via email or contact form</li>
            <li>Participate in coaching sessions or provide feedback</li>
            <li>Subscribe to our newsletter or updates</li>
          </ul>

          <p>This information may include:</p>
          <ul>
            <li>Name and contact information (email address, phone number)</li>
            <li>Payment information (processed securely through Stripe)</li>
            <li>Professional information (resume, LinkedIn profile, career goals)</li>
            <li>Communication preferences and session recordings (with consent)</li>
            <li>Feedback and testimonials</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our coaching services</li>
            <li>Process payments and send you related information</li>
            <li>Schedule and conduct coaching sessions</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Analyze usage patterns to improve our services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Information Sharing and Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties 
            except in the following circumstances:
          </p>
          <ul>
            <li><strong>With your explicit consent</strong> - We may share information when you explicitly agree</li>
            <li><strong>Service providers</strong> - We may share information with trusted third parties who assist us in operating our website, conducting our business, or servicing you (e.g., Stripe for payments, Formspree for forms)</li>
            <li><strong>Legal compliance</strong> - We may disclose information when required by law or to protect our rights and safety</li>
            <li><strong>Business transfers</strong> - In the event of a merger, acquisition, or sale of assets, user information may be transferred</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction. However, no method of 
            transmission over the internet or electronic storage is 100% secure. While we strive 
            to use commercially acceptable means to protect your information, we cannot guarantee 
            absolute security.
          </p>

          <h2>Cookies and Analytics</h2>
          <p>
            We use Plausible Analytics to understand how visitors use our website. This service 
            is privacy-focused and does not use cookies or collect personal data. We may also 
            use essential cookies to provide basic website functionality.
          </p>

          <h2>Your Rights and Choices</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of communications</li>
            <li>Data portability (receive your data in a structured format)</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <p>
            To exercise these rights, please contact us at hello@launchworthy.net. We will respond 
            to your request within a reasonable timeframe.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain your personal information only as long as necessary to fulfill the purposes 
            outlined in this Privacy Policy, unless a longer retention period is required or 
            permitted by law.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our services are not directed to children under 13 years of age. We do not knowingly 
            collect personal information from children under 13. If you become aware that a child 
            has provided us with personal information, please contact us immediately.
          </p>

          <h2>International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your own. 
            We ensure that such transfers comply with applicable data protection laws.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any 
            changes by posting the new Privacy Policy on this page and updating the "Last updated" 
            date. We encourage you to review this Privacy Policy periodically.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our privacy practices, please contact us:
          </p>
          <p>
            <strong>Email:</strong> hello@launchworthy.net<br />
            <strong>Address:</strong> Lexington, KY
          </p>
        </div>
      </Section>
    </main>
  );
}
