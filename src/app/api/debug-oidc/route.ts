import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

export async function GET(request: NextRequest) {
  try {
    const debugInfo: any = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      projectId: process.env.VERCEL_PROJECT_ID,
      region: process.env.VERCEL_REGION,
    };

    // Check common OIDC token paths
    const possiblePaths = [
      '/var/run/secrets/vercel/oidc/0',
      '/var/run/secrets/vercel/oidc/1',
      '/var/run/secrets/vercel/oidc/2',
      '/run/secrets/vercel/oidc/0',
      '/run/secrets/vercel/oidc/1',
      '/run/secrets/vercel/oidc/2',
      '/tmp/vercel/oidc/0',
      '/tmp/vercel/oidc/1',
      '/tmp/vercel/oidc/2',
    ];

    debugInfo.oidcPaths = {};
    
    for (const tokenPath of possiblePaths) {
      try {
        if (fs.existsSync(tokenPath)) {
          const stats = fs.statSync(tokenPath);
          debugInfo.oidcPaths[tokenPath] = {
            exists: true,
            isFile: stats.isFile(),
            isDirectory: stats.isDirectory(),
            size: stats.size,
            modified: stats.mtime,
            // Don't read the actual token for security
            hasContent: stats.size > 0
          };
        } else {
          debugInfo.oidcPaths[tokenPath] = { exists: false };
        }
      } catch (error) {
        debugInfo.oidcPaths[tokenPath] = { 
          exists: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        };
      }
    }

    // Check if /var/run/secrets directory exists
    try {
      const secretsDir = '/var/run/secrets';
      if (fs.existsSync(secretsDir)) {
        const stats = fs.statSync(secretsDir);
        debugInfo.secretsDir = {
          exists: true,
          isDirectory: stats.isDirectory(),
          permissions: stats.mode.toString(8)
        };
        
        // List contents
        try {
          const contents = fs.readdirSync(secretsDir);
          debugInfo.secretsDir.contents = contents;
        } catch (error) {
          debugInfo.secretsDir.contentsError = error instanceof Error ? error.message : 'Unknown error';
        }
      } else {
        debugInfo.secretsDir = { exists: false };
      }
    } catch (error) {
      debugInfo.secretsDir = { 
        exists: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }

    // Check environment variables related to OIDC
    const oidcEnvVars = [
      'VERCEL_OIDC_TOKEN',
      'VERCEL_OIDC_TOKEN_PATH',
      'VERCEL_OIDC_AUDIENCE',
      'VERCEL_OIDC_ISSUER',
      'VERCEL_OIDC_SUBJECT',
      'VERCEL_OIDC_CLAIMS',
    ];

    debugInfo.oidcEnvVars = {};
    for (const envVar of oidcEnvVars) {
      if (process.env[envVar]) {
        debugInfo.oidcEnvVars[envVar] = 'SET';
      } else {
        debugInfo.oidcEnvVars[envVar] = 'NOT_SET';
      }
    }

    return NextResponse.json(debugInfo, { status: 200 });

  } catch (error) {
    console.error('Debug OIDC error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to debug OIDC',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
