'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Section from '@/components/Section';
import { CTAButton } from '@/components/CTAButton';
import { routes } from '@/lib/routes';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<{
    serviceName: string;
    amount: string;
  } | null>(null);

  useEffect(() => {
    if (sessionId) {
      // Check if this is a booking completion redirect
      const isBookingCompleted = searchParams.get('booking_completed') === 'true';
      
      if (isBookingCompleted) {
        // This is the final success page after booking completion
        setPaymentDetails({
          serviceName: 'Your coaching session',
          amount: 'Booking completed successfully',
        });
        setIsLoading(false);
      } else {
        // This is payment success, redirect to Step 3
        setPaymentDetails({
          serviceName: 'Your selected service',
          amount: 'Payment completed successfully',
        });
        
        // Show success message for 2 seconds, then redirect to Step 3
        const timer = setTimeout(() => {
          window.location.href = `/book?step=3&session_id=${sessionId}`;
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    } else {
      setIsLoading(false);
    }
  }, [sessionId, searchParams]);

  if (isLoading) {
    return (
      <Section padding="xl" className="bg-gradient-to-br from-primary-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </Section>
    );
  }

  return (
    <>
      {/* Success Hero */}
      <Section padding="xl" className="bg-gradient-to-br from-green-50 to-white">
        <div className="text-center max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          {searchParams.get('booking_completed') === 'true' ? (
            <>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Booking Complete!
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Your coaching session has been scheduled and confirmed. You're all set!
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Payment Successful!
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-4">
                Thank you for your payment. You'll receive a confirmation email shortly.
              </p>
              <p className="text-lg text-primary-600 font-medium mb-8">
                Redirecting you to complete your booking...
              </p>
            </>
          )}
          
          {paymentDetails && (
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-8 max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h2>
              <div className="space-y-2 text-gray-600">
                <p><strong>Service:</strong> {paymentDetails.serviceName}</p>
                <p><strong>Status:</strong> {paymentDetails.amount}</p>
                <p><strong>Session ID:</strong> {sessionId}</p>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Next Steps */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            {searchParams.get('booking_completed') === 'true' ? 'What Happens Next?' : 'What Happens Next?'}
          </h2>
          
          {searchParams.get('booking_completed') === 'true' ? (
            // Booking Completion Next Steps
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirmation Email</h3>
                <p className="text-gray-600">
                  You'll receive a detailed confirmation email with session details and preparation materials.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Session Confirmed</h3>
                <p className="text-gray-600">
                  Your session is scheduled and confirmed. We'll send you a calendar invite shortly.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Prepare for Success</h3>
                <p className="text-gray-600">
                  Review the preparation materials and get ready to transform your interview skills!
                </p>
              </div>
            </div>
          ) : (
            // Payment Success Next Steps
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirmation Email</h3>
                <p className="text-gray-600">
                  You'll receive a payment confirmation email within minutes.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule Your Session</h3>
                <p className="text-gray-600">
                  Use the Calendly link in your email to book your session.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Prepare for Success</h3>
                <p className="text-gray-600">
                  Review our preparation checklist and get ready to transform your interview skills.
                </p>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* CTA */}
      <Section padding="xl" className="bg-primary-600 text-white">
        <div className="text-center">
          {searchParams.get('booking_completed') === 'true' ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                You're All Set!
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Your coaching session is confirmed. We can't wait to help you succeed in your interviews!
              </p>
              <div className="flex justify-center">
                <CTAButton
                  href={routes.services}
                  className="bg-white text-primary-600 hover:bg-gray-100"
                >
                  Explore More Services
                </CTAButton>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Your payment is confirmed and you're ready to begin your coaching journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton
                  href={routes.book}
                  className="bg-white text-primary-600 hover:bg-gray-100"
                >
                  Book Your Session
                </CTAButton>
                <CTAButton
                  href={routes.services}
                  variant="secondary"
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                >
                  View All Services
                </CTAButton>
              </div>
            </>
          )}
        </div>
      </Section>
    </>
  );
}
