import { google } from 'googleapis';
import { getDriveConfig } from './drive-config';

let driveClient: any = null;

export const getDriveClient = async () => {
  if (driveClient) return driveClient;

  let config;
  try {
    config = getDriveConfig();
    
    // Check if we have OIDC token from Vercel environment variable
    const oidcToken = process.env.VERCEL_OIDC_TOKEN;
    
    if (oidcToken) {
      // Only log in development mode
      if (process.env.NODE_ENV === 'development') {
        console.log('Using OIDC token from VERCEL_OIDC_TOKEN environment variable');
      }
      
      // Create a temporary file with the OIDC token content
      const fs = require('fs');
      const os = require('os');
      const path = require('path');
      
      const tempTokenPath = path.join(os.tmpdir(), 'vercel-oidc-token');
      fs.writeFileSync(tempTokenPath, oidcToken);
      
      try {
        const auth = new google.auth.GoogleAuth({
          credentials: {
            type: 'external_account',
            audience: `//iam.googleapis.com/projects/${config.projectNumber}/locations/global/workloadIdentityPools/${config.workloadIdentityPoolId}/providers/${config.workloadIdentityProviderId}`,
            subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
            token_url: 'https://sts.googleapis.com/v1/token',
            credential_source: {
              file: tempTokenPath,
              format: { type: 'text' }
            }
          }
        });
        
        driveClient = google.drive({ version: 'v3', auth });
        
        // Clean up temp file
        fs.unlinkSync(tempTokenPath);
      } catch (error) {
        // Clean up temp file on error
        if (fs.existsSync(tempTokenPath)) {
          fs.unlinkSync(tempTokenPath);
        }
        throw error;
      }
    } else {
      throw new Error('No OIDC token available in VERCEL_OIDC_TOKEN environment variable');
    }
    
    // Test the connection
    await driveClient.files.list({ pageSize: 1 });
    
    return driveClient;
  } catch (error) {
    console.error('Failed to initialize Drive client:', error);
    // Only log config details in development mode
    if (config && process.env.NODE_ENV === 'development') {
      console.error('Drive config:', {
        projectId: config.projectId,
        projectNumber: config.projectNumber,
        serviceAccountEmail: config.serviceAccountEmail,
        workloadIdentityPoolId: config.workloadIdentityPoolId,
        workloadIdentityProviderId: config.workloadIdentityProviderId,
        driveFolderId: config.driveFolderId
      });
    }
    throw new Error(`Drive service unavailable: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const createBookingFolder = async (folderName: string) => {
  const drive = await getDriveClient();
  const config = getDriveConfig();
  
  const response = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [config.driveFolderId]
    }
  });

  return response.data.id!;
};

export const uploadFileToDrive = async (fileName: string, fileBuffer: Buffer, mimeType: string, parentFolderId: string) => {
  const drive = await getDriveClient();
  
  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [parentFolderId]
    },
    media: {
      mimeType: mimeType,
      body: fileBuffer
    }
  });

  return response.data.id!;
};
