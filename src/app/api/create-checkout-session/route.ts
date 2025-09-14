import { NextRequest, NextResponse } from 'next/server';
import { stripe, servicePrices } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    console.log('API Route called');
    console.log('Stripe configured:', !!stripe);
    console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
    
    // Check if Stripe is configured
    if (!stripe) {
      console.log('Stripe not configured - returning error');
      return NextResponse.json(
        { error: 'Stripe not configured' },
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
    console.log('Service selected:', service);
    
    // Get the correct base URL for development
    let baseUrl: string;
    if (process.env.NODE_ENV === 'production') {
      baseUrl = 'https://launchworthy.net';
    } else {
      // In development, use the request origin to get the correct port
      const origin = request.headers.get('origin') || request.headers.get('referer');
      if (origin) {
        baseUrl = origin.replace(/\/$/, ''); // Remove trailing slash
      } else {
        baseUrl = 'http://localhost:3000'; // Fallback
      }
    }
    
    console.log('Creating Stripe session with baseUrl:', baseUrl);

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

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
