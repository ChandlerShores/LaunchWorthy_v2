'use client';

import React, { useState, useEffect } from 'react';
import { ServiceId } from '@/lib/stripe';
import { ContactInfo } from '@/hooks/useBookingFlow';
import { CTAButton } from '../CTAButton';
import TestModeIndicator from '../TestModeIndicator';
import { getStripe, isTestMode } from '@/lib/stripe';

interface BookingStep2Props {
  contactInfo: ContactInfo;
  selectedService: ServiceId;
  selectedServiceData: {
    name: string;
    description: string;
    price: number;
  };
  isProcessing: boolean;
  onProcessingChange: (processing: boolean) => void;
  onPaymentSuccess: (sessionId: string) => void;
  onPrev: () => void;
}

const BookingStep2: React.FC<BookingStep2Props> = ({
  contactInfo,
  selectedService,
  selectedServiceData,
  isProcessing,
  onProcessingChange,
  onPaymentSuccess,
  onPrev,
}) => {
  const [error, setError] = useState<string>('');

  const handlePayment = async () => {
    setError('');
    onProcessingChange(true);

    try {
      // Create checkout session with contact information
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: selectedService,
          customerEmail: contactInfo.email,
          customerName: contactInfo.name,
          customerPhone: contactInfo.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `API Error: ${response.status}`);
      }

      if (!data.sessionId) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = data;

      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Stripe not loaded');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // If we get here, payment was successful
      onPaymentSuccess(sessionId);
    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setError(errorMessage);
    } finally {
      onProcessingChange(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Secure Payment
        </h2>
        <p className="text-gray-600">
          Complete your payment to secure your session
        </p>
      </div>

      {/* Test Mode Indicator */}
      <TestModeIndicator className="mb-8" />

      {/* Service Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Order Summary
        </h3>
        
        <div className="space-y-4">
          {/* Service Details */}
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-gray-900">{selectedServiceData.name}</h4>
              <p className="text-gray-600 text-sm mt-1">{selectedServiceData.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                ${(selectedServiceData.price / 100).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <div className="font-medium">{contactInfo.name}</div>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <div className="font-medium">{contactInfo.email}</div>
              </div>
              <div>
                <span className="text-gray-600">Phone:</span>
                <div className="font-medium">{contactInfo.phone}</div>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-primary-600">
                ${(selectedServiceData.price / 100).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <CTAButton
          onClick={onPrev}
          variant="secondary"
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
          disabled={isProcessing}
        >
          ← Back to Details
        </CTAButton>
        
        <CTAButton
          onClick={handlePayment}
          disabled={isProcessing}
          className="px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            'Pay with Stripe'
          )}
        </CTAButton>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-red-900">Payment Error</h4>
              <p className="text-red-800 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Security & Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <svg className="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h4 className="font-semibold text-green-900">Secure Payment</h4>
          <p className="text-green-800 text-sm">Protected by Stripe</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <svg className="w-8 h-8 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h4 className="font-semibold text-blue-900">100% Refund</h4>
          <p className="text-blue-800 text-sm">Before first session</p>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <svg className="w-8 h-8 text-purple-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h4 className="font-semibold text-purple-900">Instant Confirmation</h4>
          <p className="text-purple-800 text-sm">Email within minutes</p>
        </div>
      </div>

      {/* Test Mode Warning */}
      {isTestMode && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h4 className="font-semibold text-yellow-900">Test Mode Active</h4>
              <p className="text-yellow-800 text-sm mt-1">
                This is a test payment. No real money will be charged. Use test card: <code className="bg-yellow-100 px-1 rounded">4242424242424242</code>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingStep2;
