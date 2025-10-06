'use client';

import React, { useState } from 'react';
import Section from '@/components/Section';
import Hero from '@/components/Hero';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Use server-side API route instead of direct Formspree call
      const response = await fetch('/api/submit-contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero Section */}
      <Section padding="lg" className="bg-gradient-to-br from-navy-900/95 to-navy-800/95">
        <Hero
          title="Get in Touch"
          subtitle="Have questions about our services? We're here to help."
        />
      </Section>

      {/* Contact Form */}
      <Section>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-navy-200 p-8">
            {submitStatus === 'success' ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-navy-900 mb-4">Message Sent!</h2>
                <p className="text-gray-600 mb-6">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus('idle')}
                  className="text-primary-600 hover:text-primary-700 font-semibold underline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Send us a message</h2>
                
                {submitStatus === 'error' && (
                  <div className="bg-error-50 border border-error-200 rounded-lg p-4 mb-6">
                    <p className="text-error-800">
                      Sorry, there was an error sending your message. Please try again or email us directly at hello@launchworthy.net
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Tell us about your questions or how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </Section>

      {/* Alternative Contact Methods */}
      <Section className="bg-navy-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            Other Ways to Reach Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg border border-navy-200 p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">
                For general questions or to discuss services
              </p>
              <a
                href="mailto:hello@launchworthy.net"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                hello@launchworthy.net
              </a>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-navy-200 p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">Book Directly</h3>
              <p className="text-gray-600 mb-4">
                Ready to get started? Book your session now
              </p>
              <a
                href="/book"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Book a Session
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Response Time */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
            Quick Response Time
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We typically respond to all inquiries within 24 hours. For urgent questions about existing bookings, please mention "URGENT" in your message.
          </p>
        </div>
      </Section>
    </>
  );
}
