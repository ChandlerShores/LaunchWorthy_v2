import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

// Test mode detection
export const isTestMode = process.env.NODE_ENV === 'development' || 
                         process.env.NEXT_PUBLIC_STRIPE_MODE === 'test';

// Server-side Stripe instance
export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-08-27.basil',
    })
  : null;

// Client-side Stripe instance
export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
};

// Test card numbers for development
export const testCards = {
  success: '4242424242424242',
  decline: '4000000000000002',
  insufficientFunds: '4000000000009995',
  requiresAuthentication: '4000002500003155',
  expiredCard: '4000000000000069',
  incorrectCvc: '4000000000000127',
} as const;

// Test mode helper functions
export const getTestModeInfo = () => ({
  isTestMode,
  testCards,
  environment: process.env.NODE_ENV,
  stripeMode: process.env.NEXT_PUBLIC_STRIPE_MODE || 'live',
});

// Service pricing configuration
export const servicePrices = {
  consult: {
    price: 5000, // $50.00 in cents
    name: '30-min Career Consult',
    description: 'Quick resume, LinkedIn, and interview style review',
  },
  resume: {
    price: 12500, // $125.00 in cents
    name: 'Resume + LinkedIn Polish',
    description: 'Comprehensive resume and LinkedIn optimization',
  },
  accelerator: {
    price: 30000, // $300.00 in cents
    name: 'Stop Getting Ghosted',
    description: 'Full coaching program with mock interviews',
  },
  mentorship: {
    price: 15000, // $150.00 in cents
    name: 'Monthly Mentorship',
    description: 'Ongoing coaching and career guidance',
  },
} as const;

export type ServiceId = keyof typeof servicePrices;
