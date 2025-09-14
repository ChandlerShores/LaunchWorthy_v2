import { NextRequest, NextResponse } from 'next/server';

interface BookingSubmission {
  name: string;
  email: string;
  phone: string;
  service: string;
  paymentSessionId: string;
  linkedinUrl?: string;
  uploadedFiles?: number;
  status: 'payment_completed' | 'booking_completed';
}

export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingSubmission = await request.json();
    
    const formspreeUrl = process.env.NEXT_PUBLIC_CONTACT_FORMSPREE_URL;
    
    if (!formspreeUrl) {
      console.error('Contact Formspree URL not configured');
      return NextResponse.json(
        { error: 'Booking form not configured' },
        { status: 500 }
      );
    }

    // Prepare data for Formspree
    const formspreeData = {
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      service: bookingData.service,
      paymentSessionId: bookingData.paymentSessionId,
      linkedinUrl: bookingData.linkedinUrl || '',
      uploadedFiles: bookingData.uploadedFiles || 0,
      status: bookingData.status,
      submittedAt: new Date().toISOString(),
    };

    console.log('Submitting booking data to Formspree:', {
      name: formspreeData.name,
      email: formspreeData.email,
      service: formspreeData.service,
      status: formspreeData.status,
    });

    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formspreeData),
    });

    if (response.ok) {
      console.log('Successfully submitted booking to Formspree');
      return NextResponse.json({ success: true });
    } else {
      const errorText = await response.text();
      console.error('Formspree submission failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      return NextResponse.json(
        { error: 'Failed to submit booking data' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Error submitting booking to Formspree:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
