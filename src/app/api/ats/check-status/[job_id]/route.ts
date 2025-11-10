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

    // Check status via external API
    const response = await fetch(`${apiUrl}/api/bulk/status/${jobId}`, {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[ATS Optimizer] Status check error:', {
        jobId,
        status: response.status,
        error: errorText,
      });

      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Job not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to check job status' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Return status to client
    return NextResponse.json({
      jobId: data.job_id,
      status: data.status,
      totalCandidates: data.total_candidates,
      processedCandidates: data.processed_candidates,
    });

  } catch (error: any) {
    console.error('[ATS Optimizer] Status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check job status' },
      { status: 500 }
    );
  }
}











