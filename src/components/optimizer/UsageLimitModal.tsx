'use client';

import React, { useState } from 'react';
import { routes } from '@/lib/routes';

interface UsageLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: () => void;
}

export default function UsageLimitModal({ isOpen, onClose, onPurchase }: UsageLimitModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: 'optimizer',
          customerEmail: '', // Optional
          customerName: '', // Optional
          customerPhone: '', // Optional
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await import('@stripe/stripe-js').then((m) =>
        m.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      );

      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Failed to initiate payment. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            You've Used Your Free Optimization!
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            Great job optimizing your resume! Ready for more?
          </p>

          {/* Options */}
          <div className="space-y-4">
            {/* Option 1: Quick Purchase */}
            <div className="p-4 border-2 border-primary-600 rounded-xl bg-primary-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">5 More Optimizations</span>
                <span className="text-2xl font-bold text-primary-600">$10</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Perfect for multiple job applications
              </p>
              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Purchase Now'}
              </button>
            </div>

            {/* Option 2: Full Service Upsell */}
            <div className="p-4 border border-gray-300 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">Full Resume Service</span>
                <span className="text-lg font-bold text-gray-900">$125</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Professional resume + LinkedIn optimization with expert review
              </p>
              <a
                href={routes.resumeLinkedin}
                className="block w-full py-3 bg-white text-primary-600 border-2 border-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors text-center"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure payment
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Instant access
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                No subscription
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

