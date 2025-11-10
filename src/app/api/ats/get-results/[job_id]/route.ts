import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: { job_id: string } }
) {
  try {
    const jobId = params.job_id;

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    // Get API configuration
    const apiUrl = process.env.NEXT_PUBLIC_ATS_API_URL;
    const apiKey = process.env.ATS_API_KEY;

    if (!apiUrl || !apiKey) {
      console.error('[ATS Optimizer] Missing API configuration');
      return NextResponse.json(
        { error: 'ATS Optimizer not configured' },
        { status: 500 }
      );
    }

    // Get results via external API
    const response = await fetch(`${apiUrl}/api/bulk/results/${jobId}`, {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[ATS Optimizer] Results fetch error:', {
        jobId,
        status: response.status,
        error: errorText,
      });

      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Job not found or results not available yet' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to fetch results' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    console.log('[ATS Optimizer] Results fetched successfully:', {
      jobId: data.job_id,
      status: data.status,
      candidates: data.candidates?.length,
    });

    // Return full results to client
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('[ATS Optimizer] Results fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}











