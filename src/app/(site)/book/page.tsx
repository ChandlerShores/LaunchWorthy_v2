'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Section from '@/components/Section';
import BookingFlow from '@/components/booking/BookingFlow';

export default function BookPage() {
  const searchParams = useSearchParams();
  const isStep3 = searchParams.get('step') === '3';

  return (
    <>
      {/* Hero Section - Hidden on Step 3 */}
      {!isStep3 && (
        <Section padding="xl" className="bg-gradient-to-br from-primary-50 to-white">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Book Your Session
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Choose your service, schedule your session, and start transforming your interview skills.
            </p>
          </div>
        </Section>
      )}

      {/* Booking Flow */}
      <Section>
        <BookingFlow />
      </Section>

      {/* Additional Info */}
      <Section className="bg-navy-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Book sessions that work with your schedule. Evening and weekend slots available.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                All payments processed securely through Stripe. 100% refund before first session.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Quick Response</h3>
              <p className="text-gray-600">
                Get confirmation and prep materials within 24 hours of booking.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
