import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 420; // 7 minutes for cold start + processing

interface ATSRequestBody {
  role: string;
  jd_text: string;
  bullets: string[];
  settings?: {
    tone?: string;
    max_len?: number;
    variants?: number;
  };
}

export async function POST(request: NextRequest) {
  const requestStartTime = Date.now();
  
  try {
    // Parse request body
    const body: ATSRequestBody = await request.json();
    
    // Log incoming request
    console.log('[ATS API] Request received:', {
      timestamp: new Date().toISOString(),
      role: body.role,
      jdLength: body.jd_text.length,
      bulletsCount: body.bullets.length,
      settings: body.settings
    });

    // Validate required fields
    if (!body.role || !body.jd_text || !body.bullets || body.bullets.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: role, jd_text, and bullets are required' },
        { status: 400 }
      );
    }

    // Validate bullets
    if (body.bullets.length > 20) {
      return NextResponse.json(
        { error: 'Too many bullets. Maximum 20 bullets allowed.' },
        { status: 400 }
      );
    }

    // Get API URL from environment
    const apiUrl = process.env.NEXT_PUBLIC_ATS_API_URL;
    if (!apiUrl) {
      console.error('[ATS API] NEXT_PUBLIC_ATS_API_URL not configured');
      return NextResponse.json(
        { error: 'ATS API not configured. Please contact support.' },
        { status: 500 }
      );
    }
    
    console.log('[ATS API] External API URL configured:', apiUrl);

    // Check if demo mode is explicitly enabled (for testing only)
    const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
    
    if (demoMode) {
      // Return demo data for testing
      const demoResponse = {
        job_id: 'demo-' + Date.now(),
        summary: {
          role: body.role,
          top_terms: ['Python', 'API', 'Cloud', 'Microservices', 'CI/CD'],
          coverage: {
            hit: ['Python', 'API', 'Cloud'],
            miss: ['Microservices', 'CI/CD']
          }
        },
        results: body.bullets.map((bullet, idx) => ({
          original: bullet,
          revised: [
            `${bullet} using modern Python frameworks and cloud-native architectures.`,
            `Delivered ${bullet} resulting in 25% improved performance and scalability.`
          ],
          scores: {
            relevance: 85,
            impact: 78,
            clarity: 92
          },
          notes: `Enhanced bullet with quantified results and technical keywords.`,
          diff: {
            removed: ['basic'],
            added_terms: ['modern', 'cloud-native', 'performance']
          }
        })),
        red_flags: [],
        logs: [
          { ts: new Date().toISOString(), level: 'info', stage: 'Demo Mode', msg: 'Returning demo data', job_id: 'demo-' + Date.now() }
        ]
      };
      
      return NextResponse.json(demoResponse);
    }

    // Prepare request to external API
    const atsRequest = {
      role: body.role,
      jd_text: body.jd_text,
      bullets: body.bullets,
      settings: {
        tone: body.settings?.tone || 'concise',
        max_len: body.settings?.max_len || 30,
        variants: body.settings?.variants || 2,
      },
    };

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('ATS Request:', JSON.stringify(atsRequest, null, 2));
    }

    // Call external ATS API with extended timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 420000); // 420 second timeout (7 minutes)

    console.log('[ATS API] Calling external API:', {
      url: `${apiUrl}/api/test/process-sync`,
      method: 'POST',
      timeout: '420s',
      requestBody: {
        role: atsRequest.role,
        jdLength: atsRequest.jd_text.length,
        bulletsCount: atsRequest.bullets.length,
        settings: atsRequest.settings
      }
    });

    try {
      const response = await fetch(`${apiUrl}/api/test/process-sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(atsRequest),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log('[ATS API] External API response received:', {
        status: response.status,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        let errorText = 'Unknown error';
        let errorDetails = '';
        
        try {
          errorText = await response.text();
          console.error('[ATS API] External API error:', {
            status: response.status,
            statusText: response.statusText,
            errorText: errorText.substring(0, 500) // Truncate long errors
          });
        } catch (e) {
          console.error('[ATS API] Failed to read error response:', e);
        }
        
        if (response.status === 429) {
          return NextResponse.json(
            { error: 'Too many requests. Please wait a moment and try again.' },
            { status: 429 }
          );
        }

        if (response.status === 502) {
          return NextResponse.json(
            { 
              error: 'The ATS service is temporarily unavailable. This usually happens with free-tier services. Please try again in a few minutes.',
              details: 'The external API is experiencing downtime. This is normal for free services.'
            },
            { status: 502 }
          );
        }

        if (response.status === 422) {
          try {
            const errorJson = JSON.parse(errorText);
            if (errorJson.detail && Array.isArray(errorJson.detail)) {
              const validationErrors = errorJson.detail
                .map((err: any) => `${err.loc?.join('.')}: ${err.msg}`)
                .join(', ');
              return NextResponse.json(
                { 
                  error: 'Validation error: Please check your input.',
                  details: validationErrors
                },
                { status: 422 }
              );
            }
          } catch (parseError) {
            // Fall through to generic error handling
          }
        }

        // Try to parse error details for better user feedback
        try {
          const errorJson = JSON.parse(errorText);
          if (errorJson.detail) {
            errorDetails = Array.isArray(errorJson.detail) 
              ? errorJson.detail.map((d: any) => d.msg || d).join(', ')
              : errorJson.detail;
          } else if (errorJson.error) {
            errorDetails = errorJson.error;
          }
        } catch {
          errorDetails = errorText.length > 200 ? errorText.substring(0, 200) + '...' : errorText;
        }

        return NextResponse.json(
          { 
            error: 'Failed to process resume bullets. Please try again.',
            details: `API returned status ${response.status}. ${errorDetails}`,
            debug: process.env.NODE_ENV === 'development' ? errorText : undefined
          },
          { status: 502 }
        );
      }

      const data = await response.json();
      
      console.log('[ATS API] External API response parsed successfully:', {
        hasResults: !!data.results,
        resultsCount: data.results?.length,
        hasRedFlags: data.red_flags?.length > 0,
        hasSummary: !!data.summary,
        processingTime: `${Date.now() - requestStartTime}ms`
      });
      
      // Return successful response
      return NextResponse.json(data, {
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
        },
      });

    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      console.error('[ATS API] External API request failed:', {
        error: fetchError.message,
        name: fetchError.name,
        code: fetchError.code,
        processingTime: `${Date.now() - requestStartTime}ms`
      });
      

      // Enhanced error handling for API failures
      if (fetchError.name === 'AbortError') {
        console.error('[ATS API] Request timeout after 120 seconds');
        return NextResponse.json(
          { 
            error: 'Request timed out. The API may be starting up (cold start). Please try again in a moment.',
            details: 'If this persists, the API may be experiencing high load.',
            retryable: true
          },
          { status: 504 }
        );
      }

      // Network or connection errors
      if (fetchError.code === 'ENOTFOUND' || fetchError.code === 'ECONNREFUSED') {
        return NextResponse.json(
          { 
            error: 'Unable to connect to the ATS service. Please check your internet connection and try again.',
            details: 'The external API appears to be unreachable.',
            retryable: true
          },
          { status: 503 }
        );
      }

      // Generic fetch error
      return NextResponse.json(
        { 
          error: 'Failed to process resume bullets. The ATS service may be temporarily unavailable.',
          details: 'Please try again in a few moments. If the problem persists, the service may be experiencing issues.',
          retryable: true
        },
        { status: 502 }
      );
    }

  } catch (error: any) {
    console.error('[ATS API] Unexpected error processing request:', {
      error: error.message,
      stack: error.stack,
      processingTime: `${Date.now() - requestStartTime}ms`
    });
    
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again.',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Rate limiting could be added here in the future
// Example structure (commented out for now):
/*
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimit.get(ip);
  
  if (!limit || limit.resetAt < now) {
    rateLimit.set(ip, { count: 1, resetAt: now + 3600000 }); // 1 hour
    return true;
  }
  
  if (limit.count >= 10) {
    return false;
  }
  
  limit.count++;
  return true;
}
*/

