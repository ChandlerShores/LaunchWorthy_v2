import { NextRequest, NextResponse } from 'next/server';
import { stripe, servicePrices } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      );
    }

    const { serviceId, customerEmail } = await request.json();

    // Validate service ID
    if (!serviceId || !(serviceId in servicePrices)) {
      return NextResponse.json(
        { error: 'Invalid service ID' },
        { status: 400 }
      );
    }

    const service = servicePrices[serviceId as keyof typeof servicePrices];
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://launchworthy.co' 
      : 'http://localhost:3000';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: service.name,
              description: service.description,
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
