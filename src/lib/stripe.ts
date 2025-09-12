import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

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
