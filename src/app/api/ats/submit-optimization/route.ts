import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

interface SubmitOptimizationRequest {
  jobDescription: string;
  bullets: string[];
  settings: {
    tone?: string;
    maxLen?: number;
    variants?: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: SubmitOptimizationRequest = await request.json();

    // Validate required fields
    if (!body.jobDescription || !body.bullets || body.bullets.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: jobDescription and bullets are required' },
        { status: 400 }
      );
    }

    // Validate bullets count (max 20 per API docs)
    if (body.bullets.length > 20) {
      return NextResponse.json(
        { error: 'Too many bullets. Maximum 20 bullets allowed.' },
        { status: 400 }
      );
    }

    // Get API configuration
    const apiUrl = process.env.NEXT_PUBLIC_ATS_API_URL;
    const apiKey = process.env.ATS_API_KEY;

    if (!apiUrl || !apiKey) {
      console.error('[ATS Optimizer] Missing API configuration');
      return NextResponse.json(
        { error: 'ATS Optimizer not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Prepare request to external ATS API using bulk processing endpoint
    const atsRequest = {
      job_description: body.jobDescription,
      candidates: [
        {
          candidate_id: 'user',
          bullets: body.bullets,
        },
      ],
      settings: {
        tone: body.settings?.tone || 'professional',
        max_len: body.settings?.maxLen || 30,
        variants: body.settings?.variants || 1,
      },
    };

    console.log('[ATS Optimizer] Submitting optimization request:', {
      bulletsCount: body.bullets.length,
      jdLength: body.jobDescription.length,
      settings: atsRequest.settings,
    });

    // Call external API
    const response = await fetch(`${apiUrl}/api/bulk/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(atsRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[ATS Optimizer] API error:', {
        status: response.status,
        error: errorText,
      });

      // Handle specific error cases
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key configuration.' },
          { status: 500 }
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again in a few moments.' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { 
          error: 'Failed to submit optimization request.',
          details: errorText.substring(0, 200),
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    console.log('[ATS Optimizer] Job submitted successfully:', {
      jobId: data.job_id,
      status: data.status,
    });

    // Return job info to client
    return NextResponse.json({
      jobId: data.job_id,
      status: data.status,
      totalCandidates: data.total_candidates,
    });

  } catch (error: any) {
    console.error('[ATS Optimizer] Unexpected error:', error);
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred.',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}











