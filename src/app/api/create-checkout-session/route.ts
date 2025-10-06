import { NextRequest, NextResponse } from 'next/server';
import { stripe, servicePrices } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    // Only log in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('=== STRIPE CHECKOUT SESSION API CALLED ===');
      console.log('Environment:', process.env.NODE_ENV);
      console.log('Stripe configured:', !!stripe);
      console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
      console.log('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY exists:', !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    }
    
    // Check if Stripe is configured
    if (!stripe) {
      console.error('❌ Stripe not configured - missing STRIPE_SECRET_KEY');
      return NextResponse.json(
        { 
          error: 'Stripe not configured',
          details: 'Missing STRIPE_SECRET_KEY environment variable'
        },
        { status: 500 }
      );
    }

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      console.error('❌ Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
      return NextResponse.json(
        { 
          error: 'Stripe publishable key not configured',
          details: 'Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable'
        },
        { status: 500 }
      );
    }

    const { serviceId, customerEmail, customerName, customerPhone } = await request.json();

    // Validate service ID
    if (!serviceId || !(serviceId in servicePrices)) {
      return NextResponse.json(
        { error: 'Invalid service ID' },
        { status: 400 }
      );
    }

    const service = servicePrices[serviceId as keyof typeof servicePrices];
    
    // Only log in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('Service selected:', service);
    }
    
    // Get the correct base URL for development
    let baseUrl: string;
    if (process.env.NODE_ENV === 'production') {
      baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://launchworthy.net';
    } else {
      // In development, use the request origin to get the correct port
      const origin = request.headers.get('origin') || request.headers.get('referer');
      if (origin) {
        baseUrl = origin.replace(/\/$/, ''); // Remove trailing slash
      } else {
        baseUrl = 'http://localhost:3000'; // Fallback
      }
    }
    
    // Only log in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('Creating Stripe session with baseUrl:', baseUrl);
      console.log('Service details:', service);
      console.log('Calling stripe.checkout.sessions.create...');
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: service.name,
              description: service.description || '',
            },
            unit_amount: service.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/book`,
      customer_email: customerEmail || undefined,
      metadata: {
        serviceId,
        serviceName: service.name,
        customerName: customerName || '',
        customerPhone: customerPhone || '',
      },
      // Enable automatic tax calculation if you have Stripe Tax set up
      // automatic_tax: { enabled: true },
    });

    // Only log in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Stripe session created successfully:', session.id);
    }
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // Don't expose internal error details in production
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? (error instanceof Error ? error.message : 'Unknown error')
      : 'Failed to create checkout session';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
