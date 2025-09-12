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
      // In a real app, you'd verify the session with your backend
      // For now, we'll just show a success message
      setIsLoading(false);
      setPaymentDetails({
        serviceName: 'Your selected service',
        amount: 'Payment completed successfully',
      });
    }
  }, [sessionId]);

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
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Payment Successful!
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Thank you for your payment. You'll receive a confirmation email shortly.
          </p>
          
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
            What Happens Next?
          </h2>
          
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
        </div>
      </Section>

      {/* CTA */}
      <Section padding="xl" className="bg-primary-600 text-white">
        <div className="text-center">
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
        </div>
      </Section>
    </>
  );
}
