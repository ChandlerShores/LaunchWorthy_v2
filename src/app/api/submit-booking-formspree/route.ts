import { NextRequest, NextResponse } from 'next/server';

interface CompleteBookingSubmission {
  // Contact Information
  name: string;
  email: string;
  phone: string;
  
  // Service Information
  serviceId?: string;
  serviceName: string;
  serviceDescription?: string;
  servicePrice?: number;
  
  // Payment Information
  paymentSessionId: string;
  paymentStatus?: string;
  
  // Additional Information
  linkedinUrl?: string;
  uploadedFiles?: number;
  
  // Booking Status
  status: 'payment_completed' | 'booking_completed';
  submittedAt?: string;
  bookingFlowVersion?: string;
}

export async function POST(request: NextRequest) {
  try {
    const bookingData: CompleteBookingSubmission = await request.json();
    
    const formspreeUrl = process.env.NEXT_PUBLIC_CONTACT_FORMSPREE_URL;
    
    if (!formspreeUrl) {
      console.error('Contact Formspree URL not configured');
      return NextResponse.json(
        { error: 'Booking form not configured' },
        { status: 500 }
      );
    }

    // Prepare comprehensive data for Formspree
    const formspreeData = {
      // Contact Information
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      
      // Service Information
      serviceId: bookingData.serviceId || '',
      serviceName: bookingData.serviceName,
      serviceDescription: bookingData.serviceDescription || '',
      servicePrice: bookingData.servicePrice || 0,
      
      // Payment Information
      paymentSessionId: bookingData.paymentSessionId,
      paymentStatus: bookingData.paymentStatus || 'completed',
      
      // Additional Information
      linkedinUrl: bookingData.linkedinUrl || '',
      uploadedFiles: bookingData.uploadedFiles || 0,
      
      // Booking Status
      status: bookingData.status,
      submittedAt: bookingData.submittedAt || new Date().toISOString(),
      bookingFlowVersion: bookingData.bookingFlowVersion || '2.0',
    };

    console.log('Submitting comprehensive booking data to Formspree:', {
      name: formspreeData.name,
      email: formspreeData.email,
      serviceName: formspreeData.serviceName,
      serviceId: formspreeData.serviceId,
      servicePrice: formspreeData.servicePrice,
      paymentSessionId: formspreeData.paymentSessionId,
      status: formspreeData.status,
      bookingFlowVersion: formspreeData.bookingFlowVersion,
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
