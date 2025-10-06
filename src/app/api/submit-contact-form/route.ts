import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    const formspreeUrl = process.env.NEXT_PUBLIC_CONTACT_FORMSPREE_URL;
    
    if (!formspreeUrl) {
      console.error('Contact Formspree URL not configured');
      return NextResponse.json(
        { error: 'Contact form not configured' },
        { status: 500 }
      );
    }

    // Only log in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('Submitting contact form data:', {
        name: formData.name,
        email: formData.email,
        hasMessage: !!formData.message
      });
    }

    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Successfully submitted contact form to Formspree');
      }
      return NextResponse.json({ success: true });
    } else {
      const errorText = await response.text();
      console.error('Formspree contact submission failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    // Don't expose internal error details in production
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? (error instanceof Error ? error.message : 'Unknown error')
      : 'Failed to send message';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
